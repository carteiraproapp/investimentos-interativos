"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, TrendingUp, Shield, Users, Sparkles, Mail, Loader2, Star, Quote, DollarSign, Home as HomeIcon, Car, Plane, Zap, Crown, Award } from "lucide-react";

type QuizData = {
  age?: string;
  profession?: string;
  income?: string;
  spendingControl?: string;
  financialGoal?: string;
  investmentExperience?: string;
  riskTolerance?: string;
  wantsRecommendations?: string;
  expenseOrganization?: string;
  email?: string;
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>({});

  const handleAnswer = (key: keyof QuizData, value: string) => {
    setQuizData({ ...quizData, [key]: value });
    
    setTimeout(() => {
      setStep(step + 1);
    }, 200);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    setQuizData({ ...quizData, email });
    
    // Avança para loading
    setStep(19);
    
    // Após 3 segundos, vai para resultados
    setTimeout(() => {
      setStep(20);
    }, 3000);
  };

  // Função para redirecionar ao site Kirvano para pagamento
  const redirectToKirvano = () => {
    const email = encodeURIComponent(quizData.email || '');
    window.location.href = `/kirvano?email=${email}`;
  };

  // Etapa 0 - Abertura com Depoimentos
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Hero Section */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-4xl w-full text-center space-y-12 animate-fade-in">
            <div className="inline-block p-3 bg-emerald-500/20 rounded-2xl mb-4 backdrop-blur-sm">
              <TrendingUp className="w-16 h-16 text-emerald-400" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Descubra como alcançar sua{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                liberdade financeira
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Leva apenas alguns minutos e pode mudar sua vida financeira para sempre.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto py-8">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-emerald-400">+15k</div>
                <div className="text-sm md:text-base text-gray-400">Usuários ativos</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-emerald-400">R$ 2M+</div>
                <div className="text-sm md:text-base text-gray-400">Economizados</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-emerald-400">4.9★</div>
                <div className="text-sm md:text-base text-gray-400">Avaliação</div>
              </div>
            </div>
            
            <button
              onClick={() => setStep(1)}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-5 rounded-xl text-xl font-bold hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
            >
              Clique para começar
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center justify-center gap-8 pt-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>5 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Resultados personalizados</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 px-4 bg-black/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Histórias de <span className="text-emerald-400">Sucesso Real</span>
              </h2>
              <p className="text-xl text-gray-400">
                Veja como o CarteiraPro transformou a vida financeira de milhares de pessoas
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Depoimento 1 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 space-y-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center text-2xl font-bold text-gray-900">
                    MC
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">Maria Clara</div>
                    <div className="text-sm text-gray-400">Professora, 34 anos</div>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-emerald-400/30" />
                
                <p className="text-gray-300 leading-relaxed">
                  &quot;Em 2 anos economizei R$ 85 mil e comprei meu primeiro apartamento! O CarteiraPro me mostrou onde eu estava gastando demais e como investir melhor.&quot;
                </p>

                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <HomeIcon className="w-5 h-5" />
                  <span>Comprou imóvel próprio</span>
                </div>
              </div>

              {/* Depoimento 2 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 space-y-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-2xl font-bold text-white">
                    RS
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">Rafael Santos</div>
                    <div className="text-sm text-gray-400">Desenvolvedor, 28 anos</div>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-emerald-400/30" />
                
                <p className="text-gray-300 leading-relaxed">
                  &quot;Consegui juntar R$ 45 mil em 18 meses e comprei meu carro à vista! As dicas de investimento me fizeram ganhar 23% a mais do que na poupança.&quot;
                </p>

                <div className="flex items-center gap-2 text-blue-400 font-semibold">
                  <Car className="w-5 h-5" />
                  <span>Comprou carro à vista</span>
                </div>
              </div>

              {/* Depoimento 3 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 space-y-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center text-2xl font-bold text-white">
                    JA
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">Juliana Alves</div>
                    <div className="text-sm text-gray-400">Empresária, 41 anos</div>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-emerald-400/30" />
                
                <p className="text-gray-300 leading-relaxed">
                  &quot;Realizei meu sonho de conhecer a Europa com a família! Economizei R$ 32 mil em 1 ano seguindo o planejamento do app. Valeu cada centavo!&quot;
                </p>

                <div className="flex items-center gap-2 text-pink-400 font-semibold">
                  <Plane className="w-5 h-5" />
                  <span>Viagem dos sonhos</span>
                </div>
              </div>
            </div>

            {/* Additional Testimonials */}
            <div className="grid md:grid-cols-2 gap-6 pt-8">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-lg font-bold text-gray-900">
                    PH
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="font-bold text-white">Pedro Henrique</div>
                      <div className="text-sm text-gray-400">Autônomo, 36 anos</div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      &quot;Saí de R$ 12 mil de dívidas para R$ 28 mil investidos em apenas 2 anos. Mudou minha vida!&quot;
                    </p>
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>Zerou dívidas + R$ 28k investidos</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-lg font-bold text-gray-900">
                    AC
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="font-bold text-white">Ana Carolina</div>
                      <div className="text-sm text-gray-400">Médica, 45 anos</div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      &quot;Consegui antecipar minha aposentadoria em 5 anos! O planejamento foi essencial para isso.&quot;
                    </p>
                    <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>Aposentadoria antecipada</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="text-center pt-8">
              <button
                onClick={() => setStep(1)}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-5 rounded-xl text-xl font-bold hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
              >
                Comece sua transformação agora
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-gray-400 mt-4">Junte-se a mais de 15 mil pessoas que já mudaram de vida</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Etapa 1 - Idade
  if (step === 1) {
    return (
      <QuizQuestion
        progress={4}
        question="Qual é a sua idade?"
        options={[
          { label: "Menos de 25 anos", value: "under25" },
          { label: "25 a 35 anos", value: "25-35" },
          { label: "36 a 50 anos", value: "36-50" },
          { label: "Mais de 50 anos", value: "over50" },
        ]}
        onSelect={(value) => handleAnswer("age", value)}
      />
    );
  }

  // Etapa 2 - Profissão
  if (step === 2) {
    return (
      <QuizQuestion
        progress={8}
        question="Qual é a sua profissão?"
        options={[
          { label: "Estudante", value: "student" },
          { label: "Profissional CLT", value: "clt" },
          { label: "Autônomo", value: "freelancer" },
          { label: "Empresário", value: "entrepreneur" },
        ]}
        onSelect={(value) => handleAnswer("profession", value)}
      />
    );
  }

  // Etapa 3 - Renda
  if (step === 3) {
    return (
      <QuizQuestion
        progress={13}
        question="Qual é a sua renda mensal média?"
        options={[
          { label: "Menos de R$2.000", value: "under2k" },
          { label: "R$2.000 a R$5.000", value: "2k-5k" },
          { label: "R$5.001 a R$10.000", value: "5k-10k" },
          { label: "Mais de R$10.000", value: "over10k" },
        ]}
        onSelect={(value) => handleAnswer("income", value)}
      />
    );
  }

  // Etapa 4 - Educação
  if (step === 4) {
    return (
      <EducationalScreen
        progress={17}
        icon={<Shield className="w-16 h-16 text-emerald-400" />}
        title="Entender suas finanças é o primeiro passo"
        description="Vamos analisar seu perfil financeiro e encontrar o melhor caminho para você."
        onContinue={() => setStep(5)}
      />
    );
  }

  // Etapa 5 - Controle de gastos
  if (step === 5) {
    return (
      <QuizQuestion
        progress={22}
        question="Você já teve dificuldades em controlar seus gastos?"
        options={[
          { label: "Frequentemente", value: "frequently" },
          { label: "Às vezes", value: "sometimes" },
          { label: "Raramente", value: "rarely" },
          { label: "Nunca", value: "never" },
        ]}
        onSelect={(value) => handleAnswer("spendingControl", value)}
      />
    );
  }

  // Etapa 6 - Meta financeira
  if (step === 6) {
    return (
      <QuizQuestion
        progress={26}
        question="Qual a sua principal meta financeira nos próximos 5 anos?"
        options={[
          { label: "Comprar um imóvel", value: "property" },
          { label: "Aposentadoria confortável", value: "retirement" },
          { label: "Fazer uma viagem", value: "travel" },
          { label: "Aumentar investimentos", value: "investments" },
        ]}
        onSelect={(value) => handleAnswer("financialGoal", value)}
      />
    );
  }

  // Etapa 7 - Experiência com investimentos
  if (step === 7) {
    return (
      <QuizQuestion
        progress={30}
        question="Você já investiu em algum ativo financeiro?"
        options={[
          { label: "Sim, bastante", value: "experienced" },
          { label: "Poucas vezes", value: "some" },
          { label: "Não, nunca", value: "never" },
          { label: "Estou pensando em começar", value: "thinking" },
        ]}
        onSelect={(value) => handleAnswer("investmentExperience", value)}
      />
    );
  }

  // Etapa 8 - Tolerância a risco
  if (step === 8) {
    return (
      <QuizQuestion
        progress={35}
        question="Como você se sente em relação a investimentos de risco?"
        options={[
          { label: "Muito ansioso", value: "veryAnxious" },
          { label: "Um pouco ansioso", value: "someAnxious" },
          { label: "Confortável", value: "comfortable" },
          { label: "Estaria disposto a arriscar", value: "willing" },
        ]}
        onSelect={(value) => handleAnswer("riskTolerance", value)}
      />
    );
  }

  // Etapa 9 - Recomendações
  if (step === 9) {
    return (
      <QuizQuestion
        progress={39}
        question="Você gostaria de receber recomendações personalizadas para suas finanças?"
        options={[
          { label: "Com certeza!", value: "yes" },
          { label: "Talvez", value: "maybe" },
          { label: "Não tenho certeza", value: "unsure" },
          { label: "Não, obrigado", value: "no" },
        ]}
        onSelect={(value) => handleAnswer("wantsRecommendations", value)}
      />
    );
  }

  // Etapa 10 - Explicação científica
  if (step === 10) {
    return (
      <EducationalScreen
        progress={43}
        icon={<Sparkles className="w-16 h-16 text-emerald-400" />}
        title="Gestão financeira baseada em análises sólidas"
        description="Nosso aplicativo oferece uma visão estratégica de onde alocar seus recursos."
        onContinue={() => setStep(11)}
      />
    );
  }

  // Etapas 11-15 - Exploração emocional
  const emotionalSteps = [
    {
      title: "Imagine sua liberdade financeira",
      description: "Poder se aposentar antecipadamente e viajar pelo mundo, sem preocupações financeiras. Isso é possível com um bom planejamento.",
      progress: 48,
    },
    {
      title: "Suas possibilidades são infinitas",
      description: "Você já pensou em quantas coisas poderia realizar se tivesse mais controle sobre suas finanças?",
      progress: 52,
    },
    {
      title: "O primeiro passo é agora",
      description: "Todo passo em direção à independência financeira começa com a decisão de agir.",
      progress: 57,
    },
    {
      title: "Você não está sozinho",
      description: "Muitos já mudaram suas vidas com a ajuda do planejamento financeiro adequado.",
      progress: 61,
    },
    {
      title: "Descubra seu perfil financeiro",
      description: "Este quiz vai te ajudar a entender melhor seu perfil e traçar o caminho rumo ao sucesso financeiro.",
      progress: 65,
    },
  ];

  if (step >= 11 && step <= 15) {
    const emotionalStep = emotionalSteps[step - 11];
    return (
      <EducationalScreen
        progress={emotionalStep.progress}
        icon={<TrendingUp className="w-16 h-16 text-emerald-400" />}
        title={emotionalStep.title}
        description={emotionalStep.description}
        onContinue={() => setStep(step + 1)}
      />
    );
  }

  // Etapa 16 - Organização de gastos
  if (step === 16) {
    return (
      <QuizQuestion
        progress={70}
        question="Como você organiza seus gastos atualmente?"
        options={[
          { label: "Faço um controle rigoroso", value: "rigorous" },
          { label: "Uso aplicativos", value: "apps" },
          { label: "Anoto em um caderno", value: "notebook" },
          { label: "Não organizo", value: "none" },
        ]}
        onSelect={(value) => handleAnswer("expenseOrganization", value)}
      />
    );
  }

  // Etapa 17 - Validação social
  if (step === 17) {
    return (
      <EducationalScreen
        progress={74}
        icon={<Users className="w-16 h-16 text-emerald-400" />}
        title="Milhares de usuários já alcançaram suas metas"
        description="Com o carteirapro, está na hora de você também dar esse passo importante."
        onContinue={() => setStep(18)}
      />
    );
  }

  // Etapa 18 - Captura de lead
  if (step === 18) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8 md:p-12 space-y-6">
            <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                style={{ width: "78%" }}
              />
            </div>

            <div className="text-center space-y-4 mb-8">
              <div className="inline-block p-3 bg-emerald-500/20 rounded-2xl backdrop-blur-sm">
                <Mail className="w-12 h-12 text-emerald-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Quase lá!
              </h2>
              <p className="text-lg text-gray-300">
                Antes de gerar seu perfil financeiro, insira seu e-mail para receber suas análises e recomendações.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                required
                placeholder="Digite seu melhor e-mail"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-700 bg-gray-900 text-white text-lg focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-gray-500"
              />
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <p className="text-sm text-center text-gray-400">
              🔒 Seus dados estão seguros e protegidos
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Etapa 19 - Loading
  if (step === 19) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <Loader2 className="w-20 h-20 text-emerald-400 animate-spin mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Analisando suas respostas...
          </h2>
          <p className="text-xl text-gray-300">
            Isso levará apenas alguns momentos.
          </p>
          <div className="flex flex-col gap-3 max-w-md mx-auto">
            <div className="flex items-center gap-3 text-left">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <span className="text-gray-300">Processando perfil financeiro...</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <span className="text-gray-300">Calculando recomendações personalizadas...</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <span className="text-gray-300">Preparando seu plano de ação...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Etapa 20 - Resultados
  if (step === 20) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-block p-3 bg-emerald-500/20 rounded-2xl backdrop-blur-sm">
              <CheckCircle2 className="w-16 h-16 text-emerald-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Seu perfil está pronto!
            </h2>
            <p className="text-xl text-gray-300">
              Aqui estão suas recomendações financeiras personalizadas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                📊 Seu Perfil de Investidor
              </h3>
              <p className="text-gray-300">
                Baseado nas suas respostas, identificamos que você tem um perfil {quizData.riskTolerance === "willing" ? "arrojado" : quizData.riskTolerance === "comfortable" ? "moderado" : "conservador"}.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                🎯 Meta Principal
              </h3>
              <p className="text-gray-300">
                Seu objetivo de {quizData.financialGoal === "property" ? "comprar um imóvel" : quizData.financialGoal === "retirement" ? "aposentadoria" : quizData.financialGoal === "travel" ? "viajar" : "investir"} está ao seu alcance!
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                💰 Recomendação de Alocação
              </h3>
              <p className="text-gray-300">
                Sugerimos diversificar seus investimentos em renda fixa (40%), ações (35%) e fundos imobiliários (25%).
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                📈 Potencial de Crescimento
              </h3>
              <p className="text-gray-300">
                Com disciplina e o plano certo, você pode aumentar seu patrimônio em até 300% nos próximos 5 anos.
              </p>
            </div>
          </div>

          <button
            onClick={() => setStep(21)}
            className="w-full max-w-md mx-auto block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
          >
            Ver mais benefícios
          </button>
        </div>
      </div>
    );
  }

  // Etapa 21 - Benefícios adicionais
  if (step === 21) {
    return (
      <EducationalScreen
        progress={87}
        icon={<Sparkles className="w-16 h-16 text-emerald-400" />}
        title="Muito mais que análises"
        description="Além de análises de investimentos, o carteirapro oferece dicas de economia e planejamento financeiro completo!"
        onContinue={() => setStep(22)}
      />
    );
  }

  // Etapa 22 - Prova social
  if (step === 22) {
    return (
      <EducationalScreen
        progress={91}
        icon={<Users className="w-16 h-16 text-emerald-400" />}
        title="Resultados comprovados"
        description="Mais de 80% dos nossos usuários alcançaram suas metas em até 5 anos. Você pode ser o próximo!"
        onContinue={() => setStep(23)}
      />
    );
  }

  // Etapa 23 - Oferta final - REDIRECIONA PARA KIRVANO
  if (step === 23) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Pronto para transformar sua vida financeira?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Acesse o <span className="font-bold text-emerald-400">CarteiraPro</span> agora e comece sua jornada rumo à liberdade financeira!
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 rounded-3xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-yellow-300" />
              <h3 className="text-3xl font-bold text-white">Oferta Especial</h3>
            </div>
            <p className="text-emerald-100 text-lg mb-6">
              Escolha seu plano e tenha acesso completo ao CarteiraPro com todas as funcionalidades premium!
            </p>
            
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-white font-bold">✨ IA de Gestão Patrimonial</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-white font-bold">📊 Análise Completa de Investimentos</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-white font-bold">🎯 Planejamento de Aposentadoria</p>
              </div>
            </div>
          </div>

          <button
            onClick={redirectToKirvano}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-12 py-6 rounded-xl text-2xl font-bold hover:shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300"
          >
            🚀 Escolher Meu Plano Agora
            <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>🔒 Pagamento 100% seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>✨ Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>🎁 7 dias grátis</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Componente de pergunta do quiz
function QuizQuestion({
  progress,
  question,
  options,
  onSelect,
}: {
  progress: number;
  question: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8 md:p-12 space-y-8">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            {question}
          </h2>

          <div className="grid gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => onSelect(option.value)}
                className="group w-full text-left p-6 rounded-xl border-2 border-gray-700 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-600 group-hover:border-emerald-400 group-hover:bg-emerald-500 flex items-center justify-center transition-all">
                    <span className="text-white font-bold opacity-0 group-hover:opacity-100">
                      ✓
                    </span>
                  </div>
                  <span className="text-lg text-gray-300 group-hover:text-emerald-400 font-medium">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de tela educacional
function EducationalScreen({
  progress,
  icon,
  title,
  description,
  onContinue,
}: {
  progress: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  onContinue: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8 md:p-12 space-y-8">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-center space-y-6">
            <div className="inline-block p-4 bg-emerald-500/20 rounded-2xl backdrop-blur-sm">
              {icon}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {title}
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>

          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
