package fr.xebia.skillz.repository;

import fr.xebia.skillz.model.Skill;
import fr.xebia.skillz.model.User;
import fr.xebia.skillz.model.UserSkill;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserSkillRepository extends CrudRepository<UserSkill, Long> {

    List<UserSkill> findByUser(User user);

    List<UserSkill> findBySkill(Skill skill);

    Skill findById(Long id);
}