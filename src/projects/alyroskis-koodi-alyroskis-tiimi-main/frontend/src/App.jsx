import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import Users from "./Users";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
        		<Route path="/users" element={<Users />} />
			</Routes>
		</Router>
	);
}

export default App;
