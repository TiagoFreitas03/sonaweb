import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Landing } from './pages/Landing'
import { Help } from './pages/Help'
import { NotFound } from './pages/NotFound'

import { SchedulingSimulation } from './pages/SchedulingSimulation'
import { MemorySimulation } from './pages/MemorySimulation'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'

export function Routes() {
	return (
		<Router>
			<Sidebar />

			<div id="page-content-wrapper">
				<Navbar />

				<Switch>
					<Route path='/' exact component={Landing} />
					<Route path='/help' component={Help} />

					<Route path='/scheduling' component={SchedulingSimulation} />
					<Route path='/memory' component={MemorySimulation} />

					<Route path="/404" component={NotFound} />
					<Redirect to="/404" />
				</Switch>
			</div>
		</Router>
	)
}
