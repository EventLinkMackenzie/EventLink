/**
 * @fileoverview Componente de rodapé da aplicação.
 * Exibe informações de copyright e links importantes.
 */

import React from 'react';
import styles from './styles/Footer.module.css';

/**
 * @component
 * @description Rodapé presente em todas as páginas da aplicação.
 * 
 * @example
 * return (
 *   <Footer />
 * )
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.footerSection}>
          <h3>EventLink</h3>
          <p>EventLink é uma plataforma global de venda de ingressos self-service para experiências ao vivo, que permite que qualquer pessoa crie, compartilhe, encontre e participe de eventos que alimentam suas paixões e enriquecem suas vidas.</p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon}>Facebook</a>
            <a href="#" className={styles.socialIcon}>Twitter</a>
            <a href="#" className={styles.socialIcon}>LinkedIn</a>
          </div>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Sobre Nós</h3>
          <ul>
            <li><a href="#">Imprensa</a></li>
            <li><a href="#">Contate-nos</a></li>
            <li><a href="#">Central de Ajuda</a></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Planejar Eventos</h3>
          <ul>
            <li><a href="#">Criar e configurar</a></li>
            <li><a href="#">Venda ingressos</a></li>
            <li><a href="#">Confirmação de presença on-line</a></li>
            <li><a href="#">Eventos on-line</a></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h3>EventLink</h3>
          <ul>
            <li><a href="#">Como funciona</a></li>
            <li><a href="#">Privacidade</a></li>
            <li><a href="#">Termos</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
