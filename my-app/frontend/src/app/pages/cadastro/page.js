/**
 * @fileoverview Página de cadastro da aplicação.
 * Permite que novos usuários se cadastrem no sistema.
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cadastrarUsuario } from '../../services/api';
import styles from './cadastro.module.css';

/**
 * @component
 * @description Componente da página de cadastro que gerencia registro de novos usuários.
 * 
 * @example
 * return (
 *   <CadastroPage />
 * )
 */
const CadastroPage = () => {
  const router = useRouter();
  const [tipoPessoa, setTipoPessoa] = useState('fisica');
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    senha: '',
    confirmSenha: '',
    nome: '',
    sobrenome: '',
    cpf: '',
    celular: '',
    razaoSocial: '',
    cnpj: '',
    inscricaoEstadual: '',
    isento: false,
    telefoneComercial: '',
    cep: '',
    endereco: '',
    cidade: '',
    estado: ''
  });

  /**
   * Lista de estados brasileiros para o formulário.
   * @constant {Array<string>}
   */
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  /**
   * Atualiza o estado do formulário quando os campos são alterados.
   * @function
   * @param {Object} e - Evento de mudança do input
   */
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  /**
   * Processa o envio do formulário de cadastro.
   * @async
   * @function
   * @param {Object} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        nome: tipoPessoa === 'fisica' ? `${formData.nome} ${formData.sobrenome}` : formData.razaoSocial,
        email: formData.email,
        senha: formData.senha,
        tipoPessoa,
        documento: tipoPessoa === 'fisica' ? formData.cpf : formData.cnpj,
        telefone: tipoPessoa === 'fisica' ? formData.celular : formData.telefoneComercial,
        endereco: {
          cep: formData.cep,
          logradouro: formData.endereco,
          cidade: formData.cidade,
          estado: formData.estado
        }
      };

      await cadastrarUsuario(userData);
      alert('Cadastro realizado com sucesso! Por favor, faça login para continuar.');
      router.push('/pages/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert(error.response?.data?.error || 'Erro ao realizar cadastro');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.eventLinkLogo}>
        <Link href="/">EventLink</Link>
      </div>
      <div className={styles.returnNav}>
        <Link href="/" className={styles.returnLink}>
          Voltar para Home
        </Link>
      </div>
      <div className={styles.cadastroContainer}>
        <h1 className={styles.title}>Cadastro</h1>
        <div className={styles.tabContainer}>
          <button 
            className={`${styles.tabButton} ${tipoPessoa === 'fisica' ? styles.active : ''}`}
            onClick={() => setTipoPessoa('fisica')}
          >
            Pessoa Física
          </button>
          <button 
            className={`${styles.tabButton} ${tipoPessoa === 'juridica' ? styles.active : ''}`}
            onClick={() => setTipoPessoa('juridica')}
          >
            Pessoa Jurídica
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Campos de acesso */}
          <div className={styles.formSection}>
            <h2>Dados de Acesso</h2>
            <input type="email" id="email" placeholder="E-mail" required onChange={handleInputChange} />
            <input type="email" id="confirmEmail" placeholder="Confirme o e-mail" required onChange={handleInputChange} />
            <input type="password" id="senha" placeholder="Senha" required onChange={handleInputChange} />
            <input type="password" id="confirmSenha" placeholder="Confirme a senha" required onChange={handleInputChange} />
          </div>

          {/* Campos específicos por tipo de pessoa */}
          <div className={styles.formSection}>
            <h2>{tipoPessoa === 'fisica' ? 'Dados Pessoais' : 'Dados da Empresa'}</h2>
            {tipoPessoa === 'fisica' ? (
              <>
                <input type="text" id="nome" placeholder="Nome" required onChange={handleInputChange} />
                <input type="text" id="sobrenome" placeholder="Sobrenome" required onChange={handleInputChange} />
                <input type="text" id="cpf" placeholder="CPF" required onChange={handleInputChange} />
                <input type="tel" id="celular" placeholder="Celular" required onChange={handleInputChange} />
              </>
            ) : (
              <>
                <input type="text" id="razaoSocial" placeholder="Razão Social" required onChange={handleInputChange} />
                <input type="text" id="cnpj" placeholder="CNPJ" required onChange={handleInputChange} />
                <div className={styles.inscricaoEstadualContainer}>
                  <input 
                    type="text" 
                    id="inscricaoEstadual" 
                    placeholder="Inscrição Estadual" 
                    required={!formData.isento} 
                    onChange={handleInputChange}
                    disabled={formData.isento}
                  />
                  <div className={styles.isentoCheckbox}>
                    <input 
                      type="checkbox" 
                      id="isento" 
                      checked={formData.isento}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="isento">Isento</label>
                  </div>
                </div>
                <input type="tel" id="telefoneComercial" placeholder="Telefone Comercial" required onChange={handleInputChange} />
              </>
            )}
          </div>

          {/* Campos de endereço */}
          <div className={styles.formSection}>
            <h2>Endereço</h2>
            <input type="text" id="cep" placeholder="CEP" required onChange={handleInputChange} />
            <input type="text" id="endereco" placeholder="Endereço" required onChange={handleInputChange} />
            <input type="text" id="cidade" placeholder="Cidade" required onChange={handleInputChange} />
            <select id="estado" required onChange={handleInputChange}>
              <option value="">Selecione o Estado</option>
              {estados.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroPage;
