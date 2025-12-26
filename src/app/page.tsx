"use client"

import { useState } from "react"
import { TrendingUp, MessageSquare, BarChart3, Home, Send, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

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

export default function CarteiraPro() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoadingChat, setIsLoadingChat] = useState(false)

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoadingChat) return

    const userMessage = inputMessage.trim()
    setInputMessage("")
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoadingChat(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          context: 'investimentos e mercado financeiro'
        })
      })

      const data = await response.json()
      
      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Desculpe, ocorreu um erro. Configure sua chave OpenAI para usar o chat.' 
        }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Configure sua chave OpenAI no banner laranja acima para usar o chat IA.' 
      }])
    } finally {
      setIsLoadingChat(false)
    }
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
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-gray-900 border border-gray-800">
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
                  <CardDescription className="text-lg">
                    Sua plataforma completa para gestão de investimentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Acompanhe seu portfólio, converse com IA financeira e receba análises de mercado.
                  </p>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-green-400/50 transition-all shadow-lg">
                  <CardHeader className="pb-3">
                    <CardDescription className="text-gray-400 text-sm">Valor Total</CardDescription>
                    <CardTitle className="text-3xl font-bold text-green-400">
                      R$ 124.580
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
                      12
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
                      +24.7%
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Acima da média</p>
                  </CardContent>
                </Card>
              </div>

              {/* Portfolio Distribution */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle>Distribuição do Portfólio</CardTitle>
                  <CardDescription>Alocação de ativos por categoria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioData.map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">{item.name}</span>
                          <span className="font-semibold text-white">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${item.value}%`,
                              backgroundColor: item.color
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Chat IA Tab */}
          <TabsContent value="chat" className="mt-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-green-400" />
                    Chat com IA Financeira
                  </CardTitle>
                  <CardDescription>
                    Tire suas dúvidas sobre investimentos e mercado financeiro
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Messages Area */}
                  <div className="h-96 overflow-y-auto space-y-4 p-4 bg-black/30 rounded-lg border border-gray-800">
                    {messages.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-center">
                        <div>
                          <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400">Comece uma conversa!</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Pergunte sobre ações, fundos, estratégias de investimento...
                          </p>
                        </div>
                      </div>
                    ) : (
                      messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-2xl ${
                              msg.role === 'user'
                                ? 'bg-gradient-to-r from-green-400 to-emerald-600 text-black'
                                : 'bg-gray-800 text-white border border-gray-700'
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                    {isLoadingChat && (
                      <div className="flex justify-start">
                        <div className="bg-gray-800 text-white border border-gray-700 p-4 rounded-2xl">
                          <Loader2 className="w-5 h-5 animate-spin text-green-400" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Digite sua pergunta sobre investimentos..."
                      className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      disabled={isLoadingChat}
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
                  <CardDescription>
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
                        <TrendingUp className="w-4 h-4 rotate-180" />
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
        </Tabs>
      </main>
    </div>
  )
}
