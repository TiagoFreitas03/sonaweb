import '../styles/navbar.css'

export function Navbar() {
	function toggleSidebar() {
		const wrapper = document.getElementById('wrapper')
		wrapper?.classList.toggle('toggled')
	}

	return (
		<nav className="navbar navbar-expand border-bottom">
			<button className="btn" id="menu-toggle" type="button" onClick={toggleSidebar}>
				<i className="fas fa-bars fa-lg"></i>
			</button>

			<div className="container" id="title">
				<div className="row mx-auto">SOnaWeb</div>
			</div>

			<div className="collapse navbar-collapse">
				<ul className="navbar-nav ml-auto mt-lg-0">
					<li className="nav-item dropdown">
						<a
							className="nav-link dropdown-toggle"
							href="#navbar"
							id="navbarDropdown"
							role="button"
							data-toggle="dropdown"
						><i className="fas fa-cog fa-lg"></i>
						</a>

						<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
							<a className="dropdown-item" href="/help">
								<i className="fas fa-question"/> Ajuda
							</a>

							<a className="dropdown-item" href="https://github.com/TiagoFreitas03/sonaweb">
								<i className="fab fa-github"/> Github
							</a>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	)
}