/**
 * @fileoverview Componente que exibe a lista de eventos próximos.
 * Permite filtrar e comprar ingressos para os eventos.
 */

'use client'

import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './styles/UpcomingEvents.module.css';
import { getEvents, comprarIngresso } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

/**
 * @component
 * @description Exibe uma grade de eventos próximos com opções de filtro e compra.
 * 
 * @example
 * return (
 *   <UpcomingEvents />
 * )
 */
const UpcomingEvents = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    days: 'Dias da Semana',
    eventType: 'Tipo do Evento',
    category: 'Qualquer Categoria'
  });

  /**
   * Busca a lista de eventos do backend.
   * @async
   * @function fetchEvents
   */
  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Processa a compra de um ingresso.
   * @async
   * @function handleComprarIngresso
   * @param {Object} event - Evento para o qual o ingresso será comprado
   */
  const handleComprarIngresso = async (event) => {
    if (!isAuthenticated) {
      alert('Por favor, faça login para comprar ingressos');
      router.push('/pages/login');
      return;
    }

    try {
      console.log('Comprando ingresso:', {
        usuarioId: user.id,
        eventoId: event.id
      });

      const response = await comprarIngresso({
        usuarioId: user.id,
        eventoId: event.id
      });

      console.log('Resposta da compra:', response);

      if (response.data) {
        alert(`Ingresso para ${event.name} comprado com sucesso!`);
      } else {
        throw new Error('Erro ao processar a compra');
      }
    } catch (error) {
      console.error('Erro ao comprar ingresso:', error);
      alert('Erro ao comprar ingresso. Por favor, tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Eventos Próximos</h2>
        <div className={styles.filters}>
          <select 
            className={styles.filterSelect}
            value={selectedFilters.days}
            onChange={(e) => setSelectedFilters({...selectedFilters, days: e.target.value})}
          >
            <option value="Dias da Semana">Dias da Semana</option>
            <option value="Segunda">Segunda</option>
            <option value="Terça">Terça</option>
            <option value="Quarta">Quarta</option>
            <option value="Quinta">Quinta</option>
            <option value="Sexta">Sexta</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>

          <select 
            className={styles.filterSelect}
            value={selectedFilters.eventType}
            onChange={(e) => setSelectedFilters({...selectedFilters, eventType: e.target.value})}
          >
            <option value="Tipo do Evento">Tipo do Evento</option>
            <option value="Show">Show</option>
            <option value="Teatro">Teatro</option>
            <option value="Esporte">Esporte</option>
            <option value="Festival">Festival</option>
          </select>

          <select 
            className={styles.filterSelect}
            value={selectedFilters.category}
            onChange={(e) => setSelectedFilters({...selectedFilters, category: e.target.value})}
          >
            <option value="Qualquer Categoria">Qualquer Categoria</option>
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
            <option value="Sertanejo">Sertanejo</option>
            <option value="Eletrônico">Eletrônico</option>
          </select>
        </div>
      </div>
      <div className={styles.eventsGrid}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <div className={styles.imageContainer}>
              <Image
                src={event.imageUrl}
                alt={event.name}
                layout="responsive"
                width={300}
                height={200}
                objectFit="cover"
                className={styles.eventImage}
              />
              <div className={styles.dateOverlay}>
                <span className={styles.month}>
                  {new Date(event.date).toLocaleString('default', { month: 'short' })}
                </span>
                <span className={styles.day}>
                  {new Date(event.date).getDate()}
                </span>
              </div>
            </div>
            <div className={styles.eventDetails}>
              <h3 className={styles.eventName}>{event.name}</h3>
              <p className={styles.eventDescription}>{event.description}</p>
              <button 
                onClick={() => handleComprarIngresso(event)}
                className={styles.buyButton}
              >
                Comprar Ingresso
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
