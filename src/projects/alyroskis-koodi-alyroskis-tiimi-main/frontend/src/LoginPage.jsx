import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/login", {
                email,
                password,
            });
           
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        id="email" 
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        id="password" 
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p>{error}</p>}
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;