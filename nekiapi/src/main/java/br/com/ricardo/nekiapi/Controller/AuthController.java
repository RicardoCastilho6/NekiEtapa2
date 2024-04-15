package br.com.ricardo.nekiapi.Controller;




import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ricardo.nekiapi.Dto.LoginRequestDTO;
import br.com.ricardo.nekiapi.Dto.RegisterRequestDTO;
import br.com.ricardo.nekiapi.Dto.ResponseDTO;
import br.com.ricardo.nekiapi.Entity.User;
import br.com.ricardo.nekiapi.Exception.UserNotFoundException;
import br.com.ricardo.nekiapi.Repository.UserRepository;
import br.com.ricardo.nekiapi.infra.security.TokenService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    
    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginRequestDTO body){
        User user = this.repository.findByEmail(body.email())
        .orElseThrow(() -> new UserNotFoundException("Usuario não Encontrado"));
        if(passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getName(), token,user.getId()));
        }
        return ResponseEntity.badRequest().build();
    }


    @PostMapping("/register")
public ResponseEntity register(@Valid @RequestBody RegisterRequestDTO body) {
   
    if (body.getName() == null || body.getEmail() == null || body.getPassword() == null) {
        return ResponseEntity.badRequest().body("Todos os campos são obrigatórios");
    }

    if (repository.existsByEmail(body.getEmail())) {
        return ResponseEntity.badRequest().body("Já existe um usuário registrado com este email");
    }

    User newUser = new User();
    newUser.setPassword(passwordEncoder.encode(body.getPassword()));
    newUser.setEmail(body.getEmail());
    newUser.setName(body.getName());
    this.repository.save(newUser);

    String token = this.tokenService.generateToken(newUser);
    
    return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token, newUser.getId()));
}
}

