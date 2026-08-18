import imagePet from '../assets/image.png'
 
// AuthLayout é o "molde" da tela: contém a imagem da esquerda (que NUNCA muda)
// e reserva um espaço (children) para o que vier da direita — pode ser o
// formulário de Login, de Cadastro, de "esqueci a senha", etc.
//
// Como esse componente não guarda estado nenhum de formulário, ele nunca é
// desmontado ao trocar de tela — só o que está dentro de `children` muda.
export default function AuthLayout({ children }) {
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
        
        {/* Aqui entra o que for passado como filho: <Login /> ou <Register /> */}
        {children}
      </div>
    </main>
  )
}
