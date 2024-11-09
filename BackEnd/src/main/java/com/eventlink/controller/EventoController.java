package com.eventlink.controller;

import com.eventlink.model.Evento;
import com.eventlink.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controller responsável por gerenciar as operações relacionadas aos eventos.
 * Fornece endpoints para criar, listar, atualizar e deletar eventos.
 *
 * @author EventLink
 * @version 1.0
 */
@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    /**
     * Cria um novo evento.
     *
     * @param username Nome do usuário admin
     * @param password Senha do admin
     * @param evento Dados do evento a ser criado
     * @return ResponseEntity contendo o evento criado ou erro
     */
    @PostMapping
    public ResponseEntity<Object> criarEvento(
            @RequestHeader("X-Admin-Username") String username,
            @RequestHeader("X-Admin-Password") String password,
            @RequestBody Evento evento) {
        try {
            if (!isAdminValid(username, password)) {
                return ResponseEntity.status(401)
                    .body(Map.of("error", "Credenciais inválidas"));
            }
            
            Evento novoEvento = eventoService.salvar(evento);
            return ResponseEntity.ok(novoEvento);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Erro ao criar evento: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Evento>> listarEventos() {
        List<Evento> eventos = eventoService.listarTodos();
        return ResponseEntity.ok(eventos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarEvento(
            @RequestHeader("X-Admin-Username") String username,
            @RequestHeader("X-Admin-Password") String password,
            @PathVariable Long id,
            @RequestBody Evento evento) {
        try {
            if (!isAdminValid(username, password)) {
                return ResponseEntity.status(401)
                    .body(Map.of("error", "Credenciais inválidas"));
            }

            Evento eventoAtualizado = eventoService.atualizar(id, evento);
            return ResponseEntity.ok(eventoAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Erro ao atualizar evento: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarEvento(
            @RequestHeader("X-Admin-Username") String username,
            @RequestHeader("X-Admin-Password") String password,
            @PathVariable Long id) {
        try {
            if (!isAdminValid(username, password)) {
                return ResponseEntity.status(401)
                    .body(Map.of("error", "Credenciais inválidas"));
            }

            System.out.println("Deletando evento ID: " + id);
            eventoService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            System.err.println("Erro ao deletar evento: " + e.getMessage());
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Erro ao deletar evento: " + e.getMessage()));
        }
    }

    private boolean isAdminValid(String username, String password) {
        return "adminEventLink".equals(username) && "senha@123".equals(password);
    }
} 