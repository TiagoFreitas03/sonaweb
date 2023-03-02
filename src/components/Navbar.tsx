export function Navbar() {
	const toggleSidebar = () => document.getElementById('wrapper')!.classList.toggle('toggled')

	return (
		<nav className="navbar bg-grey">
			<button className="btn text-light" type="button" onClick={toggleSidebar}>
				<i className="fas fa-bars fa-lg" />
			</button>
		</nav>
	)
}
