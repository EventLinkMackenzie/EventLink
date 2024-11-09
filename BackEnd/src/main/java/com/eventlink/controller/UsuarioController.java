package com.eventlink.controller;

import com.eventlink.model.Usuario;
import com.eventlink.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller responsável por gerenciar as operações relacionadas aos usuários.
 * Fornece endpoints para cadastro e autenticação de usuários.
 *
 * @author EventLink
 * @version 1.0
 */
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Endpoint para cadastrar um novo usuário.
     *
     * @param usuario Dados do usuário a ser cadastrado
     * @return ResponseEntity contendo o usuário cadastrado ou erro
     */
    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        try {
            System.out.println("Recebendo requisição de cadastro: " + usuario.getEmail());
            Usuario novoUsuario = usuarioService.cadastrar(usuario);
            return ResponseEntity.ok(novoUsuario);
        } catch (Exception e) {
            System.err.println("Erro no cadastro: " + e.getMessage());
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Endpoint para autenticar um usuário.
     *
     * @param credentials Credenciais do usuário (email e senha)
     * @return ResponseEntity contendo os dados do usuário ou erro
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String senha = credentials.get("senha");
            
            Usuario usuario = usuarioService.autenticar(email, senha)
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));
            
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }
} 