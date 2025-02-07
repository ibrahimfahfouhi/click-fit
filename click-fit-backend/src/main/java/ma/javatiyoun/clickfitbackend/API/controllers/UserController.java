package ma.javatiyoun.clickfitbackend.API.controllers;

import ma.javatiyoun.clickfitbackend.Domain.dtos.UserDto;
import ma.javatiyoun.clickfitbackend.Services.user.IUserServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final IUserServices _userServices;

    public UserController(IUserServices userServices) {
        _userServices = userServices;
    }
    @GetMapping
    public List<UserDto> getAllUsers(){
        return _userServices.getAllUsers();
    }
    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable Long id){
        _userServices.deleteUser(id);
    }
}
