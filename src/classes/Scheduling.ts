import * as yup from 'yup'

import { ISchedulingProcess, IProcess } from './Process'
import { colors } from '../utils/simulation'

const ONE_SECOND = 1000

export class Scheduling {
	private processes: ISchedulingProcess[]
	private algorithm: string
	private quantum: number
	private ganttDiagram: IProcess[]

	private totalBurst: number
	private readyProcesses: number
	private timePassed: number
	private initialQuantum: number

	constructor(algorithm: string, bursts: number[], arrivals: number[], quantum: number = 0) {
		const schema = yup.object().shape({
			algorithm: yup.string().required().oneOf(['fcfs', 'sjf', 'srtf', 'rr']),
			bursts: yup.array(yup.number().required().min(1)).required().min(1).max(5),
			arrivals: yup.array(yup.number().required().min(0)).required().length(bursts.length),
			quantum: yup.number().required()
		})

		schema.validateSync({ algorithm, bursts, arrivals, quantum }, { abortEarly: false })

		this.processes = Array.from({ length: bursts.length }, (_, i) => {
			return {
				id: `P${i}`,
				color: colors[i] ?? '',
				burst: Math.floor(bursts[i]),
				arrival: Math.floor(arrivals[i]),
				ready: false
			}
		})

		this.algorithm = algorithm
		this.quantum = quantum
		this.ganttDiagram = []
		this.readyProcesses = 0
		this.timePassed = 0
		this.initialQuantum = quantum

		this.totalBurst = 0
		this.processes.forEach(proc => { this.totalBurst += proc.burst })
		this.sortByArrival()
	}

	sortByArrival() {
		for (let i = 0; i < this.processes.length; i++)
			for (let j = 0; j < this.processes.length; j++)
				if ((this.processes[i].arrival < this.processes[j].arrival) && (i !== j))
					[this.processes[i], this.processes[j]] = [this.processes[j], this.processes[i]]
	}

	execute(first: boolean = false) {
		this.updateReadyProcesses()
		let isSimulationOver = this.timePassed === this.totalBurst

		const state = {
			timeout: ONE_SECOND,
			isSimulationOver,
			timePassed: this.timePassed,
			waiting: [] as IProcess[],
			executing: undefined as IProcess | undefined,
			diagram: isSimulationOver ? this.ganttDiagram.map(proc => { return { ...proc } }) : []
		}

		if (isSimulationOver)
			return state

		if (this.readyProcesses > 0) {
			if (this.algorithm === 'sjf')
				this.sortByBurst(first ? 0 : 1)
			else if (this.algorithm === 'srtf')
				this.sortByBurst(0)

			if (this.readyProcesses > 1)
				state.waiting = this.waitingProcesses

			const firstProcessFinished = this.processes[0].burst === 0

			const conditionsToShift = [
				(this.algorithm === 'rr' && (this.quantum === 0 || firstProcessFinished)),
				firstProcessFinished
			]

			if (conditionsToShift.includes(true)) {
				this.shiftProcess(this.algorithm)
				this.quantum = this.initialQuantum
				state.timeout = 0
			} else {
				state.executing = this.executeProcess()
				this.quantum--
			}
		} else
			this.extendSimulation()

		return state
	}

	updateReadyProcesses() {
		for (let i = 0; i < this.processes.length; i++) {
			if (this.processes[i].arrival === this.timePassed) {
				if (!this.processes[i].ready)
					this.readyProcesses++

				this.processes[i].ready = true
			}
		}
	}

	sortByBurst(start: number = 0) {
		if (start > this.processes.length)
			return

		for (let i = start; i < this.processes.length; i++)
			for (let j = start; j < this.processes.length; j++)
				if (i !== j) {
					const p1 = this.processes[i]
					const p2 = this.processes[j]

					if (p1.burst < p2.burst && p1.ready && p2.ready)
						[this.processes[i], this.processes[j]] = [this.processes[j], this.processes[i]]
				}
	}

	get waitingProcesses() {
		return this.processes.filter((proc, index) => proc.ready && index > 0)
	}

	shiftProcess(algorithm: string = '') {
		let auxProcess = this.processes.shift()

		if (algorithm === 'rr' && auxProcess && auxProcess.burst > 0)
			this.processes.push(auxProcess)
		else
			this.readyProcesses--
	}

	executeProcess() {
		this.processes[0].burst--
		this.timePassed++
		this.ganttDiagram.push({ id: this.processes[0].id, color: this.processes[0].color })
		return { ...this.processes[0] }
	}

	extendSimulation() {
		this.totalBurst++
		this.timePassed++
		this.ganttDiagram.push({ id: 'X', color: '#ffffff' })
	}
}