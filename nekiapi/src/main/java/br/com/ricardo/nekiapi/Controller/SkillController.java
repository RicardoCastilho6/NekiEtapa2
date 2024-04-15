package br.com.ricardo.nekiapi.Controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import br.com.ricardo.nekiapi.Dto.SkillRequestDTO;
import br.com.ricardo.nekiapi.Dto.SkillResponseDTO;
import br.com.ricardo.nekiapi.Service.SkillService;


@RestController
@RequestMapping("/skills")
public class SkillController {

  
    @Autowired
    private SkillService skillService;

    @PostMapping("/adicionar")
    public ResponseEntity<String> adicionarSkill(@Valid @RequestBody SkillRequestDTO skillRequestDTO) {
        try {
            skillService.adicionarSkill(skillRequestDTO);
            return new ResponseEntity<>("Skill adicionada com sucesso", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<Page<SkillResponseDTO>> listarTodasSkills(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "3") int size,
        @RequestParam(required = false) String searchTerm
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending()); 
        Page<SkillResponseDTO> skillsPage;
    
        if (searchTerm != null && !searchTerm.isEmpty()) {
            skillsPage = skillService.listarSkillsComFiltro(searchTerm, pageable);
        } else {
            skillsPage = skillService.listarTodasSkills(pageable);
        }
        
        if (skillsPage.hasContent()) {
            return new ResponseEntity<>(skillsPage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

@GetMapping("/filtrar")
public Page<SkillResponseDTO> listarSkillsComFiltro(
        @RequestParam(required = false) String searchTerm,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
    Pageable pageable = PageRequest.of(page, size);
    return skillService.listarSkillsComFiltro(searchTerm, pageable);
}


    @DeleteMapping("/excluir/{skillId}")
    public ResponseEntity<String> excluirSkill(@PathVariable Long skillId) {
        try {
            skillService.excluirSkill(skillId);
            return new ResponseEntity<>("Skill excluída com sucesso", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
