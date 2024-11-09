package com.eventlink.service;

import com.eventlink.model.Ingresso;
import com.eventlink.model.Usuario;
import com.eventlink.model.Evento;
import com.eventlink.repository.IngressoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Serviço responsável pela lógica de negócios relacionada aos ingressos.
 * Gerencia operações como compra de ingressos e listagem de ingressos por usuário.
 *
 * @author EventLink
 * @version 1.0
 */
@Service
public class IngressoService {

    @Autowired
    private IngressoRepository ingressoRepository;

    @Transactional
    public Ingresso comprarIngresso(Usuario usuario, Evento evento) {
        System.out.println("Iniciando compra de ingresso...");
        System.out.println("Usuário ID: " + usuario.getId());
        System.out.println("Evento ID: " + evento.getId());
        System.out.println("Evento Nome: " + evento.getName());
        
        try {
            // Verificar se o usuário já tem ingresso para este evento
            boolean ingressoExistente = ingressoRepository.existsByUsuarioIdAndEventoId(
                usuario.getId(), evento.getId());
            
            if (ingressoExistente) {
                throw new RuntimeException("Usuário já possui ingresso para este evento");
            }

            Ingresso ingresso = new Ingresso();
            ingresso.setUsuario(usuario);
            ingresso.setEvento(evento);
            ingresso.setDataCompra(LocalDateTime.now());
            ingresso.setStatus("ATIVO");

            Ingresso ingressoSalvo = ingressoRepository.save(ingresso);
            System.out.println("Ingresso salvo com sucesso. ID: " + ingressoSalvo.getId());
            
            return ingressoRepository.findByIdWithEventos(ingressoSalvo.getId());
        } catch (Exception e) {
            System.err.println("Erro ao salvar ingresso: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Transactional
    public List<Ingresso> listarIngressosDoUsuario(Long usuarioId) {
        System.out.println("Buscando ingressos do usuário: " + usuarioId);
        try {
            List<Ingresso> ingressos = ingressoRepository.findByUsuarioIdWithEventos(usuarioId);
            System.out.println("Total de ingressos encontrados: " + ingressos.size());
            
            for (Ingresso ingresso : ingressos) {
                System.out.println("Ingresso ID: " + ingresso.getId());
                System.out.println("Evento: " + ingresso.getEvento().getName());
                System.out.println("Data da compra: " + ingresso.getDataCompra());
            }
            
            return ingressos;
        } catch (Exception e) {
            System.err.println("Erro ao buscar ingressos: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
} 