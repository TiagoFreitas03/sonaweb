import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Landing } from './pages/Landing'
import { Help } from './pages/Help'
import { NotFound } from './pages/NotFound'

import { SchedulingSimulation } from './pages/SchedulingSimulation'
import { MemorySimulation } from './pages/MemorySimulation'

const errorElement = <NotFound />

const router = createBrowserRouter([
  { path: "/", element: <Landing />, errorElement },
  { path: "/help", element: <Help />, errorElement },
  { path: "/scheduling", element: <SchedulingSimulation />, errorElement },
  { path: "/memory", element: <MemorySimulation />, errorElement },
  { path: "/", element: <Landing />, errorElement },
]);

export function Routes() {
	return (
		<RouterProvider router={router} />
	)
}
