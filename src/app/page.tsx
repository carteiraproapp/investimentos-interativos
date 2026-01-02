"use client"

import { useState } from "react"
import { TrendingUp, MessageSquare, BarChart3, Home, Send, Loader2, Lightbulb, Calendar, TrendingDown, Target, DollarSign, PiggyBank, Coins, Wallet, Plus, Trash2, LineChart, ClipboardList } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Dados do portfólio
const portfolioData = [
  { name: 'Ações', value: 45, color: '#10b981' },
  { name: 'Fundos Imobiliários', value: 25, color: '#3b82f6' },
  { name: 'Renda Fixa', value: 20, color: '#8b5cf6' },
  { name: 'Criptomoedas', value: 10, color: '#f59e0b' },
]

// Indicações de ações
const stockRecommendations = [
  { 
    ticker: 'PETR4', 
    name: 'Petrobras', 
    recommendation: 'COMPRA FORTE',
    price: 'R$ 38.45',
    target: 'R$ 45.00',
    potential: '+17.0%',
    reason: 'Forte geração de caixa e dividendos atrativos'
  },
  { 
    ticker: 'VALE3', 
    name: 'Vale', 
    recommendation: 'COMPRA',
    price: 'R$ 62.80',
    target: 'R$ 72.00',
    potential: '+14.6%',
    reason: 'Recuperação dos preços do minério de ferro'
  },
  { 
    ticker: 'ITUB4', 
    name: 'Itaú', 
    recommendation: 'MANTER',
    price: 'R$ 28.90',
    target: 'R$ 32.00',
    potential: '+10.7%',
    reason: 'Solidez financeira e expansão digital'
  },
  { 
    ticker: 'WEGE3', 
    name: 'WEG', 
    recommendation: 'COMPRA',
    price: 'R$ 42.15',
    target: 'R$ 50.00',
    potential: '+18.6%',
    reason: 'Crescimento em energias renováveis'
  },
]

// Insights de Mercado por Período
const marketInsights = {
  day: [
    {
      ticker: 'MGLU3',
      name: 'Magazine Luiza',
      roi: '+8.5%',
      marketValue: 'R$ 3.45',
      trend: 'up',
      reason: 'Forte volume de compra após anúncio de parceria estratégica',
      evolution: 'Subiu 8.5% nas últimas 24h',
      recommendation: 'OPORTUNIDADE DO DIA'
    },
    {
      ticker: 'PRIO3',
      name: 'Prio',
      roi: '+6.2%',
      marketValue: 'R$ 48.90',
      trend: 'up',
      reason: 'Preço do petróleo em alta e produção acima do esperado',
      evolution: 'Valorização de 6.2% hoje',
      recommendation: 'COMPRA RÁPIDA'
    }
  ],
  week: [
    {
      ticker: 'BBDC4',
      name: 'Bradesco',
      roi: '+12.3%',
      marketValue: 'R$ 15.80',
      trend: 'up',
      reason: 'Resultados trimestrais superaram expectativas',
      evolution: 'Alta de 12.3% na semana',
      recommendation: 'TENDÊNCIA SEMANAL'
    },
    {
      ticker: 'RENT3',
      name: 'Localiza',
      roi: '+9.7%',
      marketValue: 'R$ 62.40',
      trend: 'up',
      reason: 'Expansão da frota e aumento da demanda',
      evolution: 'Crescimento de 9.7% em 7 dias',
      recommendation: 'MOMENTUM POSITIVO'
    }
  ],
  month: [
    {
      ticker: 'ELET3',
      name: 'Eletrobras',
      roi: '+18.5%',
      marketValue: 'R$ 42.30',
      trend: 'up',
      reason: 'Privatização consolidada e eficiência operacional',
      evolution: 'Valorização de 18.5% no mês',
      recommendation: 'TENDÊNCIA MENSAL'
    },
    {
      ticker: 'SUZB3',
      name: 'Suzano',
      roi: '+15.2%',
      marketValue: 'R$ 58.70',
      trend: 'up',
      reason: 'Preços da celulose em alta no mercado internacional',
      evolution: 'Alta de 15.2% em 30 dias',
      recommendation: 'CRESCIMENTO SUSTENTADO'
    }
  ],
  year: [
    {
      ticker: 'WEGE3',
      name: 'WEG',
      roi: '+45.8%',
      marketValue: 'R$ 42.15',
      trend: 'up',
      reason: 'Expansão internacional e crescimento em energias renováveis',
      evolution: 'Crescimento de 45.8% no ano',
      recommendation: 'DESTAQUE ANUAL'
    },
    {
      ticker: 'RADL3',
      name: 'Raia Drogasil',
      roi: '+38.4%',
      marketValue: 'R$ 28.90',
      trend: 'up',
      reason: 'Consolidação do setor farmacêutico e expansão de lojas',
      evolution: 'Valorização de 38.4% em 12 meses',
      recommendation: 'CRESCIMENTO ANUAL'
    }
  ]
}

// Ações com bons dividendos
const dividendStocks = [
  {
    ticker: 'TAEE11',
    name: 'Taesa',
    dividendYield: '8.45%',
    price: 'R$ 34.20',
    lastDividend: 'R$ 2.89',
    paymentFrequency: 'Trimestral',
    consistency: 'Excelente',
    analysis: 'Empresa de transmissão de energia com receita regulada e fluxo de caixa previsível. Histórico consistente de pagamento de dividendos acima de 8% ao ano.',
    indicators: {
      roe: '18.5%',
      payout: '95%',
      debtEquity: '1.2',
      growth5y: '+42%'
    },
    recommendation: 'COMPRA FORTE'
  },
  {
    ticker: 'BBSE3',
    name: 'BB Seguridade',
    dividendYield: '7.82%',
    price: 'R$ 28.50',
    lastDividend: 'R$ 2.23',
    paymentFrequency: 'Semestral',
    consistency: 'Excelente',
    analysis: 'Braço de seguros do Banco do Brasil. Modelo de negócio estável com alta geração de caixa e distribuição generosa de dividendos.',
    indicators: {
      roe: '22.3%',
      payout: '85%',
      debtEquity: '0.3',
      growth5y: '+38%'
    },
    recommendation: 'COMPRA FORTE'
  },
  {
    ticker: 'ITSA4',
    name: 'Itaúsa',
    dividendYield: '6.94%',
    price: 'R$ 9.80',
    lastDividend: 'R$ 0.68',
    paymentFrequency: 'Trimestral',
    consistency: 'Muito Boa',
    analysis: 'Holding do grupo Itaú com participações em diversos setores. Dividendos consistentes e exposição diversificada.',
    indicators: {
      roe: '16.7%',
      payout: '70%',
      debtEquity: '0.5',
      growth5y: '+35%'
    },
    recommendation: 'COMPRA'
  },
  {
    ticker: 'CPLE6',
    name: 'Copel',
    dividendYield: '6.54%',
    price: 'R$ 8.45',
    lastDividend: 'R$ 0.55',
    paymentFrequency: 'Trimestral',
    consistency: 'Boa',
    analysis: 'Companhia paranaense de energia. Dividendos atrativos e exposição ao setor elétrico regulado.',
    indicators: {
      roe: '15.8%',
      payout: '80%',
      debtEquity: '1.5',
      growth5y: '+28%'
    },
    recommendation: 'MANTER'
  },
  {
    ticker: 'VIVT3',
    name: 'Telefônica Brasil',
    dividendYield: '6.12%',
    price: 'R$ 48.90',
    lastDividend: 'R$ 2.99',
    paymentFrequency: 'Semestral',
    consistency: 'Muito Boa',
    analysis: 'Líder em telecomunicações no Brasil. Fluxo de caixa robusto e dividendos consistentes.',
    indicators: {
      roe: '19.2%',
      payout: '75%',
      debtEquity: '0.8',
      growth5y: '+31%'
    },
    recommendation: 'COMPRA'
  }
]

// Preços simulados das ações
const stockPrices: { [key: string]: number } = {
  'PETR4': 38.45,
  'VALE3': 62.80,
  'ITUB4': 28.90,
  'WEGE3': 42.15,
  'TAEE11': 34.20,
  'BBSE3': 28.50,
  'ITSA4': 9.80,
  'CPLE6': 8.45,
  'VIVT3': 48.90,
  'MGLU3': 3.45,
  'BBDC4': 15.80,
}

// Dividendos anuais simulados
const stockDividends: { [key: string]: number } = {
  'PETR4': 3.20,
  'VALE3': 4.50,
  'ITUB4': 2.10,
  'WEGE3': 1.80,
  'TAEE11': 2.89,
  'BBSE3': 2.23,
  'ITSA4': 0.68,
  'CPLE6': 0.55,
  'VIVT3': 2.99,
  'MGLU3': 0.15,
  'BBDC4': 1.20,
}

interface PortfolioStock {
  id: string
  ticker: string
  quantity: number
}

interface Expense {
  id: string
  name: string
  value: number
  type: 'fixed' | 'variable'
}

export default function CarteiraPro() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([])]
  const [inputMessage, setInputMessage] = useState("")
  const [isLoadingChat, setIsLoadingChat] = useState(false)
  const [insightPeriod, setInsightPeriod] = useState<'day' | 'week' | 'month' | 'year'>('day')

  // Estados para o planejador financeiro
  const [monthlySalary, setMonthlySalary] = useState('')
  const [fixedCosts, setFixedCosts] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [calculationResult, setCalculationResult] = useState<any>(null)

  // Estados para a carteira
  const [portfolioStocks, setPortfolioStocks] = useState<PortfolioStock[]>([
    { id: '1', ticker: 'PETR4', quantity: 100 },
    { id: '2', ticker: 'VALE3', quantity: 50 },
    { id: '3', ticker: 'ITUB4', quantity: 200 },
  ])
  const [newTicker, setNewTicker] = useState('')
  const [newQuantity, setNewQuantity] = useState('')

  // Estados para o Planner (nova aba)
  const [plannerSalary, setPlannerSalary] = useState('')
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [newExpenseName, setNewExpenseName] = useState('')
  const [newExpenseValue, setNewExpenseValue] = useState('')
  const [newExpenseType, setNewExpenseType] = useState<'fixed' | 'variable'>('fixed')
  const [plannerResult, setPlannerResult] = useState<any>(null)

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoadingChat) return

    const userMessage = inputMessage.trim()
    setInputMessage("")
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoadingChat(true)

    // Simulação de resposta da IA (sem necessidade de API)
    setTimeout(() => {
      const responses = [
        "Excelente pergunta! Para investimentos de longo prazo, recomendo diversificar entre ações de empresas sólidas e fundos imobiliários. Considere também manter uma reserva de emergência em renda fixa.",
        "Baseado na análise de mercado atual, o setor de tecnologia e energia renovável apresentam boas perspectivas. Empresas como WEG e Engie Brasil têm mostrado crescimento consistente.",
        "Para construir um portfólio equilibrado, sugiro: 40-50% em ações, 20-30% em fundos imobiliários, 20-30% em renda fixa e até 10% em criptomoedas para diversificação.",
        "Os dividendos são uma excelente forma de renda passiva. Empresas como Itaú, Petrobras e Vale historicamente pagam bons dividendos. Considere o dividend yield e a consistência dos pagamentos.",
        "O momento ideal para investir é agora! O importante é começar, mesmo com valores pequenos. Use a estratégia de aportes mensais regulares para aproveitar diferentes momentos do mercado."
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
      setIsLoadingChat(false)
    }, 1500)
  }

  const calculateFinancialGoal = () => {
    const salary = parseFloat(monthlySalary)
    const costs = parseFloat(fixedCosts)
    const contribution = parseFloat(monthlyContribution)
    const target = parseFloat(targetAmount)

    if (!salary || !costs || !contribution || !target) {
      alert('Por favor, preencha todos os campos com valores válidos.')
      return
    }

    const availableIncome = salary - costs
    const contributionPercentage = (contribution / salary) * 100

    if (contribution > availableIncome) {
      alert('O aporte mensal não pode ser maior que sua renda disponível (salário - custos fixos).')
      return
    }

    // Cálculo com JUROS COMPOSTOS
    // Taxa mensal conservadora: 1.5% ao mês (18% ao ano)
    // Fórmula: M = C × [(1 + i)^n - 1] / i
    // Onde: M = montante final, C = aporte mensal, i = taxa mensal, n = número de meses
    
    const monthlyRate = 0.015 // 1.5% ao mês (taxa plausível e conservadora)
    
    // Resolvendo para n (número de meses): n = log(1 + (M × i / C)) / log(1 + i)
    const monthsToGoal = Math.log(1 + (target * monthlyRate / contribution)) / Math.log(1 + monthlyRate)
    const yearsToGoal = monthsToGoal / 12
    
    // Total investido (aportes mensais)
    const totalInvested = contribution * monthsToGoal
    
    // Retorno gerado pelos juros compostos
    const estimatedReturn = target - totalInvested
    
    // Rentabilidade percentual total
    const totalReturnPercentage = (estimatedReturn / totalInvested) * 100

    // Cálculo para aposentadoria: quanto de renda mensal posso ter?
    // Usando a regra dos 4% (retirada sustentável anual)
    const monthlyIncomeFrom4PercentRule = (target * 0.04) / 12
    
    // Renda mensal mantendo o capital (apenas com rendimentos de 1.5% ao mês)
    const monthlyIncomeFromInterest = target * monthlyRate

    setCalculationResult({
      monthsToGoal: Math.ceil(monthsToGoal),
      yearsToGoal: yearsToGoal.toFixed(1),
      totalInvested: totalInvested.toFixed(2),
      estimatedReturn: estimatedReturn.toFixed(2),
      availableIncome: availableIncome.toFixed(2),
      contributionPercentage: contributionPercentage.toFixed(1),
      totalReturnPercentage: totalReturnPercentage.toFixed(1),
      monthlyIncomeFrom4PercentRule: monthlyIncomeFrom4PercentRule.toFixed(2),
      monthlyIncomeFromInterest: monthlyIncomeFromInterest.toFixed(2),
      monthlyRate: (monthlyRate * 100).toFixed(2)
    })
  }

  const addStockToPortfolio = () => {
    const ticker = newTicker.toUpperCase().trim()
    const quantity = parseInt(newQuantity)

    if (!ticker || !quantity || quantity <= 0) {
      alert('Por favor, preencha o ticker e a quantidade válida.')
      return
    }

    if (!stockPrices[ticker]) {
      alert('Ticker não encontrado. Use tickers válidos como PETR4, VALE3, ITUB4, etc.')
      return
    }

    const existingStock = portfolioStocks.find(s => s.ticker === ticker)
    if (existingStock) {
      setPortfolioStocks(portfolioStocks.map(s => 
        s.ticker === ticker ? { ...s, quantity: s.quantity + quantity } : s
      ))
    } else {
      setPortfolioStocks([...portfolioStocks, {
        id: Date.now().toString(),
        ticker,
        quantity
      }])
    }

    setNewTicker('')
    setNewQuantity('')
  }

  const removeStockFromPortfolio = (id: string) => {
    setPortfolioStocks(portfolioStocks.filter(s => s.id !== id))
  }

  const calculatePortfolioValue = () => {
    return portfolioStocks.reduce((total, stock) => {
      const price = stockPrices[stock.ticker] || 0
      return total + (price * stock.quantity)
    }, 0)
  }

  const calculatePortfolioDividends = () => {
    return portfolioStocks.reduce((total, stock) => {
      const dividend = stockDividends[stock.ticker] || 0
      return total + (dividend * stock.quantity)
    }, 0)
  }

  const getPortfolioEvolution = () => {
    // Simulação de evolução mensal (últimos 6 meses)
    const currentValue = calculatePortfolioValue()
    return [
      { month: 'Jan', value: currentValue * 0.75 },
      { month: 'Fev', value: currentValue * 0.82 },
      { month: 'Mar', value: currentValue * 0.88 },
      { month: 'Abr', value: currentValue * 0.92 },
      { month: 'Mai', value: currentValue * 0.96 },
      { month: 'Jun', value: currentValue },
    ]
  }

  const getDividendEvolution = () => {
    // Simulação de evolução de dividendos mensais
    const monthlyDividend = calculatePortfolioDividends() / 12
    return [
      { month: 'Jan', value: monthlyDividend * 0.9 },
      { month: 'Fev', value: monthlyDividend * 0.95 },
      { month: 'Mar', value: monthlyDividend * 1.0 },
      { month: 'Abr', value: monthlyDividend * 1.05 },
      { month: 'Mai', value: monthlyDividend * 1.08 },
      { month: 'Jun', value: monthlyDividend * 1.1 },
    ]
  }

  // Cálculo do retorno anual da carteira baseado nos dividendos
  const calculateAnnualReturn = () => {
    const totalValue = calculatePortfolioValue()
    const annualDividends = calculatePortfolioDividends()
    if (totalValue === 0) return 0
    return (annualDividends / totalValue) * 100
  }

  // Cálculo da quantidade de ativos únicos na carteira
  const getUniqueAssetsCount = () => {
    return portfolioStocks.length
  }

  // Funções do Planner
  const addExpense = () => {
    const name = newExpenseName.trim()
    const value = parseFloat(newExpenseValue)

    if (!name || !value || value <= 0) {
      alert('Por favor, preencha o nome e o valor válido da despesa.')
      return
    }

    setExpenses([...expenses, {
      id: Date.now().toString(),
      name,
      value,
      type: newExpenseType
    }])

    setNewExpenseName('')
    setNewExpenseValue('')
  }

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id))
  }

  const calculatePlanner = () => {
    const salary = parseFloat(plannerSalary)

    if (!salary || salary <= 0) {
      alert('Por favor, preencha um salário válido.')
      return
    }

    const totalFixed = expenses.filter(e => e.type === 'fixed').reduce((sum, e) => sum + e.value, 0)
    const totalVariable = expenses.filter(e => e.type === 'variable').reduce((sum, e) => sum + e.value, 0)
    const totalExpenses = totalFixed + totalVariable
    const remaining = salary - totalExpenses

    setPlannerResult({
      salary,
      totalFixed,
      totalVariable,
      totalExpenses,
      remaining,
      remainingPercentage: (remaining / salary) * 100
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              CarteiraPro
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-7 bg-gray-900 border border-gray-800">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat IA
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <BarChart3 className="w-4 h-4 mr-2" />
              Análise
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Lightbulb className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="dividends" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Coins className="w-4 h-4 mr-2" />
              Dividendos
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Wallet className="w-4 h-4 mr-2" />
              Carteira
            </TabsTrigger>
            <TabsTrigger value="planner" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <ClipboardList className="w-4 h-4 mr-2" />
              Planner
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Welcome Card */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl">
                    Bem-vindo ao CarteiraPro! 🚀
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-300">
                    Sua plataforma completa para gestão de investimentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Acompanhe seu portfólio, converse com IA financeira e receba análises de mercado.
                  </p>
                </CardContent>
              </Card>

              {/* Stats Cards - INTEGRADOS COM A CARTEIRA */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-green-400/50 transition-all shadow-lg">
                  <CardHeader className="pb-3">
                    <CardDescription className="text-gray-400 text-sm">Valor Total</CardDescription>
                    <CardTitle className="text-3xl font-bold text-green-400">
                      R$ {calculatePortfolioValue().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-semibold">+18.4%</span>
                      <span className="text-gray-500">este mês</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-green-400/50 transition-all shadow-lg">
                  <CardHeader className="pb-3">
                    <CardDescription className="text-gray-400 text-sm">Ativos</CardDescription>
                    <CardTitle className="text-3xl font-bold text-emerald-400">
                      {getUniqueAssetsCount()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Portfólio diversificado</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-green-400/50 transition-all shadow-lg">
                  <CardHeader className="pb-3">
                    <CardDescription className="text-gray-400 text-sm">Retorno Anual</CardDescription>
                    <CardTitle className="text-3xl font-bold text-green-300">
                      +{calculateAnnualReturn().toFixed(2)}%
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Baseado em dividendos</p>
                  </CardContent>
                </Card>
              </div>

              {/* Planejador Financeiro Interativo */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Target className="w-6 h-6 text-green-400" />
                    Planejador Financeiro Inteligente
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Calcule quanto tempo levará para atingir seus objetivos financeiros com juros compostos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Inputs Financeiros */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salary" className="text-white">Salário Mensal (R$)</Label>
                      <Input
                        id="salary"
                        type="number"
                        placeholder="5000"
                        value={monthlySalary}
                        onChange={(e) => setMonthlySalary(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="costs" className="text-white">Custos Fixos Mensais (R$)</Label>
                      <Input
                        id="costs"
                        type="number"
                        placeholder="2000"
                        value={fixedCosts}
                        onChange={(e) => setFixedCosts(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <p className="text-xs text-gray-500">Aluguel, contas, alimentação, etc.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contribution" className="text-white">Aporte Mensal (R$)</Label>
                      <Input
                        id="contribution"
                        type="number"
                        placeholder="1000"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target" className="text-white">Valor Alvo (R$)</Label>
                      <Input
                        id="target"
                        type="number"
                        placeholder="100000"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={calculateFinancialGoal}
                    className="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-black hover:from-green-500 hover:to-emerald-700 font-semibold"
                  >
                    <PiggyBank className="w-5 h-5 mr-2" />
                    Calcular Meu Plano Financeiro
                  </Button>

                  {/* Resultado do Cálculo */}
                  {calculationResult && (
                    <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/30">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Target className="w-6 h-6 text-green-400" />
                          <h3 className="text-xl font-bold text-green-400">Seu Plano Financeiro (Juros Compostos)</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                            <p className="text-sm text-gray-400 mb-1">Tempo para atingir objetivo</p>
                            <p className="text-2xl font-bold text-white">{calculationResult.yearsToGoal} anos</p>
                            <p className="text-sm text-gray-500">({calculationResult.monthsToGoal} meses)</p>
                          </div>

                          <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                            <p className="text-sm text-gray-400 mb-1">Total investido (aportes)</p>
                            <p className="text-2xl font-bold text-white">R$ {parseFloat(calculationResult.totalInvested).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                          </div>

                          <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                            <p className="text-sm text-gray-400 mb-1">Retorno dos juros compostos</p>
                            <p className="text-2xl font-bold text-green-400">R$ {parseFloat(calculationResult.estimatedReturn).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            <p className="text-sm text-green-500">+{calculationResult.totalReturnPercentage}% de rentabilidade</p>
                          </div>

                          <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                            <p className="text-sm text-gray-400 mb-1">Renda disponível</p>
                            <p className="text-2xl font-bold text-white">R$ {parseFloat(calculationResult.availableIncome).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            <p className="text-sm text-gray-500">Aporte representa {calculationResult.contributionPercentage}% do salário</p>
                          </div>
                        </div>

                        {/* Seção de Aposentadoria */}
                        <div className="pt-4 border-t border-gray-700">
                          <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                            <PiggyBank className="w-5 h-5" />
                            Renda Mensal na Aposentadoria
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-900/50 rounded-lg border border-green-400/30">
                              <p className="text-sm text-gray-400 mb-1">Renda mensal (Regra dos 4%)</p>
                              <p className="text-2xl font-bold text-green-400">
                                R$ {parseFloat(calculationResult.monthlyIncomeFrom4PercentRule).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">Retirada sustentável preservando capital</p>
                            </div>
                            <div className="p-4 bg-gray-900/50 rounded-lg border border-emerald-400/30">
                              <p className="text-sm text-gray-400 mb-1">Renda mensal (Apenas juros)</p>
                              <p className="text-2xl font-bold text-emerald-400">
                                R$ {parseFloat(calculationResult.monthlyIncomeFromInterest).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">Vivendo dos rendimentos ({calculationResult.monthlyRate}% ao mês)</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-700">
                          <p className="text-sm text-gray-300 leading-relaxed">
                            <span className="text-green-400 font-semibold">Análise IA:</span> Com aportes mensais de R$ {monthlyContribution} e rentabilidade de {calculationResult.monthlyRate}% ao mês (juros compostos), você atingirá R$ {targetAmount} em {calculationResult.yearsToGoal} anos. O poder dos juros compostos gerará R$ {parseFloat(calculationResult.estimatedReturn).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em rendimentos. Na aposentadoria, você poderá ter uma renda mensal de até R$ {parseFloat(calculationResult.monthlyIncomeFromInterest).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} mantendo seu capital intacto!
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="mt-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-green-400" />
                    Chat com IA Financeira
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Tire suas dúvidas sobre investimentos e receba orientações personalizadas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Comece uma conversa sobre investimentos...</p>
                      </div>
                    ) : (
                      messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.role === 'user'
                                ? 'bg-gradient-to-r from-green-400 to-emerald-600 text-black'
                                : 'bg-gray-800 text-white border border-gray-700'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite sua pergunta sobre investimentos..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={isLoadingChat || !inputMessage.trim()}
                      className="bg-gradient-to-r from-green-400 to-emerald-600 text-black hover:from-green-500 hover:to-emerald-700"
                    >
                      {isLoadingChat ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="mt-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-green-400" />
                    Análise de Mercado e Indicações
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Recomendações baseadas em análise técnica e fundamentalista
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stockRecommendations.map((stock, idx) => (
                      <Card key={idx} className="bg-gray-800/50 border-gray-700 hover:border-green-400/50 transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-3">
                                <h3 className="text-2xl font-bold text-white">{stock.ticker}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  stock.recommendation === 'COMPRA FORTE' 
                                    ? 'bg-green-500/20 text-green-400 border border-green-400/50'
                                    : stock.recommendation === 'COMPRA'
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400/50'
                                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/50'
                                }`}>
                                  {stock.recommendation}
                                </span>
                              </div>
                              <p className="text-gray-400">{stock.name}</p>
                              <p className="text-sm text-gray-500 mt-2">{stock.reason}</p>
                            </div>
                            <div className="text-right space-y-1">
                              <div>
                                <p className="text-xs text-gray-500">Preço Atual</p>
                                <p className="text-lg font-semibold text-white">{stock.price}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Preço Alvo</p>
                                <p className="text-lg font-semibold text-green-400">{stock.target}</p>
                              </div>
                              <div className="pt-2">
                                <span className="text-xl font-bold text-green-400">{stock.potential}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Summary */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle>Resumo do Mercado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <p className="text-sm text-gray-400 mb-1">IBOVESPA</p>
                      <p className="text-2xl font-bold text-white">127.845</p>
                      <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4" />
                        +2.34%
                      </p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <p className="text-sm text-gray-400 mb-1">Dólar</p>
                      <p className="text-2xl font-bold text-white">R$ 4.95</p>
                      <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                        <TrendingDown className="w-4 h-4" />
                        -0.87%
                      </p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <p className="text-sm text-gray-400 mb-1">Bitcoin</p>
                      <p className="text-2xl font-bold text-white">$43.250</p>
                      <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4" />
                        +5.12%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Insights de Mercado Tab */}
          <TabsContent value="insights" className="mt-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Lightbulb className="w-6 h-6 text-green-400" />
                    Insights de Mercado - IA Analítica
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Análise inteligente baseada em ROI, valor de mercado e evolução das ações
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Period Selector */}
                  <div className="flex gap-2 mb-6 flex-wrap">
                    <Button
                      onClick={() => setInsightPeriod('day')}
                      variant={insightPeriod === 'day' ? 'default' : 'outline'}
                      className={insightPeriod === 'day' 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-600 text-black hover:from-green-500 hover:to-emerald-700' 
                        : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                      }
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Hoje
                    </Button>
                    <Button
                      onClick={() => setInsightPeriod('week')}
                      variant={insightPeriod === 'week' ? 'default' : 'outline'}
                      className={insightPeriod === 'week' 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-600 text-black hover:from-green-500 hover:to-emerald-700' 
                        : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                      }
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Semana
                    </Button>
                    <Button
                      onClick={() => setInsightPeriod('month')}
                      variant={insightPeriod === 'month' ? 'default' : 'outline'}
                      className={insightPeriod === 'month' 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-600 text-black hover:from-green-500 hover:to-emerald-700' 
                        : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                      }
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Mês
                    </Button>
                    <Button
                      onClick={() => setInsightPeriod('year')}
                      variant={insightPeriod === 'year' ? 'default' : 'outline'}
                      className={insightPeriod === 'year' 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-600 text-black hover:from-green-500 hover:to-emerald-700' 
                        : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                      }
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Ano
                    </Button>
                  </div>

                  {/* Insights Cards */}
                  <div className="space-y-4">
                    {marketInsights[insightPeriod].map((insight, idx) => (
                      <Card key={idx} className="bg-gray-800/50 border-gray-700 hover:border-green-400/50 transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-3 flex-1">
                              <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="text-2xl font-bold text-white">{insight.ticker}</h3>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-400/50">
                                  {insight.recommendation}
                                </span>
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-5 h-5 text-green-400" />
                                  <span className="text-xl font-bold text-green-400">{insight.roi}</span>
                                </div>
                              </div>
                              
                              <p className="text-gray-400 text-lg">{insight.name}</p>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                  <p className="text-xs text-gray-500 mb-1">Valor de Mercado</p>
                                  <p className="text-lg font-semibold text-white">{insight.marketValue}</p>
                                </div>
                                <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                  <p className="text-xs text-gray-500 mb-1">Evolução</p>
                                  <p className="text-sm font-semibold text-green-400">{insight.evolution}</p>
                                </div>
                              </div>

                              <div className="pt-2">
                                <p className="text-sm text-gray-400 mb-1">
                                  <span className="text-green-400 font-semibold">Análise IA:</span>
                                </p>
                                <p className="text-sm text-gray-300">{insight.reason}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* AI Analysis Summary */}
                  <Card className="mt-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/30">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-2">
                            Resumo da Análise IA - {insightPeriod === 'day' ? 'Hoje' : insightPeriod === 'week' ? 'Semana' : insightPeriod === 'month' ? 'Mês' : 'Ano'}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {insightPeriod === 'day' && 'As ações destacadas hoje apresentam forte volume de negociação e momentum positivo. Recomenda-se atenção aos gatilhos de curto prazo e volatilidade intraday.'}
                            {insightPeriod === 'week' && 'A análise semanal identifica tendências consolidadas com base em resultados corporativos e movimentos setoriais. Oportunidades de swing trade com risco moderado.'}
                            {insightPeriod === 'month' && 'As ações selecionadas demonstram crescimento consistente ao longo do mês, com fundamentos sólidos e perspectivas positivas para continuidade da valorização.'}
                            {insightPeriod === 'year' && 'Os destaques anuais representam empresas com crescimento estrutural, liderança de mercado e capacidade comprovada de geração de valor no longo prazo.'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Dividendos Tab */}
          <TabsContent value="dividends" className="mt-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Coins className="w-6 h-6 text-green-400" />
                    Melhores Ações para Dividendos
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Análise completa das ações com melhores dividend yields e consistência de pagamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {dividendStocks.map((stock, idx) => (
                      <Card key={idx} className="bg-gray-800/50 border-gray-700 hover:border-green-400/50 transition-all">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="space-y-2">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h3 className="text-2xl font-bold text-white">{stock.ticker}</h3>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    stock.recommendation === 'COMPRA FORTE' 
                                      ? 'bg-green-500/20 text-green-400 border border-green-400/50'
                                      : stock.recommendation === 'COMPRA'
                                      ? 'bg-blue-500/20 text-blue-400 border border-blue-400/50'
                                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/50'
                                  }`}>
                                    {stock.recommendation}
                                  </span>
                                </div>
                                <p className="text-gray-400 text-lg">{stock.name}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500 mb-1">Dividend Yield</p>
                                <p className="text-3xl font-bold text-green-400">{stock.dividendYield}</p>
                              </div>
                            </div>

                            {/* Informações de Dividendos */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                <p className="text-xs text-gray-500 mb-1">Preço Atual</p>
                                <p className="text-lg font-semibold text-white">{stock.price}</p>
                              </div>
                              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                <p className="text-xs text-gray-500 mb-1">Último Dividendo</p>
                                <p className="text-lg font-semibold text-green-400">{stock.lastDividend}</p>
                              </div>
                              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                <p className="text-xs text-gray-500 mb-1">Frequência</p>
                                <p className="text-sm font-semibold text-white">{stock.paymentFrequency}</p>
                              </div>
                              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                <p className="text-xs text-gray-500 mb-1">Consistência</p>
                                <p className="text-sm font-semibold text-green-400">{stock.consistency}</p>
                              </div>
                            </div>

                            {/* Indicadores Fundamentalistas */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-400 mb-3">Indicadores Fundamentalistas</h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                  <p className="text-xs text-gray-500 mb-1">ROE</p>
                                  <p className="text-base font-semibold text-white">{stock.indicators.roe}</p>
                                </div>
                                <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                  <p className="text-xs text-gray-500 mb-1">Payout</p>
                                  <p className="text-base font-semibold text-white">{stock.indicators.payout}</p>
                                </div>
                                <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                  <p className="text-xs text-gray-500 mb-1">Dívida/PL</p>
                                  <p className="text-base font-semibold text-white">{stock.indicators.debtEquity}</p>
                                </div>
                                <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                  <p className="text-xs text-gray-500 mb-1">Crescimento 5 anos</p>
                                  <p className="text-base font-semibold text-green-400">{stock.indicators.growth5y}</p>
                                </div>
                              </div>
                            </div>

                            {/* Análise */}
                            <div className="pt-2 border-t border-gray-700">
                              <p className="text-sm text-gray-400 mb-2">
                                <span className="text-green-400 font-semibold">Análise IA:</span>
                              </p>
                              <p className="text-sm text-gray-300 leading-relaxed">{stock.analysis}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Resumo e Dicas */}
                  <Card className="mt-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/30">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <Coins className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-green-400">
                            Guia de Investimento em Dividendos
                          </h4>
                          <div className="space-y-2 text-sm text-gray-300">
                            <p>
                              <span className="font-semibold text-white">Dividend Yield:</span> Representa o percentual de retorno anual em dividendos em relação ao preço da ação. Yields acima de 6% são considerados atrativos no mercado brasileiro.
                            </p>
                            <p>
                              <span className="font-semibold text-white">Consistência:</span> Avalie o histórico de pagamento dos últimos 5 anos. Empresas com pagamentos regulares e crescentes são preferíveis.
                            </p>
                            <p>
                              <span className="font-semibold text-white">Payout Ratio:</span> Indica o percentual do lucro distribuído como dividendos. Valores entre 60-90% são ideais - muito alto pode indicar falta de reinvestimento.
                            </p>
                            <p>
                              <span className="font-semibold text-white">Setores Recomendados:</span> Energia elétrica, bancos, seguros e telecomunicações tradicionalmente pagam bons dividendos devido à estabilidade de receita.
                            </p>
                            <p className="pt-2 border-t border-gray-700/50">
                              <span className="font-semibold text-green-400">Dica IA:</span> Para construir uma carteira de dividendos sólida, diversifique entre 8-12 ações de setores diferentes, reinvista os dividendos recebidos e mantenha foco no longo prazo (5+ anos).
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Carteira Tab */}
          <TabsContent value="portfolio" className="mt-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Wallet className="w-6 h-6 text-green-400" />
                    Minha Carteira de Investimentos
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Organize seus ativos e acompanhe a evolução da sua carteira
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Adicionar Ação */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex gap-3 items-end flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                          <Label htmlFor="ticker" className="text-white mb-2 block">Ticker da Ação</Label>
                          <Input
                            id="ticker"
                            placeholder="Ex: PETR4"
                            value={newTicker}
                            onChange={(e) => setNewTicker(e.target.value.toUpperCase())}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                          <Label htmlFor="quantity" className="text-white mb-2 block">Quantidade</Label>
                          <Input
                            id="quantity"
                            type="number"
                            placeholder="100"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(e.target.value)}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                        </div>
                        <Button
                          onClick={addStockToPortfolio}
                          className="bg-gradient-to-r from-green-400 to-emerald-600 text-black hover:from-green-500 hover:to-emerald-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Resumo da Carteira */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/30">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <DollarSign className="w-5 h-5 text-green-400" />
                          <p className="text-sm text-gray-400">Valor Total da Carteira</p>
                        </div>
                        <p className="text-3xl font-bold text-white">
                          R$ {calculatePortfolioValue().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-400/30">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Coins className="w-5 h-5 text-blue-400" />
                          <p className="text-sm text-gray-400">Dividendos Anuais</p>
                        </div>
                        <p className="text-3xl font-bold text-white">
                          R$ {calculatePortfolioDividends().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-400/30">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <LineChart className="w-5 h-5 text-purple-400" />
                          <p className="text-sm text-gray-400">Dividend Yield Médio</p>
                        </div>
                        <p className="text-3xl font-bold text-white">
                          {((calculatePortfolioDividends() / calculatePortfolioValue()) * 100).toFixed(2)}%
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Lista de Ações */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Ativos na Carteira</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {portfolioStocks.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <Wallet className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Nenhum ativo adicionado ainda.</p>
                          <p className="text-sm mt-1">Adicione suas ações acima para começar!</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {portfolioStocks.map((stock) => {
                            const price = stockPrices[stock.ticker] || 0
                            const dividend = stockDividends[stock.ticker] || 0
                            const totalValue = price * stock.quantity
                            const annualDividends = dividend * stock.quantity
                            const yieldPercent = price > 0 ? (dividend / price) * 100 : 0

                            return (
                              <div
                                key={stock.id}
                                className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-green-400/50 transition-all"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <h3 className="text-xl font-bold text-white">{stock.ticker}</h3>
                                      <span className="text-sm text-gray-500">
                                        {stock.quantity} ações
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                      <div>
                                        <p className="text-gray-500">Preço Unitário</p>
                                        <p className="text-white font-semibold">R$ {price.toFixed(2)}</p>
                                      </div>
                                      <div>
                                        <p className="text-gray-500">Valor Total</p>
                                        <p className="text-green-400 font-semibold">
                                          R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-gray-500">Dividendos/Ano</p>
                                        <p className="text-blue-400 font-semibold">
                                          R$ {annualDividends.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-gray-500">Yield</p>
                                        <p className="text-purple-400 font-semibold">{yieldPercent.toFixed(2)}%</p>
                                      </div>
                                    </div>
                                  </div>
                                  <Button
                                    onClick={() => removeStockFromPortfolio(stock.id)}
                                    variant="outline"
                                    size="sm"
                                    className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Gráficos de Evolução */}
                  {portfolioStocks.length > 0 && (
                    <>
                      {/* Evolução da Carteira em Reais */}
                      <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <LineChart className="w-5 h-5 text-green-400" />
                            Evolução da Carteira (Últimos 6 Meses)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-64 flex items-end justify-between gap-2">
                            {getPortfolioEvolution().map((data, idx) => {
                              const maxValue = Math.max(...getPortfolioEvolution().map(d => d.value))
                              const height = (data.value / maxValue) * 100

                              return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                  <div className="w-full bg-gray-900 rounded-t-lg overflow-hidden relative group">
                                    <div
                                      className="w-full bg-gradient-to-t from-green-400 to-emerald-600 transition-all duration-500 hover:from-green-500 hover:to-emerald-700"
                                      style={{ height: `${height * 2}px` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <span className="text-xs font-semibold text-white bg-black/70 px-2 py-1 rounded">
                                        R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-xs text-gray-500">{data.month}</span>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Evolução dos Dividendos */}
                      <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Coins className="w-5 h-5 text-blue-400" />
                            Evolução dos Dividendos Mensais
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-64 flex items-end justify-between gap-2">
                            {getDividendEvolution().map((data, idx) => {
                              const maxValue = Math.max(...getDividendEvolution().map(d => d.value))
                              const height = (data.value / maxValue) * 100

                              return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                  <div className="w-full bg-gray-900 rounded-t-lg overflow-hidden relative group">
                                    <div
                                      className="w-full bg-gradient-to-t from-blue-400 to-cyan-600 transition-all duration-500 hover:from-blue-500 hover:to-cyan-700"
                                      style={{ height: `${height * 2}px` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <span className="text-xs font-semibold text-white bg-black/70 px-2 py-1 rounded">
                                        R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-xs text-gray-500">{data.month}</span>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Planner Tab - NOVA ABA */}
          <TabsContent value="planner" className="mt-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <ClipboardList className="w-6 h-6 text-green-400" />
                    Planejamento Financeiro Mensal
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Organize seus custos fixos e variáveis para calcular quanto sobra para investimentos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Input de Salário */}
                  <div className="space-y-2">
                    <Label htmlFor="planner-salary" className="text-white">Salário Mensal (R$)</Label>
                    <Input
                      id="planner-salary"
                      type="number"
                      placeholder="5000"
                      value={plannerSalary}
                      onChange={(e) => setPlannerSalary(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  {/* Adicionar Despesa */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Adicionar Despesa</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3 items-end flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                          <Label htmlFor="expense-name" className="text-white mb-2 block">Nome da Despesa</Label>
                          <Input
                            id="expense-name"
                            placeholder="Ex: Aluguel"
                            value={newExpenseName}
                            onChange={(e) => setNewExpenseName(e.target.value)}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                          <Label htmlFor="expense-value" className="text-white mb-2 block">Valor (R$)</Label>
                          <Input
                            id="expense-value"
                            type="number"
                            placeholder="1500"
                            value={newExpenseValue}
                            onChange={(e) => setNewExpenseValue(e.target.value)}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                          <Label htmlFor="expense-type" className="text-white mb-2 block">Tipo</Label>
                          <select
                            id="expense-type"
                            value={newExpenseType}
                            onChange={(e) => setNewExpenseType(e.target.value as 'fixed' | 'variable')}
                            className="w-full h-10 px-3 rounded-md bg-gray-900 border border-gray-700 text-white"
                          >
                            <option value="fixed">Fixa</option>
                            <option value="variable">Variável</option>
                          </select>
                        </div>
                        <Button
                          onClick={addExpense}
                          className="bg-gradient-to-r from-green-400 to-emerald-600 text-black hover:from-green-500 hover:to-emerald-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lista de Despesas */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Despesas Cadastradas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {expenses.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Nenhuma despesa cadastrada ainda.</p>
                          <p className="text-sm mt-1">Adicione suas despesas acima para começar!</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {expenses.map((expense) => (
                            <div
                              key={expense.id}
                              className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-green-400/50 transition-all"
                            >
                              <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-lg font-bold text-white">{expense.name}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                      expense.type === 'fixed'
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-400/50'
                                        : 'bg-orange-500/20 text-orange-400 border border-orange-400/50'
                                    }`}>
                                      {expense.type === 'fixed' ? 'Fixa' : 'Variável'}
                                    </span>
                                  </div>
                                  <p className="text-green-400 font-semibold">
                                    R$ {expense.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </p>
                                </div>
                                <Button
                                  onClick={() => removeExpense(expense.id)}
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Botão Calcular */}
                  <Button
                    onClick={calculatePlanner}
                    className="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-black hover:from-green-500 hover:to-emerald-700 font-semibold"
                  >
                    <Target className="w-5 h-5 mr-2" />
                    Calcular Planejamento
                  </Button>

                  {/* Resultado do Planejamento */}
                  {plannerResult && (
                    <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/30">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <ClipboardList className="w-6 h-6 text-green-400" />
                          <h3 className="text-xl font-bold text-green-400">Resultado do Planejamento</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                            <p className="text-sm text-gray-400 mb-1">Salário Mensal</p>
                            <p className="text-2xl font-bold text-white">
                              R$ {plannerResult.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>

                          <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                            <p className="text-sm text-gray-400 mb-1">Total de Despesas</p>
                            <p className="text-2xl font-bold text-red-400">
                              R$ {plannerResult.totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>

                          <div className="p-4 bg-gray-900/50 rounded-lg border border-blue-400/30">
                            <p className="text-sm text-gray-400 mb-1">Custos Fixos</p>
                            <p className="text-2xl font-bold text-blue-400">
                              R$ {plannerResult.totalFixed.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>

                          <div className="p-4 bg-gray-900/50 rounded-lg border border-orange-400/30">
                            <p className="text-sm text-gray-400 mb-1">Custos Variáveis</p>
                            <p className="text-2xl font-bold text-orange-400">
                              R$ {plannerResult.totalVariable.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>

                        {/* Valor Restante */}
                        <div className="pt-4 border-t border-gray-700">
                          <div className="p-6 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg border border-green-400/50">
                            <p className="text-sm text-gray-400 mb-2">Disponível para Investimentos</p>
                            <p className="text-4xl font-bold text-green-400 mb-2">
                              R$ {plannerResult.remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-sm text-gray-300">
                              {plannerResult.remainingPercentage.toFixed(1)}% do seu salário
                            </p>
                          </div>
                        </div>

                        {/* Análise IA */}
                        <div className="pt-4 border-t border-gray-700">
                          <p className="text-sm text-gray-300 leading-relaxed">
                            <span className="text-green-400 font-semibold">Análise IA:</span> {
                              plannerResult.remaining > 0
                                ? `Excelente! Você tem R$ ${plannerResult.remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} disponíveis para investir mensalmente. Isso representa ${plannerResult.remainingPercentage.toFixed(1)}% do seu salário. Recomendamos alocar esse valor em uma carteira diversificada de investimentos para construir seu patrimônio no longo prazo.`
                                : plannerResult.remaining === 0
                                ? 'Atenção! Suas despesas estão consumindo 100% do seu salário. É importante criar uma margem de segurança e buscar formas de reduzir custos ou aumentar sua renda para começar a investir.'
                                : `Alerta! Suas despesas excedem seu salário em R$ ${Math.abs(plannerResult.remaining).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}. É urgente revisar seus gastos e buscar formas de equilibrar suas finanças para evitar endividamento.`
                            }
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
