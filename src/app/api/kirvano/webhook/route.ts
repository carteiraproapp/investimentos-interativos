import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log do webhook recebido da Kirvano
    console.log('Webhook Kirvano recebido:', body);
    
    // Aqui você pode processar o webhook da Kirvano
    // Exemplo: salvar no banco de dados, enviar email, etc.
    
    // Estrutura típica do webhook Kirvano:
    // {
    //   event: 'payment.approved',
    //   data: {
    //     id: 'payment_id',
    //     customer_email: 'email@example.com',
    //     amount: 588,
    //     plan: 'anual',
    //     status: 'approved'
    //   }
    // }
    
    if (body.event === 'payment.approved') {
      const { customer_email, plan } = body.data;
      
      console.log(`✅ Pagamento aprovado para ${customer_email} - Plano: ${plan}`);
      
      // Aqui você pode:
      // 1. Salvar no banco de dados
      // 2. Enviar email de boas-vindas
      // 3. Ativar acesso ao app
      // 4. Integrar com seu sistema de usuários
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processado com sucesso' 
    });
    
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}

// Endpoint GET para testar se a rota está funcionando
export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook Kirvano está ativo',
    endpoint: '/api/kirvano/webhook'
  });
}
