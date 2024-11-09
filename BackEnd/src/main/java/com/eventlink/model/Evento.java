package com.eventlink.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * Classe que representa um evento no sistema.
 * Esta entidade armazena todas as informações relacionadas aos eventos,
 * incluindo detalhes como nome, descrição, data e imagem.
 *
 * @author EventLink
 * @version 1.0
 */
@Entity
@Table(name = "eventos")
public class Evento {

    /** Identificador único do evento */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nome do evento */
    @Column(nullable = false)
    private String name;

    /** Descrição detalhada do evento */
    @Column(nullable = false, length = 1000)
    private String description;

    /** Data e hora do evento */
    @Column(nullable = false)
    private LocalDateTime date;

    /** URL da imagem do evento */
    @Column(nullable = false)
    private String imageUrl;

    /** Lista de ingressos vendidos para este evento */
    @OneToMany(mappedBy = "evento")
    @JsonIgnoreProperties("evento")
    private List<Ingresso> ingressos = new ArrayList<>();

    // Construtor padrão
    public Evento() {
    }

    // Construtor com parâmetros
    public Evento(Long id, String name, String dateStr, String location, String description, String imageUrl) {
        this.id = id;
        this.name = name;
        // Converter a string de data para LocalDateTime
        this.date = LocalDateTime.parse(dateStr + "T00:00:00", DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
} 