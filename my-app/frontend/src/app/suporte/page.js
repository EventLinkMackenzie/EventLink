import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './Suporte.module.css';

const Suporte = () => {
  return (
    <>
      <Navbar />
      <div className={styles.suporteContainer}>
        <h1 className={styles.title}>Suporte ao Cliente</h1>
        <div className={styles.content}>
          <section className={styles.faq}>
            <h2>Perguntas Frequentes</h2>
            <ul>
              <li>
                <h3>Como posso comprar ingressos?</h3>
                <p>Você pode comprar ingressos diretamente em nossa plataforma. Basta selecionar o evento desejado e seguir as instruções de compra.</p>
              </li>
              <li>
                <h3>Posso cancelar minha compra?</h3>
                <p>As políticas de cancelamento variam de acordo com o evento. Por favor, verifique os termos específicos do evento antes de finalizar sua compra.</p>
              </li>
              <li>
                <h3>Como faço para receber meus ingressos?</h3>
                <p>Após a confirmação da compra, seus ingressos estarão disponíveis para download em sua conta ou serão enviados para o e-mail cadastrado.</p>
              </li>
            </ul>
          </section>
          <section className={styles.contato}>
            <h2>Entre em Contato</h2>
            <p>Se você não encontrou a resposta que procurava, entre em contato conosco:</p>
            <ul>
              <li>E-mail: suporte@eventlink.com</li>
              <li>Telefone: (11) 1234-5678</li>
              <li>Horário de atendimento: Segunda a Sexta, das 9h às 18h</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Suporte;
