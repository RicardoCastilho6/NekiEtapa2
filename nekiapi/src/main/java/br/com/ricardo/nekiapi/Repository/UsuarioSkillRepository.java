package br.com.ricardo.nekiapi.Repository;


import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ricardo.nekiapi.Entity.SkillEntity;
import br.com.ricardo.nekiapi.Entity.User;
import br.com.ricardo.nekiapi.Entity.UsuarioSkillEntity;

public interface UsuarioSkillRepository extends JpaRepository<UsuarioSkillEntity, Long> {

    Optional<UsuarioSkillEntity> findByUsuarioAndSkill(User usuario, SkillEntity skill);


    Page<UsuarioSkillEntity> findByUsuarioId(Long idUsuario, Pageable pageable);
}
