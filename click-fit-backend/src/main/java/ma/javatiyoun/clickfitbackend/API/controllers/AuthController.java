package ma.javatiyoun.clickfitbackend.API.controllers;

import ma.javatiyoun.clickfitbackend.Domain.entities.User;
import ma.javatiyoun.clickfitbackend.Domain.models.AuthenticationRequest;
import ma.javatiyoun.clickfitbackend.Services.user.IUserServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final IUserServices _userServices;

    public AuthController(IUserServices userServices) {
        _userServices = userServices;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) {
        return _userServices.login(authenticationRequest);
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        return _userServices.signup(user);
    }
}
