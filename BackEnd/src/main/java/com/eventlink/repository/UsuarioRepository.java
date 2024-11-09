package com.eventlink.repository;

import com.eventlink.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repositório responsável pelas operações de persistência de usuários.
 * Fornece métodos para buscar, salvar e gerenciar usuários no banco de dados.
 *
 * @author EventLink
 * @version 1.0
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    /**
     * Busca um usuário pelo email.
     *
     * @param email Email do usuário
     * @return Optional contendo o usuário, se encontrado
     */
    Optional<Usuario> findByEmail(String email);

    /**
     * Verifica se existe um usuário com o email fornecido.
     *
     * @param email Email a ser verificado
     * @return true se existir um usuário com o email, false caso contrário
     */
    boolean existsByEmail(String email);
} 