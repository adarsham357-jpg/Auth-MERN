import { useState } from 'react';
import API from '../api';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await API.post('/register', form);

      setSuccess("Registration successful!");
      setForm({ name: '', email: '', password: '' });

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <br />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <br />

      <input
        type={show ? "text" : "password"}
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />

      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"}
      </button>

      <br />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
}

export default Register;