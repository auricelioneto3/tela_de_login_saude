import { useState } from 'react'

// Register segue exatamente o mesmo formato do Login: apenas o
// <section className="login-card">, sem a imagem (que já está no AuthLayout).
export default function Register({ onSwitchToLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  return (
    <section className="login-card" aria-label="Formulário de cadastro">
      <div className="login-header">
        <div className="logo-badge">✚</div>
        <h1>Criar conta</h1>
        <p>Preencha os dados para se cadastrar</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="name">Nome completo</label>
          <input
            id="name"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="email">E-mail profissional</label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Crie uma senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="signup-link">
          Já tem conta?{' '}
          <button type="button" className="link-button" onClick={onSwitchToLogin}>
            Fazer login
          </button>
        </p>
      </form>
    </section>
  )
}