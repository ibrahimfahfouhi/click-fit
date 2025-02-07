package ma.javatiyoun.clickfitbackend.Domain.mappers.userMaper;

import ma.javatiyoun.clickfitbackend.Domain.dtos.UserDto;
import ma.javatiyoun.clickfitbackend.Domain.entities.User;
import org.springframework.stereotype.Component;

@Component // Indique à Spring que cette classe est un bean
public class UserMapper implements IUserMapper{
    @Override
    public UserDto convertToDTO(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        return userDto;
    }

    @Override
    public User convertToUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setEmail(userDto.getEmail());
        return user;
    }
}
