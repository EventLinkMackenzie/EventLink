import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    // Buscar usuários cadastrados
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && atob(u.password) === password);

    if (user) {
      const { password, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json({ message: 'Erro ao processar o login' }, { status: 500 });
  }
}
