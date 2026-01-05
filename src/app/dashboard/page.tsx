"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  TrendingUp, 
  Wallet, 
  PieChart, 
  Target, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Home,
  BarChart3,
  CreditCard,
  Sparkles,
  Crown
} from "lucide-react";

function DashboardContent() {
  const [activeTab, setActiveTab] = useState("overview");
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState("");
  const [userPlan, setUserPlan] = useState("");
  const [planStatus, setPlanStatus] = useState("");

  useEffect(() => {
    const email = searchParams.get("email");
    const plan = searchParams.get("plan");
    const status = searchParams.get("status");
    
    if (email) setUserEmail(email);
    if (plan) setUserPlan(plan);
    if (status) setPlanStatus(status);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">CarteiraPro</h1>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center text-sm font-bold text-gray-900">
                  {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-white text-sm font-medium">{userEmail || "Usuário"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-yellow-300" />
              <span className="text-emerald-100 font-semibold">
                {planStatus === 'active' ? `Plano ${userPlan ? userPlan.charAt(0).toUpperCase() + userPlan.slice(1) : 'Premium'} Ativo` : 'Plano Premium Ativo'}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Bem-vindo ao CarteiraPro{userEmail ? `, ${userEmail.split('@')[0]}` : ''}! 🎉
            </h2>
            <p className="text-emerald-100 text-lg">
              Sua jornada para a liberdade financeira começa aqui. Vamos construir seu patrimônio juntos!
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Wallet className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold">
                <ArrowUpRight className="w-4 h-4" />
                <span>+12.5%</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Patrimônio Total</p>
            <p className="text-3xl font-bold text-white">R$ 45.280</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex items-center gap-1 text-blue-400 text-sm font-semibold">
                <ArrowUpRight className="w-4 h-4" />
                <span>+8.2%</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Investimentos</p>
            <p className="text-3xl font-bold text-white">R$ 32.150</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex items-center gap-1 text-purple-400 text-sm font-semibold">
                <span>65%</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Meta Aposentadoria</p>
            <p className="text-3xl font-bold text-white">R$ 1.2M</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <DollarSign className="w-6 h-6 text-orange-400" />
              </div>
              <div className="flex items-center gap-1 text-red-400 text-sm font-semibold">
                <ArrowDownRight className="w-4 h-4" />
                <span>-5.3%</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Gastos Mensais</p>
            <p className="text-3xl font-bold text-white">R$ 3.420</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-2 mb-8 border border-gray-800">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: "overview", label: "Visão Geral", icon: Home },
              { id: "investments", label: "Investimentos", icon: TrendingUp },
              { id: "expenses", label: "Gastos", icon: CreditCard },
              { id: "goals", label: "Metas", icon: Target },
              { id: "ai", label: "IA Financeira", icon: Sparkles },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Chart */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Evolução Patrimonial</h3>
                <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-emerald-500">
                  <option>Últimos 12 meses</option>
                  <option>Últimos 6 meses</option>
                  <option>Últimos 3 meses</option>
                </select>
              </div>
              
              <div className="h-64 flex items-end justify-between gap-2">
                {[32, 45, 38, 52, 48, 65, 58, 72, 68, 78, 75, 85].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-500">
                      {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alocação de Investimentos */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Alocação de Investimentos</h3>
              <div className="space-y-4">
                {[
                  { name: "Renda Fixa", value: 40, color: "emerald" },
                  { name: "Ações", value: 35, color: "blue" },
                  { name: "Fundos Imobiliários", value: 25, color: "purple" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 font-medium">{item.name}</span>
                      <span className="text-white font-bold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* IA Insights */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-white" />
                <h3 className="text-lg font-bold text-white">IA Insights</h3>
              </div>
              <p className="text-white/90 text-sm mb-4">
                Baseado no seu perfil, recomendamos aumentar sua exposição em fundos imobiliários para diversificar melhor seu portfólio.
              </p>
              <button className="w-full bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Ver Recomendações
              </button>
            </div>

            {/* Próximas Metas */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Próximas Metas</h3>
              <div className="space-y-4">
                {[
                  { name: "Reserva de Emergência", progress: 85, target: "R$ 20.000" },
                  { name: "Viagem Europa", progress: 45, target: "R$ 15.000" },
                  { name: "Carro Novo", progress: 30, target: "R$ 50.000" },
                ].map((goal, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm font-medium">{goal.name}</span>
                      <span className="text-emerald-400 text-sm font-bold">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-500 text-xs">Meta: {goal.target}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Atividade Recente */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Atividade Recente</h3>
              <div className="space-y-4">
                {[
                  { type: "deposit", text: "Depósito em Tesouro Direto", value: "+R$ 1.500", time: "2h atrás" },
                  { type: "expense", text: "Compra no cartão", value: "-R$ 230", time: "5h atrás" },
                  { type: "income", text: "Dividendos recebidos", value: "+R$ 85", time: "1d atrás" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      activity.type === "deposit" ? "bg-emerald-500/20" :
                      activity.type === "expense" ? "bg-red-500/20" :
                      "bg-blue-500/20"
                    }`}>
                      {activity.type === "deposit" ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                      ) : activity.type === "expense" ? (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      ) : (
                        <DollarSign className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{activity.text}</p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                    <span className={`text-sm font-bold ${
                      activity.type === "expense" ? "text-red-400" : "text-emerald-400"
                    }`}>
                      {activity.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
