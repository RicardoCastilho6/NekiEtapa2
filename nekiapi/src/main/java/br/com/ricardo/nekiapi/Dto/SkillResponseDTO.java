package br.com.ricardo.nekiapi.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SkillResponseDTO {
    private Long id;
    private String nome;
    private String imgUrl;
    private String descricao;

  
}
