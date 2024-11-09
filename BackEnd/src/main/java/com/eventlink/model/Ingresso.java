package com.eventlink.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Classe que representa um ingresso no sistema.
 * Esta entidade armazena as informações de um ingresso comprado,
 * relacionando um usuário a um evento específico.
 *
 * @author EventLink
 * @version 1.0
 */
@Entity
@Table(name = "ingressos")
public class Ingresso {
    
    /** Identificador único do ingresso */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Evento ao qual o ingresso pertence */
    @ManyToOne
    @JoinColumn(name = "evento_id", nullable = false)
    @JsonIgnoreProperties("ingressos")
    private Evento evento;

    /** Usuário que comprou o ingresso */
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties("ingressos")
    private Usuario usuario;

    /** Data e hora da compra do ingresso */
    @Column(nullable = false)
    private LocalDateTime dataCompra;

    /** Status do ingresso (ATIVO, USADO, CANCELADO) */
    @Column(nullable = false)
    private String status;

    public Ingresso() {
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public LocalDateTime getDataCompra() {
        return dataCompra;
    }

    public void setDataCompra(LocalDateTime dataCompra) {
        this.dataCompra = dataCompra;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
} 