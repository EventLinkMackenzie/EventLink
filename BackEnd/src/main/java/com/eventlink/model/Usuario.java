package com.eventlink.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Classe que representa um usuário no sistema.
 * Esta entidade armazena todas as informações relacionadas aos usuários,
 * incluindo seus dados pessoais e ingressos comprados.
 *
 * @author EventLink
 * @version 1.0
 */
@Entity
@Table(name = "usuarios")
public class Usuario {
    
    /** Identificador único do usuário */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nome completo do usuário */
    @Column(nullable = false)
    private String nome;

    /** Email do usuário, usado para login */
    @Column(nullable = false, unique = true)
    private String email;

    /** Senha do usuário */
    @Column(nullable = false)
    private String senha;

    /** Tipo de pessoa (física ou jurídica) */
    private String tipoPessoa;

    /** Documento (CPF ou CNPJ) */
    private String documento;

    /** Telefone de contato */
    private String telefone;

    /** Endereço do usuário */
    @Embedded
    private Endereco endereco = new Endereco();

    /** Lista de ingressos comprados pelo usuário */
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("usuario")
    private List<Ingresso> ingressos = new ArrayList<>();

    // Construtor padrão
    public Usuario() {
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTipoPessoa() {
        return tipoPessoa;
    }

    public void setTipoPessoa(String tipoPessoa) {
        this.tipoPessoa = tipoPessoa;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public List<Ingresso> getIngressos() {
        return ingressos;
    }

    public void setIngressos(List<Ingresso> ingressos) {
        this.ingressos = ingressos;
    }
} 