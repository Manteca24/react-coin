import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (storedFavorites.length) {
      fetch("https://api.coincap.io/v2/assets")
        .then(response => response.json())
        .then(data => {
          const favoriteCoins = data.data.filter(coin => storedFavorites.includes(coin.id));
          setFavorites(favoriteCoins);
        });
    }
  }, []);

  return (
    <div>
      <h1>Favoritos</h1>
      {favorites.length > 0 ? (
        <ul className="coinsList">
          {favorites.map(coin => (
            <li key={coin.id} className="coinsListElement">
              <Link to={`/coin/${coin.id}`} className='link'>{coin.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes criptomonedas favoritas.</p>
      )}
    </div>
  );
}

export default Favorites;