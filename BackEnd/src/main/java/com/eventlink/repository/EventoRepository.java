package com.eventlink.repository;

import com.eventlink.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositório responsável pelas operações de persistência de eventos.
 * Fornece métodos para buscar, salvar e gerenciar eventos no banco de dados.
 *
 * @author EventLink
 * @version 1.0
 */
@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    // Métodos herdados do JpaRepository são suficientes para as operações básicas
}
