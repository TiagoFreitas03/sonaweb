import { Link } from 'react-router-dom'

import '../styles/sidebar.css'
import { logo } from '../images'

export function Sidebar() {
	return (
		<div id="sidebar-wrapper">
			<div id="sidebar">
				<div className="sidebar-heading py-3 text-center">
					<Link to="/">
						<img src={logo} alt="Logo" className="logo" />
					</Link>
				</div>

				<div className="list-group list-group-flush">
					<Link to="/scheduling" className="list-group-item">
						<i className="fas fa-microchip"></i> Escalonamento de CPU
					</Link>

					<Link to="/memory" className="list-group-item">
						<i className="fas fa-memory"></i> Alocação de Memória
					</Link>

					<Link to="/help" className="list-group-item">
						<i className="fas fa-question"></i> Ajuda
					</Link>

					<a
						href="https://github.com/TiagoFreitas03/sonaweb.git"
						target='_blank'
						className="list-group-item"
					>
						<i className="fab fa-github"></i> Repositório no GitHub
					</a>
				</div>
			</div>
		</div>
	)
}
