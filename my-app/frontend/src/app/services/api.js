/**
 * @fileoverview Configuração e endpoints da API do EventLink.
 * Centraliza todas as chamadas à API do backend.
 */

import axios from 'axios';

/**
 * Instância do axios configurada com as opções padrão.
 * @constant {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Busca todos os eventos disponíveis.
 * @async
 * @function getEvents
 * @returns {Promise<Array>} Lista de eventos
 */
export const getEvents = () => api.get('/events');

/**
 * Cria um novo evento.
 * @async
 * @function createEvent
 * @param {Object} event - Dados do evento
 * @returns {Promise<Object>} Evento criado
 */
export const createEvent = (event) => api.post('/events', event, {
  headers: {
    'X-Admin-Username': 'adminEventLink',
    'X-Admin-Password': 'senha@123',
  }
});

/**
 * Atualiza um evento existente.
 * @async
 * @function updateEvent
 * @param {number} id - ID do evento
 * @param {Object} event - Dados do evento
 * @returns {Promise<Object>} Evento atualizado
 */
export const updateEvent = (id, event) => api.put(`/events/${id}`, event, {
  headers: {
    'X-Admin-Username': 'adminEventLink',
    'X-Admin-Password': 'senha@123',
  }
});

/**
 * Deleta um evento existente.
 * @async
 * @function deleteEvent
 * @param {number} id - ID do evento
 * @returns {Promise<void>}
 */
export const deleteEvent = (id) => api.delete(`/events/${id}`, {
  headers: {
    'X-Admin-Username': 'adminEventLink',
    'X-Admin-Password': 'senha@123',
  }
});

/**
 * Compra um ingresso para um evento.
 * @async
 * @function comprarIngresso
 * @param {Object} data - Dados da compra
 * @param {number} data.usuarioId - ID do usuário
 * @param {number} data.eventoId - ID do evento
 * @returns {Promise<Object>} Ingresso comprado
 */
export const comprarIngresso = (data) => api.post('/ingressos/comprar', data);

/**
 * Lista os ingressos de um usuário.
 * @async
 * @function listarIngressosUsuario
 * @param {number} usuarioId - ID do usuário
 * @returns {Promise<Array>} Lista de ingressos
 */
export const listarIngressosUsuario = (usuarioId) => 
  api.get(`/ingressos/usuario/${usuarioId}`);

/**
 * Cadastra um novo usuário.
 * @async
 * @function cadastrarUsuario
 * @param {Object} userData - Dados do usuário
 * @returns {Promise<Object>} Usuário cadastrado
 */
export const cadastrarUsuario = (userData) => api.post('/usuarios/cadastro', userData);

/**
 * Realiza o login do usuário.
 * @async
 * @function loginUsuario
 * @param {Object} credentials - Credenciais do usuário
 * @returns {Promise<Object>} Dados do usuário autenticado
 */
export const loginUsuario = (credentials) => api.post('/usuarios/login', credentials);

export default api;
