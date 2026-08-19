import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState(null)
  const [triagem, setTriagem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [metas, setMetas] = useState({
    meta1: false,
    meta2: false,
    meta3: false,
  })

  // ─── Carregar dados ao montar ─────────────────────────────────────────

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      // Buscar informações do usuário
      const resUsuario = await api.get('/usuario/perfil')
      setUsuario(resUsuario.data)

      // Buscar triagem do usuário
      const resTriagem = await api.get('/triagem')
      setTriagem(resTriagem.data)

      // Carregar metas do localStorage
      const metasSalvas = localStorage.getItem('metas')
      if (metasSalvas) {
        setMetas(JSON.parse(metasSalvas))
      }
    } catch (erro) {
      console.error('Erro ao carregar dados:', erro)
      if (erro.response?.status === 401) {
        navigate('/login')
      } else {
        setErro('Não foi possível carregar os dados.')
      }
    } finally {
      setLoading(false)
    }
  }

  // ─── Handlers ─────────────────────────────────────────────────────────

  function handleToggleMeta(metaKey) {
    const novasMetas = { ...metas, [metaKey]: !metas[metaKey] }
    setMetas(novasMetas)
    localStorage.setItem('metas', JSON.stringify(novasMetas))
  }

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // ─── Funções auxiliares ───────────────────────────────────────────────

  function obterLinhasCuidado() {
    if (!triagem) return []
    const linhas = []

    if (triagem.condicoes?.includes('diabetes')) {
      linhas.push({
        id: 'diabetica',
        nome: 'Linha Diabética',
        descricao: 'Acompanhamento para controle de diabetes',
        classe: 'diabetica',
      })
    }
    if (
      triagem.condicoes?.includes('obesidade') ||
      parseFloat(triagem.imc) >= 30
    ) {
      linhas.push({
        id: 'obesidade',
        nome: 'Linha Obesidade',
        descricao: 'Programa de controle de peso e nutrição',
        classe: 'obesidade',
      })
    }
    if (triagem.condicoes?.includes('hipertensao')) {
      linhas.push({
        id: 'hipertensao',
        nome: 'Linha Hipertensão',
        descricao: 'Controle da pressão arterial',
        classe: 'hipertensao',
      })
    }

    return linhas
  }

  function obterRecomendacoes() {
    if (!triagem) return []

    const recomendacoes = []
    const condicoes = triagem.condicoes || []
    const imc = parseFloat(triagem.imc)
    const nivel_atividade = triagem.nivel_atividade

    // Recomendações para Diabetes
    if (condicoes.includes('diabetes')) {
      recomendacoes.push({
        id: 1,
        titulo: 'Monitore sua glicemia regularmente',
        descricao:
          'Faça testes de glicemia conforme orientação médica e mantenha um registro dos valores.',
        badge: 'Diabética',
        classe: 'diabetica',
      })
      recomendacoes.push({
        id: 2,
        titulo: 'Alimentação de baixo índice glicêmico',
        descricao:
          'Prefira alimentos integrais, vegetais e proteínas magras. Evite açúcares refinados.',
        badge: 'Diabética',
        classe: 'diabetica',
      })
      recomendacoes.push({
        id: 3,
        titulo: 'Pratique exercícios aeróbicos',
        descricao:
          'Caminhada, natação ou ciclismo por 30 minutos, 5 vezes na semana, ajudam no controle glicêmico.',
        badge: 'Diabética',
        classe: 'diabetica',
      })
      recomendacoes.push({
        id: 4,
        titulo: 'Tome seus medicamentos regularmente',
        descricao:
          'Mantenha a rotina de medicação prescrita e não interrompa sem orientação médica.',
        badge: 'Diabética',
        classe: 'diabetica',
      })
    }

    // Recomendações para Obesidade
    if (imc >= 30 || condicoes.includes('obesidade')) {
      recomendacoes.push({
        id: 5,
        titulo: 'Controle de calorias balanceado',
        descricao:
          'Consulte um nutricionista para plano alimentar personalizado com déficit calórico saudável.',
        badge: 'Obesidade',
        classe: 'obesidade',
      })
      recomendacoes.push({
        id: 6,
        titulo: 'Atividade física progressiva',
        descricao:
          'Inicie com exercícios leves e aumente gradualmente. Combine aeróbicos com fortalecimento muscular.',
        badge: 'Obesidade',
        classe: 'obesidade',
      })
      recomendacoes.push({
        id: 7,
        titulo: 'Hidratação adequada',
        descricao:
          'Beba ao menos 2 litros de água por dia. A hidratação auxilia no metabolismo e reduz a fome.',
        badge: 'Obesidade',
        classe: 'obesidade',
      })
      recomendacoes.push({
        id: 8,
        titulo: 'Qualidade do sono',
        descricao:
          'Durma de 7 a 9 horas por noite. O sono adequado regula hormônios da fome e saciedade.',
        badge: 'Obesidade',
        classe: 'obesidade',
      })
    }

    // Recomendação geral
    if (nivel_atividade === 'sedentario' || nivel_atividade === 'sedentário') {
      recomendacoes.push({
        id: 9,
        titulo: 'Aumente sua atividade física',
        descricao:
          'Comece com atividades simples como caminhadas e aumente gradualmente a intensidade.',
        badge: 'Geral',
        classe: 'geral',
      })
    }

    return recomendacoes
  }

  function classificarIMC(imc) {
    imc = parseFloat(imc)
    if (imc < 18.5) return { texto: 'Abaixo do peso', badge: 'orange' }
    if (imc < 25.0) return { texto: 'Peso Normal', badge: 'green' }
    if (imc < 30.0) return { texto: 'Sobrepeso', badge: 'orange' }
    if (imc < 35.0) return { texto: 'Obesidade Grau I', badge: 'red' }
    if (imc < 40.0) return { texto: 'Obesidade Grau II', badge: 'red' }
    return { texto: 'Obesidade Grau III', badge: 'red' }
  }

  // ─── Render ───────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="dashboard-error">
        <p>{erro}</p>
        <button onClick={carregarDados}>Tentar novamente</button>
      </div>
    )
  }

  const linhas = obterLinhasCuidado()
  const recomendacoes = obterRecomendacoes()
  const imcInfo = triagem ? classificarIMC(triagem.imc) : null
  const nomeUsuario = usuario?.nome?.split(' ')[0] || 'Usuário'
  const iniciais = nomeUsuario.substring(0, 2).toUpperCase()

  return (
    <div className="dashboard">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="icon">
            <svg viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          SPL
        </div>
        <div className="nav-right">
          <div className="avatar">{iniciais}</div>
          <button className="btn-logout" title="Sair" onClick={handleLogout}>
            <svg viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </nav>

      {/* PAGE */}
      <main className="page">
        {/* HEADING */}
        <div className="page-heading">
          <h1>Olá, {nomeUsuario}</h1>
          <p>Veja seu resumo de saúde personalizado.</p>
        </div>

        {/* LINHAS DE CUIDADO */}
        {linhas.length > 0 && (
          <section className="section">
            <div className="section-title">
              <svg viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Suas linhas de cuidado
            </div>
            <div className="care-lines">
              {linhas.map((linha) => (
                <div key={linha.id} className={`care-card ${linha.classe}`}>
                  <div className="care-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                  <div className="care-info">
                    <strong>{linha.nome}</strong>
                    <span>{linha.descricao}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MÉTRICAS */}
        {triagem && (
          <section className="section">
            <div className="metrics">
              <div className="metric-card">
                <div className="metric-label">
                  <svg viewBox="0 0 24 24">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  IMC
                </div>
                <div className="metric-value">{triagem.imc}</div>
                <span className={`badge ${imcInfo?.badge}`}>
                  {imcInfo?.texto}
                </span>
              </div>
              <div className="metric-card">
                <div className="metric-label">
                  <svg viewBox="0 0 24 24">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  Nível de atividade
                </div>
                <div className="metric-value text-md">
                  {triagem.nivel_atividade}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-label">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Próxima etapa
                </div>
                <div className="metric-sub">
                  Agende uma consulta para avaliação completa
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RECOMENDAÇÕES */}
        {recomendacoes.length > 0 && (
          <section className="section recommendations">
            <div className="section-title">Recomendações para você</div>
            <div className="rec-list">
              {recomendacoes.map((rec) => (
                <div key={rec.id} className={`rec-card ${rec.classe}`}>
                  <div className="rec-body">
                    <strong>{rec.titulo}</strong>
                    <p>{rec.descricao}</p>
                  </div>
                  <div className="rec-tag">
                    <span
                      className={`badge ${rec.classe === 'diabetica' ? 'purple' : rec.classe === 'obesidade' ? 'orange' : 'green'}`}
                    >
                      {rec.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* METAS DA SEMANA */}
        <section className="section">
          <div className="goals-card">
            <h3>Metas da semana</h3>
            <div className="goal-list">
              <label className="goal-item">
                <input
                  type="checkbox"
                  checked={metas.meta1}
                  onChange={() => handleToggleMeta('meta1')}
                />
                <span className="goal-check">
                  <svg viewBox="0 0 12 12">
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                </span>
                <span className="goal-text">
                  Beber 2 litros de água por dia
                </span>
              </label>
              <label className="goal-item">
                <input
                  type="checkbox"
                  checked={metas.meta2}
                  onChange={() => handleToggleMeta('meta2')}
                />
                <span className="goal-check">
                  <svg viewBox="0 0 12 12">
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                </span>
                <span className="goal-text">
                  Praticar 30 minutos de exercícios 3x na semana
                </span>
              </label>
              <label className="goal-item">
                <input
                  type="checkbox"
                  checked={metas.meta3}
                  onChange={() => handleToggleMeta('meta3')}
                />
                <span className="goal-check">
                  <svg viewBox="0 0 12 12">
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                </span>
                <span className="goal-text">
                  Dormir pelo menos 7 horas por noite
                </span>
              </label>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
