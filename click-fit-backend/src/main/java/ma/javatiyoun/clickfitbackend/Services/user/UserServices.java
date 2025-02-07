package ma.javatiyoun.clickfitbackend.Services.user;

import ma.javatiyoun.clickfitbackend.Domain.dtos.UserDto;
import ma.javatiyoun.clickfitbackend.Domain.entities.User;
import ma.javatiyoun.clickfitbackend.Domain.mappers.userMaper.IUserMapper;
import ma.javatiyoun.clickfitbackend.Domain.models.AuthenticationRequest;
import ma.javatiyoun.clickfitbackend.Domain.models.AuthenticationResponse;
import ma.javatiyoun.clickfitbackend.Repositories.UserRepository;
import ma.javatiyoun.clickfitbackend.Services.jwt.IJwtServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServices implements IUserServices{
    private final UserRepository _userRepository;
    private final IUserMapper _userMapper;
    private final BCryptPasswordEncoder _passwordEncoder = new BCryptPasswordEncoder();
    private AuthenticationManager authenticationManager;
    private UserDetailsService userDetailsService;
    private IJwtServices _jwtService;

    public UserServices(UserRepository userRepository, IUserMapper userMapper, AuthenticationManager authenticationManager, UserDetailsService userDetailsService, IJwtServices jwtService) {
        _userRepository = userRepository;
        _userMapper = userMapper;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        _jwtService = jwtService;
    }

    @Override
    public ResponseEntity<?> login(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
        );
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = _jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @Override
    public ResponseEntity<?> signup(User user) {
        // Vérifie si l'email existe déjà
        if (_userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("{\"message\": \"User already exists\"}");
        } else {
            user.setPassword(hashPassword(user.getPassword()));
            _userRepository.save(user);
            return ResponseEntity.ok().body("{\"message\": \"User created successfully\"}");
        }
    }

    // Méthode pour hacher un mot de passe
    @Override
    public String hashPassword(String plainPassword) {
        return _passwordEncoder.encode(plainPassword);
    }

    // Méthode pour vérifier un mot de passe
    @Override
    public boolean checkPassword(String plainPassword, String hashedPassword) {
        return _passwordEncoder.matches(plainPassword, hashedPassword);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return _userRepository.findAll().stream()
                .map(u -> _userMapper.convertToDTO(u))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Long id) {
        _userRepository.deleteById(id);
    }
}
