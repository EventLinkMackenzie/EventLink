/**
 * @fileoverview Componente que lista os eventos disponíveis.
 * Permite visualizar e gerenciar eventos no painel administrativo.
 */

'use client';

import React from 'react';
import styles from './styles/ListaEventos.module.css';

/**
 * @component
 * @description Exibe uma lista de eventos com opções de edição e exclusão.
 * 
 * @param {Object} props
 * @param {Array} props.eventos - Lista de eventos a serem exibidos
 * @param {Function} props.onEdit - Callback executado ao editar um evento
 * @param {Function} props.onDelete - Callback executado ao deletar um evento
 * 
 * @example
 * return (
 *   <ListaEventos 
 *     eventos={eventos}
 *     onEdit={(evento) => handleEdit(evento)}
 *     onDelete={(id) => handleDelete(id)}
 *   />
 * )
 */
const ListaEventos = ({ eventos, onEdit, onDelete }) => {
  return (
    <div className={styles.listaEventos}>
      {eventos.map(evento => (
        <div key={evento.id} className={styles.eventoItem}>
          <div className={styles.eventoInfo}>
            <h3>{evento.name}</h3>
            <p>{evento.description}</p>
            <p>Data: {new Date(evento.date).toLocaleString()}</p>
          </div>
          <div className={styles.eventoAcoes}>
            <button onClick={() => onEdit(evento)}>Editar</button>
            <button onClick={() => onDelete(evento.id)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaEventos;
