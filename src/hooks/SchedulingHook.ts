import { useState } from 'react'

import { IProcess } from '../classes/Process'
import { Scheduling } from '../classes/Scheduling'

export function useScheduling() {
	const [started, setStarted] = useState(false)
	const [executing, setExecuting] = useState<IProcess>()
	const [waiting, setWaiting] = useState<IProcess[]>([])
	const [time, setTime] = useState(0)
	const [ganttDiagram, setGanttDiagram] = useState<IProcess[]>([])

	function startSimulation(algorithm: string, [bursts, arrivals]: number[][], quantum?: number) {
		let scheduling: Scheduling

		try {
			scheduling = new Scheduling(algorithm, bursts, arrivals, quantum)
		} catch (err: any) {
			throw err
		}

		setStarted(true)
		const simulationLoop = (firstLoop: boolean = false) => {
			const {
				timeout, isSimulationOver, waiting, executing, timePassed, diagram
			} = scheduling.execute(firstLoop)

			setTime(timePassed)
			setWaiting(waiting)
			setExecuting(executing)
			setGanttDiagram(diagram)

			if (!isSimulationOver)
				setTimeout(simulationLoop, timeout)
			else
				setStarted(false)
		}

		setTimeout(() => simulationLoop(true), 0)
	}

	return { started, executing, waiting, time, ganttDiagram, startSimulation }
}
