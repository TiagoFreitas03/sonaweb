export interface IProcess {
	id: string
	color: string
}

export interface ISchedulingProcess extends IProcess {
	burst: number
	arrival: number
	ready: boolean
}

export interface IMemoryProcess extends IProcess {
	size: number
}