package com.eventlink.service;

import com.eventlink.model.Usuario;
import com.eventlink.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

/**
 * Serviço responsável pela lógica de negócios relacionada aos usuários.
 * Gerencia operações como cadastro, autenticação e busca de usuários.
 *
 * @author EventLink
 * @version 1.0
 */
@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Cadastra um novo usuário no sistema.
     * Verifica se o email já está cadastrado antes de salvar.
     *
     * @param usuario Dados do usuário a ser cadastrado
     * @return Usuario cadastrado
     * @throws RuntimeException se o email já estiver cadastrado ou ocorrer erro no cadastro
     */
    public Usuario cadastrar(Usuario usuario) {
        System.out.println("Iniciando cadastro de usuário");
        
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        try {
            // Aqui você poderia adicionar criptografia da senha
            return usuarioRepository.save(usuario);
        } catch (Exception e) {
            System.err.println("Erro ao salvar usuário: " + e.getMessage());
            throw new RuntimeException("Erro ao cadastrar usuário: " + e.getMessage());
        }
    }

    /**
     * Autentica um usuário com email e senha.
     *
     * @param email Email do usuário
     * @param senha Senha do usuário
     * @return Optional contendo o usuário, se autenticado com sucesso
     */
    public Optional<Usuario> autenticar(String email, String senha) {
        return usuarioRepository.findByEmail(email)
            .filter(usuario -> usuario.getSenha().equals(senha));
    }

    /**
     * Busca um usuário pelo ID.
     *
     * @param id ID do usuário
     * @return Optional contendo o usuário, se encontrado
     */
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }
} 