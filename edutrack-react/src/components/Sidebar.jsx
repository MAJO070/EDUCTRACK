function Sidebar({ moduloActivo, setModuloActivo }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <span className="logo-e-mini">E</span>
                <span className="logo-texto">EduTrack</span>
            </div>

            <nav className="sidebar-menu">
                <button
                className={`sidebar-item ${moduloActivo === 'inicio' ? 'activo' : ''}`}
                onClick={() => setModuloActivo('inicio')}
                >
                   🏠 Inicio 
                </button>

                <button
                className={`sidebar-item ${moduloActivo === 'boletin' ? 'activo' : ''}`}
                onClick={() => setModuloActivo('boletin')}
                >
                  📋 Mi Boletin 
                </button>

                <button className={`sidebar-item ${moduloActivo === 'salon' ? 'activo' : ''}`}
                onClick={() => setModuloActivo('salon')}
                >  
                 👥 Mi Salón (10°A)
                </button>

                <button className={`sidebar-item ${moduloActivo === 'evidencias' ? 'activo' : ''}`}
                onClick={() => setModuloActivo('evidencias')}
                >
                 📂 Evidencias
                </button>

                <button className={`sidebar-item ${moduloActivo === 'horario' ? 'activo' : ''}`}
                onClick={() => setModuloActivo('horario')}
                >
                 ⏰ Horario Escolar
                </button>    
            </nav>
        </aside>
    )
} 

export default Sidebar