import Header from './partials/Header';

import { Routes, Route, BrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import SchedulePage from './pages/SchedulePage';
import LoginPage from './pages/LoginPage';
import AddSchedulePage from './pages/AddSchedulePage';
import { useState } from 'react';

function App() {
	const [login, setLogin] = useState(getLogin());

	function saveLogin(status) {
		localStorage.setItem('login', JSON.stringify(status));
		setLogin(status);
	}
	
	function getLogin() {
		const tokenString = localStorage.getItem('login');
		const userToken = JSON.parse(tokenString);
		return userToken;
	}

	function logout() {
		localStorage.removeItem('login');
		setLogin(null);
	}

	if (!Boolean(login)) {
		return <LoginPage setLogin={saveLogin} />
	}

	return (
		<div className="App">
			<BrowserRouter>
				<Header logout={logout}/>

				<Routes>
					<Route path="/" exact />
					<Route path="/dashboard/" element={<DashboardPage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/schedule/:computerId/:id" element={<SchedulePage />} />
					<Route path="/schedules/:computerId/add" element={<AddSchedulePage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
