function Navbar({ usuario, onCerrarSesion, modoOscuro, setModoOscuro }) {

    const iniciales = usuario?.nombre ? usuario.nombre.slice(0, 2).toUpperCase() : 'US'

    return (
        <header className="navbar-superior">
            <div className="navbar-usuario-info">
                <button 
                type="button"
                onClick={() => setModoOscuro(!modoOscuro)}
                className="btn-tema"
                >
                    {modoOscuro ? '☀️ Claro:' : '🌙 Oscuro'}
                </button>
                
                <span className="navbar-correo">{usuario?.correo}</span>
                <div className="navbar-avatar">{iniciales}</div>
                <button type="button" onClick={onCerrarSesion} className="btn-salir">
                    Salir
                </button>
            </div>
        </header>
    )
}

export default Navbar