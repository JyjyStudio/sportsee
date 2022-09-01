import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { ViewportProvider } from './utils/Context/ViewportContext'
import './utils/style/index.css'
import Navbar from './Components/Navbar';
import Home from './pages/Home'
import Stats from './pages/Stats';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<ViewportProvider>
				<Navbar/>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/user/:id" element={<Stats />} />
				</Routes>
			</ViewportProvider>
		</BrowserRouter>
  </React.StrictMode>
)
