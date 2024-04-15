package br.com.ricardo.nekiapi.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ricardo.nekiapi.Entity.SkillEntity;

public interface SkillRepository extends JpaRepository<SkillEntity, Long> {
    
    Page<SkillEntity> findAll(Pageable pageable);

    Page<SkillEntity> findByNomeContainingIgnoreCase(String searchTerm, Pageable pageable);
    
}

