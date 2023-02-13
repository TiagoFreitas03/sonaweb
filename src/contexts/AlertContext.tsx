import { createContext, ReactNode, useContext, useState } from 'react'

type TAlertTypes = 'success' | 'danger' | 'warning'

interface IContextProviderProps {
	children: ReactNode
}

interface IAlertContextData {
	show: (type: TAlertTypes, title: string, message?: string) => void
}

const AlertContext = createContext({} as IAlertContextData)

export function AlertContextProvider({ children }: IContextProviderProps) {
	const [Alert, setAlert] = useState<JSX.Element>()

	function show(type: TAlertTypes, title: string, message?: string) {
		const alertElement = (
			<div className={`alert alert-${type} alert-dismissible`}>
				<button type="button" className="close" onClick={() => setAlert(undefined)}>
					&times;
				</button>

				<strong>{title}</strong><br />

				<span>{message}</span>
			</div>
		)

		setAlert(alertElement)
	}

	return (
		<AlertContext.Provider value={{ show }}>
			{ Alert }
			{ children }
		</AlertContext.Provider>
	)
}

export const useAlert = () => useContext(AlertContext)
