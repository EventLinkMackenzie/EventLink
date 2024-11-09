/**
 * @fileoverview Layout padrão para páginas administrativas.
 * Fornece navegação lateral e estrutura comum para área admin.
 */

import React from 'react';
import Link from 'next/link';
import styles from './styles/AdminLayout.module.css';

/**
 * @component
 * @description Layout que envolve todas as páginas administrativas.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Conteúdo da página
 * 
 * @example
 * return (
 *   <AdminLayout>
 *     <ConteudoDaPagina />
 *   </AdminLayout>
 * )
 */
const AdminLayout = ({ children }) => {
  return (
    <div className={styles.adminLayout}>
      <nav className={styles.sidebar}>
        <h2>Painel Admin</h2>
        <ul>
          <li><Link href="/admin/eventos">Gerenciar Eventos</Link></li>
          <li><Link href="/" onClick={() => localStorage.removeItem('adminToken')}>Sair</Link></li>
        </ul>
      </nav>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
