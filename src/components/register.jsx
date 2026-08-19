import { useState } from 'react'

export default function Register({ onSwitchToLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cargo, setCargo] = useState('funcionario')
  const [ubs, setUbs] = useState('CSF Dr. Luciano Adeodato')
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
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            type="tel"
            placeholder="(99) 99999-9999"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="cargo">Cargo</label>
          <select className="link-button" id="cargo" value={cargo} onChange={(event) => setCargo(event.target.value)}>
            <option value="funcionario">Funcionário</option>
            <option value="paciente">Paciente</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="ubs">UBS</label>
          <select className="link-button" id="ubs" value={ubs} onChange={(event) => setUbs(event.target.value)}>
            <option value="CSF Dr. Luciano Adeodato">CSF Dr. Luciano Adeodato</option>
            <option value="CSF Alto da Brasília">CSF Alto da Brasília</option>
            <option value="CSF Junco">CSF Junco</option>
            <option value="CSF Dom Expedito">CSF Dom Expedito</option>
            <option value="CSF Sinhá Sabóia">CSF Sinhá Sabóia</option>
          </select>
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