import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/Coin.css'

function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(id));
  }, [id]);

  useEffect(() => {
    fetch(`https://api.coincap.io/v2/assets/${id}`)
      .then(response => response.json())
      .then(data => setCoin(data.data));
  }, [id]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(favId => favId !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };

  return (
  <>
  {coin && (
    <>
      <div className="coinCard">
      <h3>{coin.name}</h3>
      <p>Precio: {parseFloat(coin.priceUsd).toFixed(2)} USD </p>
      <p>Market Cap: {parseFloat(coin.marketCapUsd).toFixed(2)} USD </p>
      <p>Volume: {parseFloat(coin.volumeUsd24Hr).toFixed(2)} USD </p>
      <button onClick={handleFavorite}>
        {isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
      </button>
      </div>
    </>
  )}
  </>
  )
}

export default Coin;