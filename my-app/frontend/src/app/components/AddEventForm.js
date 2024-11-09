/**
 * @fileoverview Componente de formulário para adicionar/editar eventos.
 * Permite que administradores gerenciem eventos no sistema.
 */

'use client'

import React, { useState } from 'react';
import { createEvent } from '../services/api';
import styles from './styles/AddEventForm.module.css';

/**
 * @component
 * @description Formulário para criação e edição de eventos.
 * 
 * @param {Object} props
 * @param {Function} props.onEventAdded - Callback executado quando um evento é adicionado
 * 
 * @example
 * return (
 *   <AddEventForm onEventAdded={(newEvent) => handleNewEvent(newEvent)} />
 * )
 */
const AddEventForm = ({ onEventAdded }) => {
  /**
   * Estado do formulário de evento.
   * @type {Object}
   */
  const [event, setEvent] = useState({
    name: '',
    description: '',
    date: '',
    imageUrl: ''
  });

  /**
   * Atualiza o estado do formulário quando os campos são alterados.
   * @function
   * @param {Object} e - Evento de mudança do input
   */
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  /**
   * Processa o envio do formulário para criar um novo evento.
   * @async
   * @function
   * @param {Object} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = new Date(event.date);
      formattedDate.setHours(0, 0, 0, 0);

      const formattedEvent = {
        ...event,
        date: formattedDate.toISOString().split('.')[0]
      };

      console.log('Enviando evento:', formattedEvent);

      const newEvent = await createEvent(formattedEvent);
      console.log('Resposta do servidor:', newEvent);
      
      onEventAdded(newEvent);
      setEvent({ name: '', description: '', date: '', imageUrl: '' });
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
      console.error('Detalhes do erro:', error.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="name"
        value={event.name}
        onChange={handleChange}
        placeholder="Nome do evento"
        required
      />
      <textarea
        name="description"
        value={event.description}
        onChange={handleChange}
        placeholder="Descrição do evento"
        required
      />
      <input
        type="datetime-local"
        name="date"
        value={event.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="imageUrl"
        value={event.imageUrl}
        onChange={handleChange}
        placeholder="URL da imagem"
        required
      />
      <button type="submit">Adicionar Evento</button>
    </form>
  );
};

export default AddEventForm;
