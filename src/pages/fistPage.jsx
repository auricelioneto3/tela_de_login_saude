import { useState } from 'react'
import AuthLayout from './Authlayout.jsx'
import Login from '../components/login.jsx'
import Register from '../components/register.jsx'

// AuthPage é quem decide QUAL formulário mostrar dentro do layout.
// O AuthLayout (com a imagem) é montado uma única vez; só o que está
// dentro dele (Login ou Register) troca quando o estado `screen` muda.
export default function AuthPage() {
  // 'login' ou 'register' — controla qual formulário aparece na direita
  const [screen, setScreen] = useState('login')
 
  return (
    <AuthLayout>
      {screen === 'login' ? (
        <Login onSwitchToRegister={() => setScreen('register')} />
      ) : (
        <Register onSwitchToLogin={() => setScreen('login')} />
      )}
    </AuthLayout>
  )
}
