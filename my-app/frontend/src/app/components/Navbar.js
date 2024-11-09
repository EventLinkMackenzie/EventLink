/**
 * @fileoverview Componente de navegação principal da aplicação.
 * Exibe o menu de navegação e gerencia o estado de autenticação do usuário.
 */

'use client'

import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import styles from './styles/Navbar.module.css';
import { AuthContext } from '../contexts/AuthContext';

/**
 * @component
 * @description Barra de navegação principal que exibe links e controle de autenticação.
 * 
 * @example
 * return (
 *   <Navbar />
 * )
 */
const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Realiza o logout do usuário e redireciona para a página inicial.
   * @function
   */
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const eventLinkHref = pathname === '/' ? '/pages/admin/login' : '/';

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href={eventLinkHref} className={styles.logoText}>EventLink</Link>
      </div>
      <div className={styles.navbarGroup}>
        <Link href="/" className={styles.navLink}>Home</Link>
        {isAuthenticated && (
          <Link href="/pages/meus-ingressos" className={styles.navLink}>Meus Ingressos</Link>
        )}
        <Link href="/suporte" className={styles.navLink}>Suporte</Link>
        {isAuthenticated ? (
          <div className={styles.profileDropdown}>
            <button className={styles.profileButton}>
              {user?.nome || 'Perfil'}
              <div className={styles.dropdownContent}>
                <Link href="/pages/meus-ingressos">Meus Ingressos</Link>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Sair
                </button>
              </div>
            </button>
          </div>
        ) : (
          <Link href="/pages/login" className={styles.loginButton}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
