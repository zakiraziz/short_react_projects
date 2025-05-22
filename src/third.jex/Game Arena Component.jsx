const GameArena = ({ player, invaders, bullets, gameOver }) => {
  return (
    <div className="game-arena">
      {/* Player spaceship */}
      <div 
        className="player" 
        style={{ left: `${player.x}px`, bottom: `${player.y}px` }}
      />
      
      {/* Invaders */}
      {invaders.map((invader, index) => (
        !invader.destroyed && (
          <div 
            key={index}
            className="invader"
            style={{ left: `${invader.x}px`, top: `${invader.y}px` }}
          />
        )
      ))}
      
      {/* Bullets */}
      {bullets.map((bullet, index) => (
        <div
          key={index}
          className="bullet"
          style={{ left: `${bullet.x}px`, bottom: `${bullet.y}px` }}
        />
      ))}
      
      {gameOver && <div className="game-over">GAME OVER</div>}
    </div>
  );
};