import { useState } from 'react'
import imagePet from '../assets/image.png'

export default function Login({ onSwitchToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = 'Email obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido'
    }

    if (!password) {
      newErrors.password = 'Senha obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  return (
    <section className="login-card" aria-label="Formulário de login">
      <div className="login-header">
        <div className="logo-badge">✚</div>
        <h1>Bem-vindo</h1>
        <p>Faça login na sua conta</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        

        <div className="field-group">
          <label htmlFor="password">Senha</label>
          <div className="password-wrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={errors.password ? 'input-error' : ''}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" />
            Lembrar de mim
          </label>
          <a href="#">Esqueci a senha</a>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <p className="signup-link">
          Não tem conta?{' '}
          <button type="button" className="link-button" onClick={onSwitchToRegister}>
              Cadastre-se
          </button>
        </p>

      </form>
      
    </section>

  )
}
