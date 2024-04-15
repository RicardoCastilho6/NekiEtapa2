package br.com.ricardo.nekiapi.Dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public record LoginRequestDTO (
    @NotBlank(message = "Email é Obrigatório") @Email(message = "Formato de email inválido") String email,
    @NotBlank(message = "Password é Obrigatório") @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres") String password){}