// App.js
import { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [playerPosition, setPlayerPosition] = useState(50);
  const [aliens, setAliens] = useState([]);
  const [lasers, setLasers] = useState([]);
  const [bombs, setBombs] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize aliens
  useEffect(() => {
    if (!gameStarted) return;
    
    const initialAliens = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        initialAliens.push({
          id: `${row}-${col}`,
          x: col * 30 + 20,
          y: row * 30 + 20,
          alive: true
        });
      }
    }
    setAliens(initialAliens);
  }, [gameStarted]);

  // Handle keyboard input
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && playerPosition > 0) {
        setPlayerPosition(prev => prev - 5);
      } else if (e.key === 'ArrowRight' && playerPosition < 95) {
        setPlayerPosition(prev => prev + 5);
      } else if (e.key === ' ') {
        // Fire laser
        setLasers(prev => [...prev, { x: playerPosition + 2.5, y: 90 }]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition, gameStarted, gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      // Move aliens
      setAliens(prev => {
        const shouldMoveDown = prev.some(alien => 
          (alien.x >= 95 && alien.alive) || (alien.x <= 5 && alien.alive)
        );
        
        return prev.map(alien => ({
          ...alien,
          x: shouldMoveDown ? alien.x : alien.x + (alien.x >= 95 ? -1 : 1),
          y: shouldMoveDown ? alien.y + 5 : alien.y
        }));
      });

      // Move lasers
      setLasers(prev => 
        prev.map(laser => ({ ...laser, y: laser.y - 5 }))
        .filter(laser => laser.y > 0)
      );

      // Random alien bombs
      if (Math.random() < 0.02) {
        const aliveAliens = aliens.filter(alien => alien.alive);
        if (aliveAliens.length > 0) {
          const randomAlien = aliveAliens[Math.floor(Math.random() * aliveAliens.length)];
          setBombs(prev => [...prev, { x: randomAlien.x + 5, y: randomAlien.y + 10 }]);
        }
      }

      // Move bombs
      setBombs(prev => 
        prev.map(bomb => ({ ...bomb, y: bomb.y + 3 }))
        .filter(bomb => bomb.y < 100)
      );

      // Check collisions
      checkCollisions();
      checkGameOver();
    }, 200);

    return () => clearInterval(gameLoop);
  }, [aliens, gameStarted, gameOver]);

  const checkCollisions = useCallback(() => {
    // Laser hits alien
    setLasers(prevLasers => {
      const newLasers = [...prevLasers];
      const hitAliens = new Set();

      setAliens(prevAliens => {
        return prevAliens.map(alien => {
          if (!alien.alive) return alien;
          
          for (let i = 0; i < newLasers.length; i++) {
            const laser = newLasers[i];
            if (
              laser.x >= alien.x && 
              laser.x <= alien.x + 10 && 
              laser.y >= alien.y && 
              laser.y <= alien.y + 10
            ) {
              hitAliens.add(alien.id);
              newLasers.splice(i, 1);
              setScore(prev => prev + 10);
              return { ...alien, alive: false };
            }
          }
          return alien;
        });
      });

      return newLasers;
    });

    // Bomb hits player
    setBombs(prevBombs => {
      const newBombs = [...prevBombs];
      
      for (let i = 0; i < newBombs.length; i++) {
        const bomb = newBombs[i];
        if (
          bomb.x >= playerPosition && 
          bomb.x <= playerPosition + 5 && 
          bomb.y >= 90 && 
          bomb.y <= 95
        ) {
          newBombs.splice(i, 1);
          setLives(prev => prev - 1);
          break;
        }
      }
      
      return newBombs;
    });
  }, [playerPosition]);

  const checkGameOver = useCallback(() => {
    // Aliens reach bottom
    const aliensReachedBottom = aliens.some(alien => alien.alive && alien.y >= 85);
    // All aliens destroyed
    const allAliensDead = aliens.every(alien => !alien.alive);
    // No lives left
    const noLivesLeft = lives <= 0;

    if (aliensReachedBottom || noLivesLeft) {
      setGameOver(true);
    } else if (allAliensDead) {
      // Level complete - could add level progression here
      setGameOver(true);
    }
  }, [aliens, lives]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setPlayerPosition(50);
    setLasers([]);
    setBombs([]);
  };

  return (
    <div className="App">
      <h1>Space Invaders</h1>
      
      {!gameStarted ? (
        <div className="start-screen">
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <>
          <div className="game-info">
            <p>Score: {score}</p>
            <p>Lives: {lives}</p>
          </div>
          
          {gameOver && (
            <div className="game-over">
              <h2>Game Over</h2>
              <p>Final Score: {score}</p>
              <button onClick={startGame}>Play Again</button>
            </div>
          )}
          
          <div className="game-container">
            {/* Player */}
            <div 
              className="player" 
              style={{ left: `${playerPosition}%` }}
            />
            
            {/* Lasers */}
            {lasers.map((laser, index) => (
              <div 
                key={index} 
                className="laser" 
                style={{ left: `${laser.x}%`, bottom: `${100 - laser.y}%` }}
              />
            ))}
            
            {/* Bombs */}
            {bombs.map((bomb, index) => (
              <div 
                key={index} 
                className="bomb" 
                style={{ left: `${bomb.x}%`, bottom: `${100 - bomb.y}%` }}
              />
            ))}
            
            {/* Aliens */}
            {aliens.map(alien => alien.alive && (
              <div 
                key={alien.id} 
                className="alien" 
                style={{ left: `${alien.x}%`, top: `${alien.y}%` }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;