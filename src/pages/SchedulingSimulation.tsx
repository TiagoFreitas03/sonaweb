import { FormEvent, useState } from 'react'

import { useScheduling } from '../hooks/SchedulingHook'
import { toNumber } from '../utils/simulation'
import { ISchedulingProcess } from '../classes/Process'
import { useAlert } from '../contexts/AlertContext'

export function SchedulingSimulation() {
	const { started, executing, waiting, time, ganttDiagram, startSimulation } = useScheduling()
	const { show: showAlert } = useAlert()

	const [algorithm, setAlgorithm] = useState('')
	const [processes, setProcesses] = useState<ISchedulingProcess[]>([])
	const [quantum, setQuantum] = useState(1)

	function handleSchedulingFormSubmit(event: FormEvent) {
		event.preventDefault()

		if (started)
			return showAlert('warning', 'Espere a simulação terminar para começar outra.')

		try {
			const bursts = processes.map(proc => proc.burst)
			const arrivals = processes.map(proc => proc.arrival)

			startSimulation(algorithm, [bursts, arrivals], quantum)
			showAlert('success', 'Simulação iniciada.')
		} catch (err: any) {
			showAlert('danger', 'Parâmetro(s) inválido(s).')
		}
	}

	function addProcess() {
		if (processes.length < 5) {
			const procNumber = processes.length
			const auxProcesses = processes.slice()

			auxProcesses.push({ id: `P${procNumber}`, color: '', burst: 1, arrival: 0, ready: false })
			setProcesses(auxProcesses)
		}
	}

	function removeProcess() {
		if (processes.length > 0) {
			const auxProcesses = processes.slice()
			auxProcesses.splice(processes.length - 1, 1)
			setProcesses(auxProcesses)
		}
	}

	return (
		<div className="container-fluid">
			<form onSubmit={handleSchedulingFormSubmit}>
				<div className="row pt-3 px-3">
					<div className="col-7 form-group">
						<b><label htmlFor="algorithm">Algoritmo:</label></b>
						<select
							id="algorithm"
							className="form-control"
							value={algorithm}
							onChange={event => setAlgorithm(event.target.value)}
							required
						>
							<option value="" disabled>Selecione um algoritmo</option>
							<option value="fcfs">FCFS - First Come, First Served</option>
							<option value="sjf">SJF - Shortest Job First</option>
							<option value="srtf">SRTF - Shortest Remaining Time First</option>
							<option value="rr">RR - Round Robin</option>
						</select>
					</div>

					<div className="col-5 form-group">
						<b><label htmlFor="processesNumber">N° de Processos:</label></b>

						<div className="input-group mb-3">
							<div className="input-group-prepend">
								<button
									className="input-group-text bg-grey"
									onClick={removeProcess}
									type="button"
								><i className="fas fa-minus" />
								</button>
							</div>

							<input
								id="processesNumber"
								value={processes.length}
								className="form-control text-center"
								readOnly
								required
							/>

							<div className="input-group-append">
								<button className="input-group-text bg-grey" onClick={addProcess} type="button">
									<i className="fas fa-plus" />
								</button>
							</div>
						</div>
					</div>
				</div>

				{ processes.length > 0 && <>
					<div className="row">
						<div className="col-2 mt-5 text-right">
							{ processes.map(proc => <p key={proc.id}>{proc.id}</p>) }
						</div>

						<div className="col-5 form-group">
							<p><b>Tempo de burst</b></p>
							{ processes.map((proc, index) =>
								<input
									key={proc.id}
									type='number'
									min={1}
									className="form-control m-1"
									value={proc.burst}
									onChange={event => {
										const auxProcesses = processes.slice()
										auxProcesses[index].burst = toNumber(event.target.value, 1)
										setProcesses(auxProcesses)
									}}
									required
								/>
							) }
						</div>

						<div className="col-5 form-group">
							<p><b>Tempo chegada</b></p>
							{ processes.map((proc, index) =>
								<input
									key={proc.id}
									type='number'
									min={0}
									className="form-control m-1"
									value={proc.arrival}
									onChange={event => {
										const auxProcesses = processes.slice()
										auxProcesses[index].arrival = toNumber(event.target.value, 0)
										setProcesses(auxProcesses)
									}}
									required
								/>
							) }
						</div>
					</div>

					<div className="row p-1 justify-content-end">
						{ algorithm === 'rr' && <div className="col-md-6 px-2 mb-2">
							<div className="row">
								<div className="col-md-4 text-right pr-3">
									<label htmlFor="quantum">Quantum:</label>
								</div>

								<div className="col-md-8">
									<input
										id="quantum"
										className="form-control"
										type="number"
										min="1"
										value={quantum}
										onChange={event => setQuantum(toNumber(event.target.value, 1))}
									/>
								</div>
							</div>
						</div> }

						<div className="col-md-6 px-2">
							<button className="btn btn-block bg-grey" type="submit" disabled={started}>
								Iniciar Simulação
							</button>
						</div>
					</div>
				</> }
			</form>

			{ started && <>
				<div className="row px-3">
					<div className="col-sm-3 col-12 text-center">
						<p><b>Execução</b></p>
						<div className="border d-flex my-3">
							{ executing && <div
								className="mx-auto my-5 p-2 text-light"
								style={{ backgroundColor: executing.color }}
							>{ executing.id }</div> }
						</div>
					</div>

					<div className="col-sm-9 col-12 text-center my-auto">
						<p><b>Fila de Espera</b></p>
						<div className="border d-flex">
							{ waiting.map(proc => <div
								key={proc.id}
								className="my-3 mx-1 p-2 text-light"
								style={{ backgroundColor: proc.color }}
							>{ proc.id }</div>) }
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col text-center">
						<b><p>Tempo decorrido: { time }</p></b>
					</div>
				</div>
			</> }

			{ !started && ganttDiagram.length > 0 && <div className="row px-3">
				<div className="col text-center p-3">
					<p><b>Diagrama de Gantt</b></p>

					<div className="border pt-4 pb-2 table-responsive">
						<table className="table table-bordered">
							<tbody>
								<tr>
									{ ganttDiagram.map((proc, index) =>
										<td
											className="text-center sm-border text-light"
											key={index}
											style={{ backgroundColor: proc.color }}
										>{ proc.id }</td>
									) }
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div> }
		</div>
	)
}