package ma.javatiyoun.clickfitbackend.Domain.mappers.userMaper;

import ma.javatiyoun.clickfitbackend.Domain.dtos.UserDto;
import ma.javatiyoun.clickfitbackend.Domain.entities.User;

public interface IUserMapper {
    UserDto convertToDTO(User user);
    User convertToUser(UserDto userDto);
}
