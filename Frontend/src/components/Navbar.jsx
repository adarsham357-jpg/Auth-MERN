import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      background: "#333",
      color: "#fff"
    }}>
      <h3>MERN App</h3>

      <div>
        {!token ? (
          <>
            <Link to="/" style={{color: "#fff", marginRight: "10px"}}>Login</Link>
            <Link to="/register" style={{color: "#fff"}}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={{color: "#fff", marginRight: "10px"}}>Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;