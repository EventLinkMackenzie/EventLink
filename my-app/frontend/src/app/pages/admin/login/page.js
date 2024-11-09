/**
 * @fileoverview Página de login administrativo.
 * Permite que administradores acessem o painel de controle.
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AdminLogin.module.css';

/**
 * @component
 * @description Componente da página de login administrativo.
 */
const AdminLoginPage = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.username === 'adminEventLink' && credentials.password === 'senha@123') {
      localStorage.setItem('adminToken', 'true');
      router.push('/pages/admin/eventos');
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login de Administrador</h2>
        {error && <div className={styles.error}>{error}</div>}
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Nome de usuário"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Senha"
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
