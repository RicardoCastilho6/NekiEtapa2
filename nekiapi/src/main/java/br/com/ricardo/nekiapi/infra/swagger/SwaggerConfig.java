package br.com.ricardo.nekiapi.infra.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {
	
    @Bean
    public OpenAPI custmOpenAPI() {
        return new OpenAPI()
            .components(new Components()
            .addSecuritySchemes("bearerAuth", new SecurityScheme()
            .type(SecurityScheme.Type.HTTP)
            .scheme("bearer")
            .bearerFormat("JWT")
            )
        )
            .info(new Info()
                .title("NekiSkills")
                .version("1.0v")
                .description("")
                .contact(new Contact()
                .name("Ricardo")
                .email("ricardocastilhorodrigues@gmail.com")
                )
            )
            .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}