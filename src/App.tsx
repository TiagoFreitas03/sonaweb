import './styles/global.css'

import { AlertContextProvider } from './contexts/AlertContext'
import { Routes } from './routes'

export function App() {
	return (
		<AlertContextProvider>
			<div className="d-flex" id="wrapper">
				<Routes />
			</div>
		</AlertContextProvider>
	)
}
