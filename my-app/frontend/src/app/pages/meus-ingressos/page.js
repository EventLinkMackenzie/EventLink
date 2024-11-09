/**
 * @fileoverview Página que exibe os ingressos comprados pelo usuário.
 * Permite visualizar detalhes dos ingressos como localização e data do evento.
 */

'use client';

import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './MeusIngressos.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import { listarIngressosUsuario } from '../../services/api';

/**
 * @component
 * @description Componente que exibe a lista de ingressos do usuário.
 * 
 * @example
 * return (
 *   <MeusIngressosPage />
 * )
 */
const MeusIngressosPage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [ingressos, setIngressos] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Busca os ingressos do usuário no backend.
   * @async
   * @function fetchIngressos
   */
  useEffect(() => {
    const fetchIngressos = async () => {
      if (isAuthenticated && user?.id) {
        try {
          console.log('Buscando ingressos para usuário:', user.id);
          const response = await listarIngressosUsuario(user.id);
          console.log('Ingressos recebidos:', response.data);
          
          setIngressos(prevIngressos => {
            const ingressosAtuais = response.data;
            const todosIngressos = [...prevIngressos];
            
            ingressosAtuais.forEach(novoIngresso => {
              const ingressoExiste = todosIngressos.some(
                ingresso => ingresso.id === novoIngresso.id
              );
              
              if (!ingressoExiste) {
                todosIngressos.push(novoIngresso);
              }
            });
            
            return todosIngressos.sort((a, b) => 
              new Date(b.dataCompra) - new Date(a.dataCompra)
            );
          });
        } catch (error) {
          console.error('Erro ao buscar ingressos:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchIngressos();
    const interval = setInterval(fetchIngressos, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated, user]);

  /**
   * Gera a localização do ingresso baseado no ID.
   * @function
   * @param {Object} ingresso - Ingresso para gerar localização
   * @returns {string} Localização formatada (Setor, Fila e Lugar)
   */
  const getLocalizacao = (ingresso) => {
    const setor = ['Pista', 'Camarote', 'Área VIP', 'Arquibancada'][ingresso.id % 4];
    const fila = String.fromCharCode(65 + (ingresso.id % 26));
    const lugar = (ingresso.id % 100) + 1;
    return `${setor} | Fila ${fila} | Lugar ${lugar}`;
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className={styles.pageContainer}>
          <main className={styles.mainContent}>
            <h2 className={styles.title}>Meus Ingressos</h2>
            <p>Por favor, faça login para ver seus ingressos.</p>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <main className={styles.mainContent}>
          <h2 className={styles.title}>Meus Ingressos</h2>
          {loading ? (
            <p>Carregando ingressos...</p>
          ) : ingressos.length === 0 ? (
            <p>Você ainda não tem ingressos.</p>
          ) : (
            <div className={styles.ingressosList}>
              {ingressos.map((ingresso) => (
                <div key={ingresso.id} className={styles.ingressoCard}>
                  <div className={styles.imageContainer}>
                    <img 
                      src={ingresso.evento.imageUrl} 
                      alt={ingresso.evento.name} 
                      className={styles.eventImage}
                    />
                  </div>
                  <div className={styles.ingressoInfo}>
                    <h3>{ingresso.evento.name}</h3>
                    <p>Data: {new Date(ingresso.evento.date).toLocaleDateString()}</p>
                    <p>Horário: {new Date(ingresso.evento.date).toLocaleTimeString()}</p>
                    <p className={styles.localizacao}>Localização: {getLocalizacao(ingresso)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MeusIngressosPage;
