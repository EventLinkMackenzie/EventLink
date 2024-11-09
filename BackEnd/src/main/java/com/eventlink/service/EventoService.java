package com.eventlink.service;

import com.eventlink.model.Evento;
import com.eventlink.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;

/**
 * Serviço responsável pela lógica de negócios relacionada aos eventos.
 * Gerencia operações como criação, atualização, deleção e listagem de eventos.
 *
 * @author EventLink
 * @version 1.0
 */
@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }

    public Evento salvar(Evento evento) {
        try {
            System.out.println("Iniciando salvamento do evento");
            System.out.println("Nome: " + evento.getName());
            System.out.println("Descrição: " + evento.getDescription());
            System.out.println("Data: " + evento.getDate());
            System.out.println("ImageUrl: " + evento.getImageUrl());

            if (evento.getId() != null) {
                throw new RuntimeException("Novo evento não deve ter ID");
            }

            // Garantir que a data não seja nula
            if (evento.getDate() == null) {
                throw new RuntimeException("A data do evento é obrigatória");
            }

            Evento eventoSalvo = eventoRepository.save(evento);
            System.out.println("Evento salvo com sucesso. ID: " + eventoSalvo.getId());
            return eventoSalvo;
        } catch (Exception e) {
            System.err.println("Erro ao salvar evento: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public Evento atualizar(Long id, Evento evento) {
        if (!eventoRepository.existsById(id)) {
            throw new RuntimeException("Evento não encontrado");
        }
        evento.setId(id);
        return eventoRepository.save(evento);
    }

    public void deletar(Long id) {
        if (!eventoRepository.existsById(id)) {
            throw new RuntimeException("Evento não encontrado");
        }
        eventoRepository.deleteById(id);
    }

    public Evento buscarPorId(Long id) {
        return eventoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Evento não encontrado"));
    }

    @PostConstruct
    public void inicializarEventos() {
        if (eventoRepository.count() == 0) {
            // Criando evento do Bruno Mars
            Evento brunoMars = new Evento();
            brunoMars.setName("Bruno Mars");
            brunoMars.setDescription("Venha curtir os hits de Bruno Mars em uma noite cheia de energia e dança!");
            brunoMars.setDate(java.time.LocalDateTime.parse("2024-03-15T20:00:00"));
            brunoMars.setImageUrl("/BrunoMars.png");

            // Criando evento da Ana Castela
            Evento anaCastela = new Evento();
            anaCastela.setName("Ana Castela");
            anaCastela.setDescription("Curta Ana Castela ao vivo, com suas emoções e sucessos envolventes!");
            anaCastela.setDate(java.time.LocalDateTime.parse("2024-03-22T20:00:00"));
            anaCastela.setImageUrl("/AnaCastela.png");

            // Salvando os eventos
            eventoRepository.saveAll(Arrays.asList(brunoMars, anaCastela));
        }
    }
}
