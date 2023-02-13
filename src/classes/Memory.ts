import * as yup from 'yup'

import { IProcess, IMemoryProcess } from './Process'

export class Memory {
	private algorithm: string
	private processes: IProcess[]
	private current: number
	private randomized: boolean

	constructor (size: number, algorithm: string) {
		const schema = yup.object().shape({
			size: yup.number().required().min(10).max(256),
			algorithm: yup.string().required().oneOf(['ff', 'bf', 'wf'])
		})

		schema.validateSync({ size, algorithm }, { abortEarly: false })

		this.algorithm = algorithm
		this.current = 0
		this.randomized = false
		this.processes = Array.from({ length: size }, () => { return { id: '', color: 'white' } })
	}

	get currentProcessesState() {
		return this.processes.map(proc => { return { ...proc } })
	}

	allocate(size: number, color: string) {
		const schema = yup.object().shape({
			size: yup.number().required().min(1).max(256),
			color: yup.string().required().matches(/^#([0-9A-F]{3}){1,2}$/i)
		})

		schema.validateSync({ size, color }, { abortEarly: false })

		const proc: IMemoryProcess = { id: `P${this.current}`, color, size: Math.floor(size) }
		const { freeSpaces, freeSizes } = this.freeSpacesAndSizes(size)
		let base = -1

		if (freeSpaces.length === 0)
			throw new Error('Não há espaço suficiente.')

		switch (this.algorithm) {
			case 'ff':
				base = freeSpaces[0].base
				break
			case 'bf':
				base = freeSpaces[freeSizes.indexOf(Math.min(...freeSizes))].base
				break
			case 'wf':
				base = freeSpaces[freeSizes.indexOf(Math.max(...freeSizes))].base
				break
			default:
				throw new Error('Algoritmo inválido.')
		}

		if (base === -1)
			throw new Error('Ocorreu um erro ao alocar o processo.')

		for (let i = base; i < proc.size + base; i++)
			this.processes[i] = { ...proc }

		this.current++
	}

	private freeSpacesAndSizes(requiredSize: number) {
		const freeSpaces = [{ size: 0, base: -1 }]

		this.processes.forEach((p, index) => {
			const current = freeSpaces.length - 1

			if (p.id === '') {
				freeSpaces[current].size++

				if (freeSpaces[current].base === -1)
					freeSpaces[current].base = index
			} else
				freeSpaces.push({ size: 0, base: -1 })
		})

		const freeSizes = freeSpaces.map(space => space.size)

		return {
			freeSpaces: freeSpaces.filter(space => space.size >= requiredSize),
			freeSizes: freeSizes.filter(size => size >= requiredSize),
		}
	}

	deallocate(procNumber: number) {
		if (isNaN(procNumber) || procNumber < 0 || procNumber > this.current)
			throw new Error('Processo inválido.')

		const pid = `P${procNumber}`
		let indexes = this.processes.map((p, i) => p.id === pid ? i : -1).filter(value => value > -1)

		if (indexes.length === 0)
			throw new Error('Processo não encontrado.')

		indexes.forEach(index => this.processes[index] = { id: '', color: 'white' })
	}

	randomize() {
		if (this.randomized)
			throw new Error('Você já gerou processos aleatórios')

		this.randomized = true
		const tenth = Math.floor(this.processes.length / 10)
		const randomProcessesNumber = Math.floor(Math.random() * 5) + 1

		for (let i = 0; i < randomProcessesNumber; i++) {
			const randomSize = (Math.floor(Math.random() * tenth)) + 1
			const randomBase = (Math.floor(Math.random() * this.processes.length))
			const proc: IMemoryProcess = { id: `P${this.current}`, color: 'black', size: randomSize }
			this.current++

			for (let j = 0; j < randomSize; j++) {
				if ((randomBase + j) < this.processes.length && this.processes[randomBase + j].id === '')
					this.processes[randomBase + j] = { ...proc }
				else
					break
			}
		}
	}
}
