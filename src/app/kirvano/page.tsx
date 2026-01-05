"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Zap, 
  TrendingUp, 
  Users,
  Star,
  Crown,
  Sparkles,
  Target,
  Award,
  ExternalLink
} from "lucide-react";

function KirvanoContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    
    // URL de redirecionamento após pagamento
    const redirectUrl = encodeURIComponent("https://www.carteiraproapp.com");
    
    // Links de pagamento da Kirvano com redirect_url
    const paymentLinks = {
      mensal: `https://pay.kirvano.com/227ebec4-ebf0-4e94-a9ee-8e13f323c3ac?redirect_url=${redirectUrl}`,
      semestral: `https://pay.kirvano.com/c27cf3e4-51e9-41df-8101-3988f6073c45?redirect_url=${redirectUrl}`,
      anual: `https://pay.kirvano.com/351891dd-c61a-42d1-b9ce-90d32f33e246?redirect_url=${redirectUrl}`
    };

    // Redireciona para o link de pagamento da Kirvano
    setTimeout(() => {
      window.location.href = paymentLinks[plan as keyof typeof paymentLinks];
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header Kirvano */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Kirvano</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Bem-vindo, {email || "Usuário"}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-block p-3 bg-emerald-500/20 rounded-2xl backdrop-blur-sm">
            <Crown className="w-16 h-16 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Escolha seu plano e desbloqueie o{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              CarteiraPro
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Após a confirmação do pagamento, você será redirecionado automaticamente para{" "}
            <span className="font-bold text-emerald-400">www.carteiraproapp.com</span> e terá acesso imediato ao aplicativo!
          </p>
        </div>

        {/* Benefícios do CarteiraPro */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
              title: "IA de Gestão Patrimonial",
              description: "Inteligência artificial que analisa e recomenda onde alocar seu dinheiro"
            },
            {
              icon: <Target className="w-8 h-8 text-blue-400" />,
              title: "Planejamento de Aposentadoria",
              description: "Calcule quanto precisa economizar para se aposentar com tranquilidade"
            },
            {
              icon: <Shield className="w-8 h-8 text-purple-400" />,
              title: "Controle Total",
              description: "Acompanhe todos os seus investimentos e gastos em um só lugar"
            }
          ].map((benefit, i) => (
            <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all">
              <div className="p-3 bg-gray-800 rounded-xl inline-block mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Planos */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Escolha o melhor plano para você
            </h2>
            <p className="text-gray-400 text-lg">
              Todos os planos incluem acesso completo ao CarteiraPro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Plano Mensal */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-xl border-2 border-gray-700 hover:border-emerald-500/30 transition-all duration-300 flex flex-col">
              <div className="space-y-6 flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-6 h-6 text-gray-400" />
                    <h3 className="text-2xl font-bold text-white">Plano Mensal</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Flexibilidade total</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">R$ 79</span>
                    <span className="text-gray-400">/mês</span>
                  </div>
                  <p className="text-sm text-gray-500">Cobrado mensalmente</p>
                </div>

                <ul className="space-y-3 flex-1">
                  {[
                    "IA de gestão patrimonial",
                    "Recomendações de alocação",
                    "Planejamento de aposentadoria",
                    "Controle de gastos inteligente",
                    "Relatórios mensais",
                    "Suporte por e-mail",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => handlePlanSelection('mensal')}
                disabled={selectedPlan === 'mensal'}
                className={`w-full mt-6 px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  selectedPlan === 'mensal'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {selectedPlan === 'mensal' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Redirecionando...
                  </>
                ) : (
                  <>
                    Escolher Mensal
                    <ExternalLink className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Plano Semestral */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-xl border-2 border-gray-600 hover:border-gray-500 transition-all duration-300 flex flex-col relative">
              <div className="space-y-6 flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-6 h-6 text-gray-400" />
                    <h3 className="text-2xl font-bold text-white">Plano Semestral</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Economize um pouco</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">R$ 69</span>
                    <span className="text-gray-400">/mês</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-emerald-400 font-semibold">R$ 414 cobrado semestralmente</p>
                    <p className="text-xs text-gray-500">Economize R$ 60 vs mensal</p>
                  </div>
                </div>

                <ul className="space-y-3 flex-1">
                  {[
                    "Tudo do Plano Mensal",
                    "IA de gestão patrimonial",
                    "Recomendações de alocação",
                    "Planejamento de aposentadoria",
                    "Controle de gastos inteligente",
                    "Relatórios mensais",
                    "Suporte prioritário",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => handlePlanSelection('semestral')}
                disabled={selectedPlan === 'semestral'}
                className={`w-full mt-6 px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  selectedPlan === 'semestral'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-600 hover:bg-gray-500 text-white'
                }`}
              >
                {selectedPlan === 'semestral' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Redirecionando...
                  </>
                ) : (
                  <>
                    Escolher Semestral
                    <ExternalLink className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Plano Anual - DESTAQUE */}
            <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden transform hover:scale-105 transition-all duration-300 flex flex-col border-4 border-yellow-400">
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-bl-2xl font-bold text-sm shadow-lg flex items-center gap-1">
                <Crown className="w-4 h-4" />
                MELHOR OFERTA
              </div>
              
              <div className="space-y-6 flex-1 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-7 h-7 text-yellow-300" />
                    <h3 className="text-2xl font-bold text-white">Plano Anual</h3>
                  </div>
                  <p className="text-emerald-100 text-sm font-semibold">Máxima economia!</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">R$ 49</span>
                    <span className="text-emerald-100">/mês</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-yellow-300 font-bold">R$ 588 cobrado anualmente</p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 space-y-1">
                      <p className="text-xs text-white font-semibold">💰 Economize R$ 360/ano vs mensal</p>
                      <p className="text-xs text-white font-semibold">🎯 Economize R$ 240/ano vs semestral</p>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 flex-1">
                  {[
                    "Tudo dos Planos anteriores",
                    "IA de gestão patrimonial avançada",
                    "Consultoria personalizada mensal",
                    "Análise de investimentos detalhada",
                    "Planejamento de aposentadoria completo",
                    "Simulador de cenários ilimitado",
                    "Alertas inteligentes em tempo real",
                    "Suporte VIP 24/7",
                    "Acesso antecipado a novos recursos",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-white text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 space-y-2">
                  <p className="text-white font-bold text-center">🎁 BÔNUS EXCLUSIVO</p>
                  <p className="text-emerald-100 text-sm text-center">&quot;10 Estratégias para Multiplicar seu Patrimônio&quot; (R$ 97)</p>
                </div>
              </div>

              <button 
                onClick={() => handlePlanSelection('anual')}
                disabled={selectedPlan === 'anual'}
                className={`w-full mt-6 px-6 py-4 rounded-xl text-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-xl ${
                  selectedPlan === 'anual'
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-white text-emerald-600 hover:bg-yellow-400 hover:text-gray-900'
                }`}
              >
                {selectedPlan === 'anual' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Redirecionando...
                  </>
                ) : (
                  <>
                    🚀 Quero o Melhor Plano
                    <ExternalLink className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Garantias */}
          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-400 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>✨ Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>🎁 7 dias de garantia</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>🚀 Redirecionamento automático para o app</span>
            </div>
          </div>
        </div>

        {/* Depoimentos */}
        <div className="mt-20 space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-gray-400 text-lg">
              Mais de 15 mil pessoas já transformaram suas finanças
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Maria Clara",
                role: "Professora",
                avatar: "MC",
                text: "Em 2 anos economizei R$ 85 mil e comprei meu primeiro apartamento! O CarteiraPro mudou minha vida.",
                rating: 5
              },
              {
                name: "Rafael Santos",
                role: "Desenvolvedor",
                avatar: "RS",
                text: "Consegui juntar R$ 45 mil em 18 meses. As recomendações da IA são incríveis!",
                rating: 5
              },
              {
                name: "Juliana Alves",
                role: "Empresária",
                avatar: "JA",
                text: "Realizei meu sonho de conhecer a Europa! O planejamento foi essencial.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center text-lg font-bold text-gray-900">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KirvanoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    }>
      <KirvanoContent />
    </Suspense>
  );
}
