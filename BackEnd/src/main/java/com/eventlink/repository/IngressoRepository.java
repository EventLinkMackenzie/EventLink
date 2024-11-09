package com.eventlink.repository;

import com.eventlink.model.Ingresso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repositório responsável pelas operações de persistência de ingressos.
 * Fornece métodos para buscar, salvar e gerenciar ingressos no banco de dados.
 *
 * @author EventLink
 * @version 1.0
 */
@Repository
public interface IngressoRepository extends JpaRepository<Ingresso, Long> {
    @Query("SELECT DISTINCT i FROM Ingresso i " +
           "LEFT JOIN FETCH i.evento " +
           "LEFT JOIN FETCH i.usuario " +
           "WHERE i.usuario.id = :usuarioId " +
           "ORDER BY i.dataCompra DESC")
    List<Ingresso> findByUsuarioIdWithEventos(@Param("usuarioId") Long usuarioId);

    @Query("SELECT i FROM Ingresso i " +
           "LEFT JOIN FETCH i.evento " +
           "LEFT JOIN FETCH i.usuario " +
           "WHERE i.id = :ingressoId")
    Ingresso findByIdWithEventos(@Param("ingressoId") Long ingressoId);

    @Query("SELECT COUNT(i) > 0 FROM Ingresso i " +
           "WHERE i.usuario.id = :usuarioId AND i.evento.id = :eventoId")
    boolean existsByUsuarioIdAndEventoId(@Param("usuarioId") Long usuarioId, @Param("eventoId") Long eventoId);
} 