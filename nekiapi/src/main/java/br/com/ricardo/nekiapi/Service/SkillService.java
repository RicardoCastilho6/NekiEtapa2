package br.com.ricardo.nekiapi.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import br.com.ricardo.nekiapi.Dto.SkillRequestDTO;
import br.com.ricardo.nekiapi.Dto.SkillResponseDTO;
import br.com.ricardo.nekiapi.Entity.SkillEntity;
import br.com.ricardo.nekiapi.Exception.SkillCreationException;
import br.com.ricardo.nekiapi.Exception.SkillNotFoundException;
import br.com.ricardo.nekiapi.Repository.SkillRepository;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    public void adicionarSkill(SkillRequestDTO skillRequestDTO) {
        SkillEntity skill = new SkillEntity();
        skill.setNome(skillRequestDTO.getNome());
        skill.setImgUrl(skillRequestDTO.getImgUrl());
        skill.setDescricao(skillRequestDTO.getDescricao());

       
        try {
            skillRepository.save(skill);
        } catch (Exception e) {
            throw new SkillCreationException("Não foi possível criar a skill: " + e.getMessage());
        }
    }

    public Page<SkillResponseDTO> listarSkillsComFiltro(String searchTerm, Pageable pageable) {
        Page<SkillEntity> skillsPage;
        
        if (searchTerm != null && !searchTerm.isEmpty()) {
            skillsPage = skillRepository.findByNomeContainingIgnoreCase(searchTerm, pageable);
        } else {
            skillsPage = skillRepository.findAll(pageable);
        }
        
        return skillsPage.map(skillEntity -> {
            SkillResponseDTO skillResponseDTO = new SkillResponseDTO();
            skillResponseDTO.setId(skillEntity.getId());
            skillResponseDTO.setNome(skillEntity.getNome());
            skillResponseDTO.setImgUrl(skillEntity.getImgUrl());
            skillResponseDTO.setDescricao(skillEntity.getDescricao());
            return skillResponseDTO;
        });
    }

    public Page<SkillResponseDTO> listarTodasSkills(Pageable pageable) {
        Page<SkillEntity> skillsPage = skillRepository.findAll(pageable);
        return skillsPage.map(skillEntity -> {
            SkillResponseDTO skillResponseDTO = new SkillResponseDTO();
            skillResponseDTO.setId(skillEntity.getId());
            skillResponseDTO.setNome(skillEntity.getNome());
            skillResponseDTO.setImgUrl(skillEntity.getImgUrl());
            skillResponseDTO.setDescricao(skillEntity.getDescricao());
            return skillResponseDTO;
        });
    }

    public void excluirSkill(Long skillId) {
       
        Optional<SkillEntity> optionalSkill = skillRepository.findById(skillId);
        if (optionalSkill.isPresent()) {
           
            skillRepository.delete(optionalSkill.get());
        } else {
            throw new SkillNotFoundException("Skill não encontrada");
        }
    }
}
