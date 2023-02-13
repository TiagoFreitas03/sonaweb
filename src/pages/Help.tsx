import {
	schedulingParams, schedulingSimulation, ganttDiagram, memoryParams, memoryEmpty, memoryForms
} from '../images'

interface INavItemProps {
	active?: boolean
	tabId: string
	text: string
}

export function Help() {
	const NavItem = ({ active, tabId, text }: INavItemProps) => {
		return (
			<li className="nav-item">
				<a
					className={`nav-link text-dark ${active && 'active'}`}
					data-toggle="tab"
					href={`#${tabId}`}
				>{text}</a>
			</li>
		)
	}

	return (
		<div className="container mt-4">
			<h1>Ajuda com as simulações</h1><br />

			<ul className="nav nav-tabs" role="tablist">
				<NavItem active={true} tabId='scheduling' text='Escalonamento de CPU' />
				<NavItem active={false} tabId='memory' text='Alocação de Memória' />
			</ul>

			<div className="tab-content help">
				<div id="scheduling" className="container tab-pane p-3 active">
					<h3>Escalonamento de CPU</h3>

					<p>Na simulação do escalonamento de CPU é necessário escolher o algoritmo, informar o
						nº de processos, e definir o tempo de burst e de chegada de cada um, como abaixo:</p>

					<img src={schedulingParams} alt="Parâmetros Escalonamento de CPU"/>

					<p>Após configurar os parâmetros e iniciar a simulação, os processos são organizados
						pela chegada, e seguem as regras do algoritmo selecionado durante a simulação.
						No início da simulação, o tempo decorrido é 0. Quando houver processos prontos, o 1º
						é exibido no quadro "Execução", e o restante no quadro "Fila de Espera":</p>

					<img src={schedulingSimulation} alt="Simulação Escalonamento CPU"/>

					<p>A cada segundo, o tempo de burst do processo em execução é decrementado em 1 (até que
						chegue a 0), enquanto o tempo decorrido da simulação é incrementado em 1. Quando o
						burst do processo em execução chega a 0, ele é substituído pelo 1º processo na fila de
						espera. Esse ciclo se repete até que todos os processos terminem suas execuções.</p>

					<p>Ao final da simulação, é exibido o Diagrama de Gantt, com a ordem dos processos
						executados, sendo que cada quadrado do diagrama representa um segundo da simulação:</p>

					<img src={ganttDiagram} alt="Exemplo de Diagrama de Gantt" />
				</div>

				<div id="memory" className="container tab-pane p-3">
					<h3>Alocação de Memória</h3>

					<p>Na simulação de alocação de memória, é necessário selecionar o algoritmo de alocação,
						e o tamanho da memória (em KB), como pode ser visto abaixo:</p>

					<img src={memoryParams} alt="Parâmetros Alocação de Memória"/>

					<p>Ao criar a memória será exibida uma tabela vazia simulando os espaços da memória:</p>

					<img src={memoryEmpty} alt="Memória vazia"/>

					<p><b>Observação:</b> A memória deveria ser simulada como uma linha contínua de	espaços,
						mas como o tamanho da memória pode ser até 256, as linhas da tabela são quebradas a
						cada 10 espaços, sendo que a linha de baixo é continuação da linha de cima.</p>

					<p>A opção "Gerar processos aleatórios" pode ser utilizada apenas uma vez na simulação,
						para que sejam criados alguns processos de tamanhos e posições aleatórias na memória.
						Esta opção não sobrepõe os processos que já estiverem na memória.</p>

					<p>Nesta simulação é possível alocar novos processos (informando seu tamanho e cor), ou
						remover processos existentes (informando seu número):</p>

					<img src={memoryForms} alt="Formulários de alocação e remoção"/>

					<p>Ao alocar um processo, o sistema usa o algoritmo selecionado no começo da simulação
						para definir onde ele será alocado, caso haja espaço. E ao remover um processo, os
						espaços que este ocupava voltam a ficar em branco.</p>
				</div>
			</div>
		</div>
	)
}
