import { useState } from 'react'
import AuthLayout from './Authlayout.jsx'
import Login from '../components/login.jsx'
import Register from '../components/register.jsx'

export default function AuthPage() {

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
