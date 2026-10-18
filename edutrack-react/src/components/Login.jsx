import { useState } from 'react'
import logoEdu from '../assets/edutrack-logo.svg'

function Login({ onIniciarSesion }) {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [recordarme, setRecordarme] = useState(false)

  const manejarEnvio = (e) => {
    e.preventDefault()

    if (!correo.trim() || !password.trim()) {
      alert('Por favor ingresa tu correo y contraseña')
      return
    }

    onIniciarSesion(correo, password)
  }

  const olvidarPassword = (e) => {
    e.preventDefault()
    const emailPrompt = prompt('Ingresa tu correo registrado para recuperar la contraseña:', correo)
    if (emailPrompt) {
      alert(`Hemos enviado un enlace de recuperación a: ${emailPrompt}`)
    }
  }

  // Accesos rápidos de prueba (Demo con usuarios de Neon DB)
  const accesoRapido = (tipo) => {
    if (tipo === 'profesor') {
      setCorreo('profesor@edutrack.edu')
      setPassword('Profe123*')
    } else {
      setCorreo('estudiante@edutrack.edu')
      setPassword('Alumno123*')
    }
  }

  return (
    <div className="escena-login">
        <div className="marca-agua-neon">EDUCTRACK</div>

    <div className="tarjeta contenedor-login">
      {/* Insignia y Logo de la E */}
      <div className="login-logo-contenedor">
        <img src={logoEdu} alt="EduTrack Logo" className="logo-login" />
        <span className="badge-sistema">Plataforma Oficial v1.0</span>
      </div>

      <h2 className="titulo-login">Bienvenido a EduTrack</h2>
      <p className="subtitulo-login">Gestión y seguimiento académico inteligente</p>

      {/* Botones de Acceso Rápido para Pruebas */}
      <div className="caja-demo">
        <span className="demo-texto">Accesos rápidos de prueba:</span>
        <div className="demo-botones">
          <button type="button" onClick={() => accesoRapido('profesor')} className="btn-demo">
            👨‍🏫 Profesor
          </button>
          <button type="button" onClick={() => accesoRapido('estudiante')} className="btn-demo">
            👩‍🎓 Estudiante
          </button>
        </div>
      </div>

      <form onSubmit={manejarEnvio} className="formulario-login">
        {/* Campo Correo */}
        <div className="campo">
          <label htmlFor="correo">
            <span className="icono-input">📧</span> Correo Institucional:
          </label>
          <input
            id="correo"
            type="email"
            placeholder="ej: profesor@edutrack.edu"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        {/* Campo Contraseña con botón de Ver/Ocultar */}
        <div className="campo">
          <div className="etiqueta-con-enlace">
            <label htmlFor="password">
              <span className="icono-input">🔒</span> Contraseña:
            </label>
            <a href="#recuperar" onClick={olvidarPassword} className="enlace-olvido">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="input-password-wrapper">
            <input
              id="password"
              type={mostrarPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn-ver-password"
              onClick={() => setMostrarPassword(!mostrarPassword)}
              title={mostrarPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            >
              {mostrarPassword ? '👁️' : '🙈'}
            </button>
          </div>
        </div>

        {/* Recordar sesión */}
        <div className="fila-recordar">
          <label className="checkbox-recordar">
            <input
              type="checkbox"
              checked={recordarme}
              onChange={(e) => setRecordarme(e.target.checked)}
            />
            <span>Recordar mi usuario en este equipo</span>
          </label>
        </div>

        {/* Botón principal */}
        <button type="submit" className="btn-guardar btn-login-principal">
          Iniciar Sesión ➔
        </button>
      </form>

      {/* Pie del Login */}
      <div className="login-footer">
        <p>¿Problemas para acceder? <a href="mailto:soporte@edutrack.edu">Contactar a Soporte</a></p>
        <small className="seguridad-texto">🛡️ Conexión cifrada y protegida por EduTrack Security</small>
      </div>
    </div>
  </div>
  )
  }


export default Login