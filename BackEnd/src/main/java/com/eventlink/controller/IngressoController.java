package com.eventlink.controller;

import com.eventlink.model.Ingresso;
import com.eventlink.model.Usuario;
import com.eventlink.model.Evento;
import com.eventlink.service.IngressoService;
import com.eventlink.service.UsuarioService;
import com.eventlink.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * Controller responsável por gerenciar as operações relacionadas aos ingressos.
 * Fornece endpoints para compra e listagem de ingressos.
 *
 * @author EventLink
 * @version 1.0
 */
@RestController
@RequestMapping("/api/ingressos")
@CrossOrigin(origins = "http://localhost:3000")
public class IngressoController {

    @Autowired
    private IngressoService ingressoService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private EventoService eventoService;

    @PostMapping("/comprar")
    public ResponseEntity<?> comprarIngresso(@RequestBody Map<String, Long> request) {
        try {
            System.out.println("Recebendo requisição de compra de ingresso: " + request);
            
            Long usuarioId = request.get("usuarioId");
            Long eventoId = request.get("eventoId");
            
            System.out.println("Buscando usuário: " + usuarioId);
            Usuario usuario = usuarioService.buscarPorId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            
            System.out.println("Buscando evento: " + eventoId);
            Evento evento = eventoService.buscarPorId(eventoId);

            System.out.println("Processando compra do ingresso...");
            Ingresso ingresso = ingressoService.comprarIngresso(usuario, evento);
            System.out.println("Ingresso comprado com sucesso: " + ingresso.getId());

            List<Ingresso> ingressos = ingressoService.listarIngressosDoUsuario(usuarioId);
            Ingresso ingressoCompleto = ingressos.stream()
                .filter(i -> i.getId().equals(ingresso.getId()))
                .findFirst()
                .orElse(ingresso);

            return ResponseEntity.ok(ingressoCompleto);
        } catch (Exception e) {
            System.err.println("Erro ao comprar ingresso: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Ingresso>> listarIngressosDoUsuario(@PathVariable Long usuarioId) {
        try {
            List<Ingresso> ingressos = ingressoService.listarIngressosDoUsuario(usuarioId);
            return ResponseEntity.ok(ingressos);
        } catch (Exception e) {
            System.err.println("Erro ao listar ingressos: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
} 