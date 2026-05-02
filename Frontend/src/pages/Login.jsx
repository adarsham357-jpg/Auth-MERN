import { useState } from 'react';
import API from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await API.post('/login', { email, password });

      localStorage.setItem('token', res.data.token);

      window.location = '/dashboard';

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <br />

      <input
        type={show ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"}
      </button>

      <br />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default Login;