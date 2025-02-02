package ma.javatiyoun.clickfitbackend.Services.user;

import ma.javatiyoun.clickfitbackend.Domain.entities.User;
import org.springframework.http.ResponseEntity;

public interface IUserServices {
    ResponseEntity<?> login(User user);
    ResponseEntity<?> signup(User user);
}
