/**
 * @fileoverview Página de gerenciamento de eventos.
 * Permite que administradores criem, editem e excluam eventos.
 */

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../../services/api';
import AdminLayout from '../../../components/AdminLayout';
import styles from './AdminEventos.module.css';

/**
 * @component
 * @description Componente da página de gerenciamento de eventos.
 * 
 * @example
 * return (
 *   <AdminEventos />
 * )
 */
const AdminEventos = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({ name: '', description: '', date: '', imageUrl: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

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
      setError('Falha ao carregar eventos');
    }
  };

  /**
   * Exibe uma mensagem de sucesso temporária.
   * @function
   * @param {string} message - Mensagem a ser exibida
   */
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
    } else {
      fetchEvents();
      const interval = setInterval(fetchEvents, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleInputChange = (e) => {
    setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formattedDate = new Date(currentEvent.date);
      formattedDate.setHours(0, 0, 0, 0);

      const eventData = {
        ...currentEvent,
        date: formattedDate.toISOString().split('.')[0]
      };

      if (currentEvent.id) {
        await updateEvent(currentEvent.id, eventData);
        showSuccessMessage('Evento atualizado com sucesso!');
      } else {
        await createEvent(eventData);
        showSuccessMessage('Evento criado com sucesso!');
      }

      setCurrentEvent({ name: '', description: '', date: '', imageUrl: '' });
      await fetchEvents();
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      setError('Falha ao salvar evento');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (event) => {
    const formattedDate = new Date(event.date).toISOString().slice(0, 16);
    setCurrentEvent({ ...event, date: formattedDate });
    showSuccessMessage('Evento carregado para edição');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      setIsLoading(true);
      try {
        await deleteEvent(id);
        showSuccessMessage('Evento excluído com sucesso!');
        await fetchEvents(); // Atualiza a lista após deletar
      } catch (error) {
        console.error('Erro ao deletar evento:', error);
        setError('Falha ao deletar evento');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
        <h1>Gerenciar Eventos</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}
        
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              value={currentEvent.name}
              onChange={handleInputChange}
              placeholder="Nome do evento"
              required
            />
            <textarea
              name="description"
              value={currentEvent.description}
              onChange={handleInputChange}
              placeholder="Descrição do evento"
              required
            />
            <input
              type="datetime-local"
              name="date"
              value={currentEvent.date}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="imageUrl"
              value={currentEvent.imageUrl}
              onChange={handleInputChange}
              placeholder="URL da imagem"
              required
            />
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Processando...' : currentEvent.id ? 'Atualizar Evento' : 'Criar Evento'}
            </button>
            {currentEvent.id && (
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={() => {
                  setCurrentEvent({ name: '', description: '', date: '', imageUrl: '' });
                  showSuccessMessage('Edição cancelada');
                }}
              >
                Cancelar Edição
              </button>
            )}
          </form>
        </div>

        <div className={styles.eventList}>
          {events.map(event => (
            <div key={event.id} className={styles.eventItem}>
              <div className={styles.eventInfo}>
                <div className={styles.eventName}>{event.name}</div>
                <div className={styles.eventDate}>
                  {new Date(event.date).toLocaleString()}
                </div>
                <div className={styles.eventDescription}>{event.description}</div>
              </div>
              <div className={styles.buttonGroup}>
                <button onClick={() => handleEdit(event)} className={styles.editButton}>
                  Editar
                </button>
                <button onClick={() => handleDelete(event.id)} className={styles.deleteButton}>
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEventos;
