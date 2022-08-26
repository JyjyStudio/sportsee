import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import './utils/style/index.css'
import Navbar from './Components/Navbar';
import Home from './pages/Home'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Navbar/>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
  </React.StrictMode>
)
