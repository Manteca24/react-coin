import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css'

function Home() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }
        return response.json();
      })
      .then(data => setCoins(data.data)) 
      .catch(error => setError(error.message)); 
  }, []);

  return (
    <>
      <h2>Tipos de criptomonedas</h2>
      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}
      {coins && (
        <ul className="coinsList">
          {coins.map(coin => (
            <li key={coin.id} className="coinsListElement">
              <Link to={`/coin/${coin.id}`} className='link'>{coin.name}</Link>
            </li>
          ))}
        </ul>
      )} 
      
    </>
  );
}

export default Home;