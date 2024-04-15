package br.com.ricardo.nekiapi.Dto;

import javax.validation.constraints.NotBlank;

public class UsuarioSkillRequestDTO {

    private Long id;

    @NotBlank (message = "OBRIGATÒRIO")
    private Long usuarioId;

    @NotBlank (message = "OBRIGATÒRIO")
    private Long skillId;

    @NotBlank (message = "OBRIGATÒRIO")
    private int level;

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    
}

