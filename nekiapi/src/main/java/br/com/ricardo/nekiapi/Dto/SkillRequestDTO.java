package br.com.ricardo.nekiapi.Dto;

import javax.validation.constraints.NotBlank;

public class SkillRequestDTO {
    
    @NotBlank(message = "IMG é Obrigatório")
    private String imgUrl;
    
    @NotBlank(message = " Obrigatório ter uma descrição")
    private String descricao;
    
    @NotBlank(message =  "O campo  Nome é obrigatório.")
    private String nome;

   

    public SkillRequestDTO() {
    }

    public SkillRequestDTO(String imgUrl, String descricao, String nome) {
        this.imgUrl = imgUrl;
        this.descricao = descricao;
        this.nome = nome;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}

