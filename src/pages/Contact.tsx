import { useState, FormEvent } from 'react'

import { useAlert } from '../contexts/AlertContext'

export function Contact() {
	const { show: showAlert } = useAlert()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	//const [error, setError] = useState<any>({})

	async function handleContactFormSubmit(event: FormEvent) {
		event.preventDefault()

		//mailer.execute('tiago.freitas.faria@gmail.com', 'Contato SOnaWeb', { name, email, message })

		showAlert('success', 'Tudo certo!', 'Sua mensagem foi enviada.')

		setTimeout(() => { window.location.reload() }, 1500)
	}

	return (
		<div className="container mt-4">
			<h1>Entre em contato!</h1><br />
			<h4>Envie sua sugestão, dúvida ou reclamação.</h4><br />

			<form className="row mb-3" onSubmit={handleContactFormSubmit}>
				<div className="col-md-6 col-12 form-group">
					<label htmlFor="name">Nome:</label>

					<input
						id="name"
						type="text"
						className="form-control"
						value={name}
						onChange={(event) => setName(event.target.value)}
						required
					/>

					{/*<span className="text-danger">{ error.name }</span><br />*/}
				</div>

				<div className="col-md-6 col-12 form-group">
					<label htmlFor="email">E-mail:</label>

					<input
						id="email"
						type="email"
						className="form-control"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>

					{/*<span className="text-danger">{ error.email }</span><br />*/}
				</div>

				<div className="col-12 form-group">
					<label htmlFor="message">Mensagem:</label>

					<textarea
						id="message"
						className="form-control"
						value={message}
						onChange={(event) => setMessage(event.target.value)}
						rows={5}
						required
					></textarea>

					{/*<span className="text-danger error">{ error.comment }</span><br />*/}
				</div>

				<button type="submit" className="btn btn-block bg-grey mx-3">Enviar</button>
			</form>
		</div>
	)
}