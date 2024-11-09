/**
 * @fileoverview Página de login da aplicação.
 * Permite que usuários façam login usando email e senha.
 */

'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../contexts/AuthContext';
import { loginUsuario } from '../../services/api';
import styles from './login.module.css';

/**
 * @component
 * @description Componente da página de login que gerencia autenticação de usuários.
 * 
 * @example
 * return (
 *   <LoginPage />
 * )
 */
const LoginPage = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [error, setError] = useState('');

  /**
   * Atualiza o estado do formulário quando os campos são alterados.
   * @function
   * @param {Object} e - Evento de mudança do input
   */
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Processa o envio do formulário de login.
   * @async
   * @function
   * @param {Object} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUsuario(formData);
      login(response.data);
      router.push('/');
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Email ou senha inválidos');
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
      <div className={styles.loginContainer}>
        <p className={styles.welcomeMessage}>Bem Vindo de Volta!</p>
        <h1 className={styles.title}>Login</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              placeholder="Senha"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>
        </form>
        <p className={styles.cadastroLink}>
          Novo Usuário? <Link href="/pages/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
