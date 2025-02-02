package ma.javatiyoun.clickfitbackend.Services.user;

import ma.javatiyoun.clickfitbackend.Domain.entities.User;
import ma.javatiyoun.clickfitbackend.Repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServices implements IUserServices{
    private final UserRepository _userRepository;

    public UserServices(UserRepository userRepository) {
        _userRepository = userRepository;
    }

    @Override
    public ResponseEntity<?> login(User user) {
        User existingUser = _userRepository.findByEmail(user.getEmail());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok().body("{\"success\": true}");
        } else {
            return ResponseEntity.badRequest().body("{\"success\": false}");
        }
    }

    @Override
    public ResponseEntity<?> signup(User user) {
        if (_userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("{\"message\": \"User already exists\"}");
        } else {
            _userRepository.save(user);
            return ResponseEntity.ok().body("{\"message\": \"User created successfully\"}");
        }
    }
}
