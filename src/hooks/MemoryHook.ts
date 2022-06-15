import { useState } from "react"

import { Memory } from '../classes/Memory'
import { IProcess } from '../classes/Process'

export function useMemory() {
	const [memory, setMemory] = useState<Memory>()
	const [processes, setProcesses] = useState<IProcess[]>([])

	function startSimulation(algorithm: string, size: number) {
		try {
			const memoryAux = new Memory(size, algorithm)
			setProcesses(memoryAux.currentProcessesState)
			setMemory(memoryAux)
		} catch (err: any) {
			throw err
		}
	}

	function generateRandom() {
		if (memory) {
			memory.randomize()
			setProcesses(memory.currentProcessesState)
		}
	}

	function allocate(size: number, color: string) {
		if (memory) {
			memory.allocate(size, color)
			setProcesses(memory.currentProcessesState)
		}
	}

	function remove(processNumber: number) {
		if (memory) {
			memory.deallocate(processNumber)
			setProcesses(memory.currentProcessesState)
		}
	}

	return { memory, processes, startSimulation, generateRandom, allocate, remove }
}