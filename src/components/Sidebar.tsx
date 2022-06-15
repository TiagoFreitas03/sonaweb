import '../styles/sidebar.css'
import { logo } from '../images'

export function Sidebar() {
	return (
		<div id="sidebar-wrapper">
			<div id="sidebar">
				<div className="sidebar-heading py-3 text-center">
					<a href="/">
						<img src={logo} alt="Logo" className="logo" />
					</a>
				</div>

				<div className="list-group list-group-flush">
					<a href="/scheduling" className="list-group-item">
						<i className="fas fa-microchip"></i> Escalonamento de CPU
					</a>
					<a href="/memory" className="list-group-item">
						<i className="fas fa-memory"></i> Alocação de Memória
					</a>
				</div>
			</div>
		</div>
	)
}