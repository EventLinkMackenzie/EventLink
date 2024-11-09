/**
 * @fileoverview Layout raiz da aplicação.
 * Define a estrutura básica de todas as páginas.
 */

import { Roboto } from 'next/font/google';
import './styles/globals.css';
import { AuthProvider } from './contexts/AuthContext';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

/**
 * @component
 * @description Layout principal que envolve toda a aplicação.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Conteúdo das páginas
 * 
 * @example
 * return (
 *   <RootLayout>
 *     <ConteudoDaPagina />
 *   </RootLayout>
 * )
 */
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <head>
        <title>EventLink</title>
        <meta name="description" content="Plataforma de venda de ingressos para eventos" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
