package ma.javatiyoun.clickfitbackend.Repositories;

import ma.javatiyoun.clickfitbackend.Domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
