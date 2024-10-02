import React from "react";

function GameResults({ games }) {
    return (
      <div className="game-results">
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className="game-item">
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron juegos</p>
        )}
      </div>
    );
  }
export default GameResults;  