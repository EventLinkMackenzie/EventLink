/**
 * @fileoverview Serviço de autenticação da aplicação.
 * Gerencia operações relacionadas à autenticação de usuários.
 */

/**
 * Verifica se o usuário está autenticado.
 * @function
 * @returns {boolean} Status de autenticação do usuário
 */
export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  return false;
};

/**
 * Obtém o token de autenticação do usuário.
 * @function
 * @returns {string|null} Token de autenticação ou null se não estiver autenticado
 */
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

/**
 * Obtém os dados do usuário logado.
 * @function
 * @returns {Object|null} Dados do usuário ou null se não estiver autenticado
 */
export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};
