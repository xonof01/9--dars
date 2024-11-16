import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { UniContext } from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<UniContext>
			<App />
		</UniContext>
	</BrowserRouter>
)