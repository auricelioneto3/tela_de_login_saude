import { useState } from 'react'
import imagePet from '../assets/image.png'

export default function Login() {
  const [userType, setUserType] = useState('administrativo')
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
    <main className="login-page">
      <div className="login-shell">
        <aside className="login-visual" aria-label="Imagem ilustrativa da página de login">
          <div className="visual-overlay">
            <span className="visual-tag">Saúde com cuidado</span>
            <h2>Seu bem-estar começa aqui.</h2>
            <p>Conecte-se à sua agência de saúde e cuide do futuro com confiança.</p>
          </div>
          <img src={imagePet} alt="Ilustração de cuidado e saúde" />
        </aside>

        <section className="login-card" aria-label="Formulário de login">
          <div className="login-header">
            <div className="logo-badge">✚</div>
            <h1>Bem-vindo</h1>
            <p>Faça login na sua conta</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="user-type-selector" aria-label="Tipo de usuário">
              {[
                { value: 'administrativo', label: 'Administrativo' },
                { value: 'funcionario', label: 'Funcionário' },
                { value: 'organizador', label: 'Organizador' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={userType === option.value ? 'user-type active' : 'user-type'}
                  onClick={() => setUserType(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="field-group">
              <label htmlFor="email">E-mail profissional</label>
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
          </form>
        </section>
      </div>
    </main>
  )
}
