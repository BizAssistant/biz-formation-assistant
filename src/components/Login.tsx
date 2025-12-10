// src/components/Login.tsx
import { useState } from "react";
import { api } from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const res = await api.login(email, password);
    if (res.success) {
      setMessage("Logged in! Redirecting...");
      setTimeout(() => window.location.reload(), 1000);
    } else {
      setMessage(res.error || "Login failed");
    }
  };

  const handleRegister = async () => {
    const res = await api.register(email, password);
    if (res.success) {
      setMessage("Account created! Now log in.");
    } else {
      setMessage(res.error || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
}
