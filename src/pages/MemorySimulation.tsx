import { FormEvent, useState } from "react"

import { useMemory } from '../hooks/MemoryHook'
import { toNumber } from '../utils/simulation'
import { useAlert } from '../contexts/AlertContext'

export function MemorySimulation() {
	const { memory, processes, remove, allocate, startSimulation, generateRandom } = useMemory()
	const { show: showAlert } = useAlert()

	const [algorithm, setAlgorithm] = useState('')
	const [memorySize, setMemorySize] = useState(10)
	const [processSize, setProcessSize] = useState(1)
	const [color, setColor] = useState('#2A9D8F')
	const [processNumber, setProcessNumber] = useState(0)

	function handleAllocateProcessFormSubmit(event: FormEvent) {
		event.preventDefault()

		try {
			allocate(processSize, color)
			showAlert('success', 'Processo alocado.')
		} catch (err: any) {
			showAlert('danger', err.message)
		}
	}

	function handleRemoveProcessFormSubmit(event: FormEvent) {
		event.preventDefault()

		try {
			remove(processNumber)
			showAlert('success', 'Processo removido.')
		} catch (err: any) {
			showAlert('warning', err.message)
		}
	}

	function renderMemory() {
		let rows: JSX.Element[] = [], cells: JSX.Element[] = []
		let x = 0

		processes.forEach(proc => {
			cells.push(<td key={x}>
				<div className={'p-1 text-center text-light'} style={{ backgroundColor: proc.color }}>
					{ proc.id }
				</div>
			</td>)

			if (cells.length === 10) {
				rows.push(<tr key={rows.length}>{ cells }</tr>)
				cells = []
			}

			x++
		})

		rows.push(<tr key={rows.length}>{ cells }</tr>)
		return rows
	}

	function handleMemoryFormSubmit(event: FormEvent) {
		event.preventDefault()

		try {
			startSimulation(algorithm, memorySize)
			showAlert('success', 'Simulação iniciada.')
		} catch (err) {
			showAlert('danger', 'Parâmetro(s) inválido(s)')
		}
	}

	function randomizeProcesses() {
		try {
			generateRandom()

			if (processes.length > 0)
				showAlert('warning', 'Os processos existentes não serão sobrepostos.')
		} catch (err: any) {
			showAlert('danger', err.message)
		}
	}

	return (
		<div className="container-fluid">
			<form onSubmit={handleMemoryFormSubmit}>
				<div className="row p-3">
					<div className="col-lg-4 form-group">
						<b><label htmlFor="algorithm">Algoritmo:</label></b>

						<select
							id="algorithm"
							value={algorithm}
							onChange={event => setAlgorithm(event.target.value)}
							className="form-control"
							required
						>
							<option value="" disabled>Selecione um algoritmo</option>
							<option value="ff">First-fit</option>
							<option value="bf">Best-fit</option>
							<option value="wf">Worst-fit</option>
						</select>
					</div>

					<div className="col-lg-4 form-group">
						<b><label htmlFor="memorySize">Tamanho da Memória (KB):</label></b>

						<input
							id="memorySize"
							type="number"
							className="form-control"
							min={10}
							max={256}
							value={memorySize}
							onChange={event => setMemorySize(toNumber(event.target.value, 10))}
							required
						/>
					</div>

					<div className="col-lg-4 form-group">
						<button className="btn btn-block bg-grey btn-sm" type="submit" disabled={!!memory}>
							Criar Memória
						</button>

						<button
							className="btn btn-block bg-green btn-sm"
							type="button"
							onClick={randomizeProcesses}
						>Gerar Processos Aleatórios</button>
					</div>
				</div>
			</form>

			{ memory && <>
				<div className="row p-3 hidden">
					<div className="col">
						<h5><b>Memória</b></h5>
						<div className="table-responsive">
							<table className="table table-bordered">
								<tbody>{ renderMemory() }</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className="row p-3">
					<div className="col-lg-6 hidden py-3">
						<h5><b>Novo Processo</b></h5>

						<form onSubmit={handleAllocateProcessFormSubmit}>
							<div className="row">
								<div className="col-md-6 mb-3">
									<label htmlFor="size">Tamanho (KB):</label>
									<input
										type="number"
										id="size"
										value={processSize}
										onChange={event => setProcessSize(toNumber(event.target.value, 1))}
										className="form-control"
										min={1}
										required
									/>
								</div>

								<div className="col-md-6 mb-3">
									<label htmlFor="color">Cor:</label>
									<input
										type="color"
										id="color"
										value={color}
										onChange={event => setColor(event.target.value)}
										className="form-control"
										min={1}
										required
									/>
								</div>
							</div>

							<button className="btn btn-block bg-orange" type="submit">Alocar Processo</button>
						</form>
					</div>

					<div className="col-lg-6 hidden py-3">
						<h5><b>Remover Processo</b></h5>

						<form onSubmit={handleRemoveProcessFormSubmit}>
							<label htmlFor="pid">Número do Processo:</label>
							<input
								type="number"
								id="pid"
								value={processNumber}
								onChange={event => setProcessNumber(toNumber(event.target.value, 0))}
								className="form-control"
								min={0}
								required
							/><br />
							<button className="btn btn-block bg-red" type="submit">Remover Processo</button>
						</form>
					</div>
				</div>
			</> }
		</div>
	)
}
