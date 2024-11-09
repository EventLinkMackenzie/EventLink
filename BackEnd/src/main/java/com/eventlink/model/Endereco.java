package com.eventlink.model;

import jakarta.persistence.Embeddable;

/**
 * Classe que representa o endereço de um usuário no sistema.
 * Esta classe é incorporada na entidade Usuario.
 *
 * @author EventLink
 * @version 1.0
 */
@Embeddable
public class Endereco {
    private String cep;
    private String logradouro;
    private String cidade;
    private String estado;

    public Endereco() {
    }

    // Getters e Setters
    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
} 