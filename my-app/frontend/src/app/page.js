/**
 * @fileoverview Página inicial da aplicação EventLink.
 * Exibe o banner principal, filtros de busca e lista de eventos disponíveis.
 * Esta é a landing page principal onde os usuários podem ver os eventos em destaque
 * e acessar as principais funcionalidades do sistema.
 */

'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UpcomingEvents from './components/UpcomingEvents';
import styles from './styles/page.module.css';
import { AuthContext } from './contexts/AuthContext';

/**
 * @component
 * @description Componente da página inicial que exibe o banner principal e lista de eventos.
 * Inclui um banner destacado do Coldplay, filtros de busca por data, estado e categoria,
 * e uma lista de eventos próximos.
 * 
 * @example
 * return (
 *   <Home />
 * )
 */
export default function Home() {
  /**
   * Estado para controlar a data selecionada no filtro.
   * @type {Date|null}
   */
  const [startDate, setStartDate] = useState(null);
  
  /**
   * Contexto de autenticação para verificar se o usuário está logado.
   * @type {Object}
   * @property {boolean} isAuthenticated - Status de autenticação do usuário
   * @property {Object} user - Dados do usuário logado
   */
  const { isAuthenticated, user } = useContext(AuthContext);

  /**
   * Lista de estados brasileiros para o filtro de localização.
   * @constant {Array<string>}
   */
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.imageContainer}>
          <img src="/Coldplay.png" alt="Coldplay" className={styles.eventImage} />
        </div>
        <div className={styles.description}>
          <h1>Show do ColdPlay</h1>
          <p>
            A banda mais famosa da Inglaterra está agora no Brasil! Não perca a 
            chance de vê-los ao vivo. Experimente a música incrível e a performance 
            eletrizante. Garanta já seus ingressos e junte-se à emoção!
          </p>
          <Link href="/ingresso-coldplay" className={styles.ticketButton}>
            Garanta seu ingresso
          </Link>
        </div>
      </div>
      
      <div className={styles.eventInfo}>
        <div className={styles.eventField}>
          <label htmlFor="eventName">Nome do Evento</label>
          <input type="text" id="eventName" placeholder="Digite aqui" className={styles.eventInput} />
        </div>
        <div className={styles.eventField}>
          <label htmlFor="eventState">Estado</label>
          <select id="eventState" className={styles.eventSelect}>
            <option value="">Selecione o Estado</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
        <div className={styles.eventField}>
          <label htmlFor="eventDate">Data</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Qualquer Data"
            className={styles.eventDate}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
      
      <div className={styles.eventsToFooterWrapper}>
        <UpcomingEvents />
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreButton}>Carregar Mais</button>
        </div>
      </div>
      <Footer />
    </main>
  );
}