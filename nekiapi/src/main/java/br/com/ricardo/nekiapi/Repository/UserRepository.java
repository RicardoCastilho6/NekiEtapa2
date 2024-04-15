package br.com.ricardo.nekiapi.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ricardo.nekiapi.Entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findById(Long Id);

    boolean existsByEmail(String email);
}