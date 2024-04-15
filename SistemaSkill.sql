
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);


CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    imgUrl VARCHAR(255) NOT NULL,
    descricao VARCHAR(1000) NOT NULL
);


CREATE TABLE usuarios_skills (
    id SERIAL PRIMARY KEY,
    usuario_id BIGINT REFERENCES usuarios(id) ON DELETE CASCADE,
    skill_id BIGINT REFERENCES skills(id) ON DELETE CASCADE,
    level INT NOT NULL
);


CREATE UNIQUE INDEX idx_usuarios_skills ON usuarios_skills(usuario_id, skill_id);

------------------------------------------------------Inserts---------------------------------------------------

INSERT INTO usuarios (login, senha, role) VALUES
('usuario1', '$2a$10$cSepjuEv0WYlO6Bh7bWIZuKGDGMdO4PWeLcwZvgeGuZkInXviYu2G', 'USER'),
('admin', '$2a$10$.pIMzYkJ9gzVj74bRzF3J.GdhGhdo743MwcLip3WwjObfl7X/StrO', 'ADMIN'),
('user3', '$2a$10$qpwW091g8DCfJ9tGJUcZ3.Mlc.tKj3TQSPhN4moyW5wM/qNJblOKW', 'ADMIN');

--senha1($2a$10$cSepjuEv0WYlO6Bh7bWIZuKGDGMdO4PWeLcwZvgeGuZkInXviYu2G)
--admin($2a$10$.pIMzYkJ9gzVj74bRzF3J.GdhGhdo743MwcLip3WwjObfl7X/StrO)
--senha123($2a$10$qpwW091g8DCfJ9tGJUcZ3.Mlc.tKj3TQSPhN4moyW5wM/qNJblOKW)


INSERT INTO skills (nome, img_url, descricao) VALUES
('Java', 'https://hermes.dio.me/articles/cover/7b89fda2-4af3-4ae0-98bc-ad2b65854909.png', 'Linguagem de programação Java'),
('Spring', 'https://enotas.com.br/blog/wp-content/uploads/2021/04/Spring-Framework-1024x440.png', 'Framework Spring para Java'),
('SQL', 'https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png', 'Linguagem de consulta estruturada'),
('Python', 'https://logosmarcas.net/wp-content/uploads/2021/10/Python-Logo.png', 'Linguagem de programação Python');


INSERT INTO usuarios_skills (usuario_id, skill_id, level) VALUES
(1, 1, 3), 
(1, 2, 2), 
(2, 3, 1); 