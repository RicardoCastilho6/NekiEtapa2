package br.com.ricardo.nekiapi.Service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.ricardo.nekiapi.Dto.UsuarioSkillRequestDTO;
import br.com.ricardo.nekiapi.Entity.SkillEntity;
import br.com.ricardo.nekiapi.Entity.User;
import br.com.ricardo.nekiapi.Entity.UsuarioSkillEntity;
import br.com.ricardo.nekiapi.Exception.SkillNotFoundException;
import br.com.ricardo.nekiapi.Exception.UserNotFoundException;
import br.com.ricardo.nekiapi.Repository.SkillRepository;
import br.com.ricardo.nekiapi.Repository.UserRepository;
import br.com.ricardo.nekiapi.Repository.UsuarioSkillRepository;

@Service
public class UsuarioSkillService {

    @Autowired
    private UsuarioSkillRepository usuarioSkillRepository;

    @Autowired
    private UserRepository usuarioRepository;

    @Autowired
    private SkillRepository skillRepository;

   
    public UsuarioSkillService(UsuarioSkillRepository usuarioSkillRepository) {
        this.usuarioSkillRepository = usuarioSkillRepository;
    }

    public Page<UsuarioSkillEntity> listarTodasUserSkillsPorIdUsuario(Long idUsuario, Pageable pageable) {
        return usuarioSkillRepository.findByUsuarioId(idUsuario, pageable);
    }


    public void associarSkillAoUsuario(UsuarioSkillRequestDTO associarSkillDTO) {
       
        User usuario = usuarioRepository.findById(associarSkillDTO.getUsuarioId())
        .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
    
        SkillEntity skill = skillRepository.findById(associarSkillDTO.getSkillId())
        .orElseThrow(() -> new SkillNotFoundException("Skill não encontrada"));
    
        
        if (usuarioSkillRepository.findByUsuarioAndSkill(usuario, skill).isPresent()) {
            throw new RuntimeException("Associação entre usuário e skill já existe");
        }
    
        
        UsuarioSkillEntity usuarioSkill = new UsuarioSkillEntity();
        usuarioSkill.setUsuario(usuario);
        usuarioSkill.setSkill(skill);
        usuarioSkill.setLevel(associarSkillDTO.getLevel());
    
        
        usuarioSkillRepository.save(usuarioSkill);
    }

    public void atualizarLevelDaSkill(UsuarioSkillRequestDTO associarSkillDTO) {
        
        Optional<UsuarioSkillEntity> optionalUsuarioSkill = usuarioSkillRepository.findById(associarSkillDTO.getId());
        
        if (optionalUsuarioSkill.isPresent()) {
           
            UsuarioSkillEntity usuarioSkill = optionalUsuarioSkill.get();
            usuarioSkill.setLevel(associarSkillDTO.getLevel());
    
            
            usuarioSkillRepository.save(usuarioSkill);
        } else {
            throw new RuntimeException("Associação entre usuário e skill não encontrada");
        }
    }

    public void excluirAssociacaoSkillUsuario(Long usuarioSkillId) {
        
        Optional<UsuarioSkillEntity> optionalUsuarioSkill = usuarioSkillRepository.findById(usuarioSkillId);
        if (optionalUsuarioSkill.isPresent()) {
           
            usuarioSkillRepository.delete(optionalUsuarioSkill.get());
        } else {
            throw new RuntimeException("Associação entre usuário e skill não encontrada");
        }
    }
}  

