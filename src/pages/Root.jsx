import { Link, Outlet } from "react-router-dom";
import '../styles/Root.css'

function Root() {
  return (
    <>
      <h1>Crypto React</h1>
      <nav>
        <Link to="/" className='link'>Home</Link>
        <Link to="/favorites" className='link'>Favorites</Link>
      </nav>
        <Outlet />
    </>
  );
}

export default Root;