import { NextResponse } from 'next/server';

// Armazenamento temporário (não use isso em produção!)
let users = [];

export async function POST(req) {
  try {
    console.log('Iniciando processo de cadastro');
    const userData = await req.json();
    console.log('Dados recebidos:', userData);

    // Verificar se o email já está cadastrado
    if (users.some(user => user.email === userData.email)) {
      return NextResponse.json({ message: 'Email já cadastrado' }, { status: 400 });
    }

    // Adicionar novo usuário
    const newUser = {
      id: Date.now(),
      ...userData,
      password: Buffer.from(userData.senha).toString('base64') // Codificação simples da senha (não use em produção!)
    };
    users.push(newUser);
    
    console.log('Usuário salvo com sucesso');
    console.log('Total de usuários:', users.length);

    // Retornar sucesso (sem a senha)
    const { senha, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return NextResponse.json({ message: 'Erro ao processar o cadastro', error: error.message }, { status: 500 });
  }
}

// Adicione esta nova rota para listar usuários (apenas para depuração)
export async function GET() {
  return NextResponse.json({ users: users.map(({ password, ...user }) => user) }, { status: 200 });
}
