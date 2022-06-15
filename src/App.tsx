import './styles/global.css'

import { AlertContextProvider } from './contexts/AlertContext'

import { Routes } from './routes'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'

export function App() {
	return (
		<AlertContextProvider>
			<div className="d-flex" id="wrapper">
				<Sidebar />

				<div id="page-content-wrapper">
					<Navbar />

					<Routes />
				</div>
			</div>
		</AlertContextProvider>
	)
}