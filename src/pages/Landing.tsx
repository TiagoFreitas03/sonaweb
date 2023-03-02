import { ReactNode } from "react"
import clsx from 'clsx'

interface RowProps {
	children: ReactNode
	bgGray?: boolean
}

function Row({ children, bgGray = false }: RowProps) {
	return (
		<div className={clsx("row px-4", { 'bg-light-grey': bgGray })}>
			<div className="col-lg-10 mx-auto">
				<div className="row p-4">
					{ children }
				</div>
			</div>
		</div>
	)
}

export function Landing() {
	return (
		<div className="container-fluid mt-4">
			<Row>
				<div className="col-md-8 pb-3">
					<h3>
						<b>O SOnaWeb ajuda você a simular algumas das principais funcionalidades
						de um Sistema Operacional, a partir de cenários que você mesmo pode montar</b>
					</h3>
				</div>

				<div className="col-md-4 px-2 py-3 text-center my-auto">
					<i className="fas fa-laptop-code fa-10x text-grey"></i>
				</div>
			</Row>

			<Row bgGray>
				<div className="col-md-9 py-4">
					<h4><b>Escalonamento de CPU</b></h4>

					<p>Faça simulações utilizando os algoritmos: FCFS (First Come, First Served),
						SJF (Shortest Job First), SRTF (Shortest Remaining Time First) e RR (Round Robin).</p>
				</div>

				<div className="col-md-3 my-auto text-center py-4">
					<i className="fas fa-microchip fa-5x text-green"></i>
				</div>
			</Row>

			<Row>
				<div className="col-md-9 py-4">
					<h4><b>Alocação de Memória</b></h4>

					<p>Veja como ocorre a alocação de processos na memória
						utilizando os algoritmos: First-fit, Best-fit e Worst-fit.</p>
				</div>

				<div className="col-md-3 my-auto text-center py-4">
					<i className="fas fa-memory fa-5x text-red"></i>
				</div>
			</Row>
		</div>
	)
}
