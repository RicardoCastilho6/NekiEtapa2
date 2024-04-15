package br.com.ricardo.nekiapi.Controller;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.ricardo.nekiapi.Dto.UsuarioSkillRequestDTO;
import br.com.ricardo.nekiapi.Entity.UsuarioSkillEntity;
import br.com.ricardo.nekiapi.Service.UsuarioSkillService;


@RestController
@RequestMapping("/usuarioskills")
public class UsuarioSkillController {

    @Autowired
    private UsuarioSkillService usuarioSkillService;

    @PostMapping("/associar")
    public ResponseEntity<String> associarSkillAoUsuario(@Valid @RequestBody UsuarioSkillRequestDTO usuarioSkillRequest) {
        try {
            usuarioSkillService.associarSkillAoUsuario(usuarioSkillRequest);
            return new ResponseEntity<>("Associação entre usuário e skill adicionada com sucesso", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/atualizar/{usuarioSkillId}")
    public ResponseEntity<String> atualizarLevelDaSkill(@RequestBody UsuarioSkillRequestDTO usuarioSkillRequest) {
        try {
            usuarioSkillService.atualizarLevelDaSkill(usuarioSkillRequest);
            return new ResponseEntity<>("Level da associação entre usuário e skill atualizado com sucesso", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/excluir/{usuarioSkillId}")
    public ResponseEntity<String> excluirAssociacaoSkillUsuario(@PathVariable Long usuarioSkillId) {
        try {
            usuarioSkillService.excluirAssociacaoSkillUsuario(usuarioSkillId);
            return new ResponseEntity<>("Associação entre usuário e skill excluída com sucesso", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{idUsuario}")
public ResponseEntity<Page<UsuarioSkillEntity>> listarTodasUserSkillsPorIdUsuario(
        @PathVariable Long idUsuario,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "3") int size) {

    Pageable pageable = PageRequest.of(page, size, Sort.by("level").descending());

    Page<UsuarioSkillEntity> skillsPage = usuarioSkillService.listarTodasUserSkillsPorIdUsuario(idUsuario, pageable);

    return ResponseEntity.ok(skillsPage);
}
}

   

