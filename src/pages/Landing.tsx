export function Landing() {
	return (
		<div className="container-fluid mt-4">
			<div className="row p-4">
				<div className="col-md-8 p-2">
					<h3>
						<b>O SOnaWeb ajuda você a simular algumas das principais funcionalidades
						de um Sistema Operacional, a partir de cenários que você mesmo pode montar</b>
					</h3>
				</div>

				<div className="col-md-4 p-2 text-center">
					<i className="fas fa-laptop-code fa-10x text-grey"></i>
				</div>
			</div>

			<div className="row p-5 bg-light-grey my-3">
				<div className="col-md-9">
					<h4><b>Escalonamento de CPU</b></h4>

					<p>Faça simulações utilizando os algoritmos: FCFS (First Come, First Served),
						SJF (Shortest Job First), SRTF (Shortest Remaining Time First) e RR (Round Robin).</p>
				</div>

				<div className="col-md-3 my-auto text-center">
					<i className="fas fa-microchip fa-5x text-green"></i>
				</div>
			</div>

			<div className="row p-5 my-3">
				<div className="col-md-9">
					<h4><b>Alocação de Memória</b></h4>

					<p>Veja como ocorre a alocação de processos na memória
						utilizando os algoritmos: First-fit, Best-fit e Worst-fit.</p>
				</div>

				<div className="col-md-3 my-auto text-center">
					<i className="fas fa-memory fa-5x text-red"></i>
				</div>
			</div>
		</div>
	)
}
