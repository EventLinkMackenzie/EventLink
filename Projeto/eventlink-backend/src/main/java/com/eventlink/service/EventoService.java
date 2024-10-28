package com.eventlink.service;

import com.eventlink.model.Evento;
import com.eventlink.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }

    public Evento salvar(Evento evento) {
        return eventoRepository.save(evento);
    }

    public Evento atualizar(Long id, Evento evento) {
        evento.setId(id);
        return eventoRepository.save(evento);
    }

    public void deletar(Long id) {
        eventoRepository.deleteById(id);
    }

    @PostConstruct
    public void inicializarEventos() {
        if (eventoRepository.count() == 0) {
            Evento evento1 = new Evento(null, "Bruno Mars ", "2024-03-15", "Allianz Parque, São Paulo",
                    "Venha curtir os hits de Bruno Mars em uma noite cheia de energia e dança!", "/BrunoMars.png");
            Evento evento2 = new Evento(null, "Ana Castela", "2024-03-22", "Autódromo de Interlagos, São Paulo",
                    "Curta Ana Castela ao vivo, com suas emoções e sucessos envolventes!", "/AnaCastela.png");
            eventoRepository.saveAll(Arrays.asList(evento1, evento2));
        }
    }
}
