package ma.javatiyoun.clickfitbackend.Services.user;

import ma.javatiyoun.clickfitbackend.Domain.dtos.UserDto;
import ma.javatiyoun.clickfitbackend.Domain.entities.User;
import ma.javatiyoun.clickfitbackend.Domain.models.AuthenticationRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserServices {
    ResponseEntity<?> login(AuthenticationRequest authenticationRequest);
    ResponseEntity<?> signup(User user);
    String hashPassword(String plainPassword);
    boolean checkPassword(String plainPassword, String hashedPassword);
    List<UserDto> getAllUsers();
    void deleteUser(Long id);
}
