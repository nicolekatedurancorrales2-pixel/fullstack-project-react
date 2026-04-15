

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>MiSitio</h2>
          <p>Creando experiencias digitales modernas y funcionales.</p>
        </div>

        <div className="footer-section">
          <h3>Enlaces</h3>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Servicios</a></li>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Redes</h3>
          <div className="socials">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 MiSitio | Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;