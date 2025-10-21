import React, { useEffect, useRef, useState } from 'react';
import './GameArena.scss';

const GameArena = ({ 
  player, 
  invaders, 
  bullets, 
  enemyBullets = [],
  particles = [],
  powerUps = [],
  shields = [],
  gameOver, 
  score = 0,
  level = 1,
  lives = 3,
  onShieldHit,
  onPowerUpCollect
}) => {
  const arenaRef = useRef(null);
  const [explosions, setExplosions] = useState([]);
  const [screenShake, setScreenShake] = useState(0);

  // Add explosion effect when invader is destroyed
  useEffect(() => {
    const newExplosions = invaders
      .filter(invader => invader.justDestroyed)
      .map(invader => ({
        id: Math.random(),
        x: invader.x,
        y: invader.y,
        type: 'invader',
        size: invader.type === 'boss' ? 60 : 30
      }));
    
    if (newExplosions.length > 0) {
      setExplosions(prev => [...prev, ...newExplosions]);
      setScreenShake(5);
    }
  }, [invaders]);

  // Add screen shake effect
  useEffect(() => {
    if (screenShake > 0) {
      const timer = setTimeout(() => setScreenShake(0), 200);
      return () => clearTimeout(timer);
    }
  }, [screenShake]);

  // Remove explosions after animation
  useEffect(() => {
    const timer = setInterval(() => {
      setExplosions(prev => prev.filter(exp => Date.now() - exp.id > 500));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Get invader class based on type
  const getInvaderClass = (invader) => {
    let baseClass = 'invader';
    if (invader.type) baseClass += ` invader-${invader.type}`;
    if (invader.damaged) baseClass += ' damaged';
    return baseClass;
  };

  // Get player class based on state
  const getPlayerClass = () => {
    let baseClass = 'player';
    if (player.invulnerable) baseClass += ' invulnerable';
    if (player.poweredUp) baseClass += ' powered-up';
    return baseClass;
  };

  return (
    <div 
      className={`game-arena ${screenShake > 0 ? 'screen-shake' : ''} level-${level}`}
      ref={arenaRef}
      style={{
        '--shake-intensity': `${screenShake}px`
      }}
    >
      {/* Background Elements */}
      <div className="stars"></div>
      <div className="parallax-background"></div>
      
      {/* UI Overlay */}
      <div className="game-ui">
        <div className="score-display">SCORE: {score.toString().padStart(6, '0')}</div>
        <div className="level-display">LEVEL {level}</div>
        <div className="lives-display">
          {Array.from({ length: lives }).map((_, index) => (
            <div key={index} className="life-icon">🚀</div>
          ))}
        </div>
      </div>

      {/* Shields */}
      {shields.map((shield, index) => (
        <div
          key={index}
          className="shield"
          style={{ 
            left: `${shield.x}px`, 
            bottom: `${shield.y}px`,
            width: `${shield.width}px`,
            height: `${shield.height}px`,
            opacity: shield.health / 100
          }}
        />
      ))}
      
      {/* Player spaceship with enhanced styling */}
      <div 
        className={getPlayerClass()}
        style={{ 
          left: `${player.x}px`, 
          bottom: `${player.y}px`,
          transform: `translateX(-50%) rotate(${player.rotation || 0}deg)`
        }}
      >
        <div className="player-engine-effect"></div>
        {player.poweredUp && <div className="power-up-aura"></div>}
      </div>
      
      {/* Invaders with different types */}
      {invaders.map((invader, index) => (
        !invader.destroyed && (
          <div 
            key={`invader-${index}`}
            className={getInvaderClass(invader)}
            style={{ 
              left: `${invader.x}px`, 
              top: `${invader.y}px`,
              transform: `translateX(-50%) scale(${invader.scale || 1})`,
              animationDelay: `${(index % 5) * 0.1}s`
            }}
          >
            {invader.health > 1 && (
              <div className="invader-health-bar">
                <div 
                  className="invader-health-fill"
                  style={{ width: `${(invader.health / invader.maxHealth) * 100}%` }}
                />
              </div>
            )}
          </div>
        )
      ))}
      
      {/* Player Bullets */}
      {bullets.map((bullet, index) => (
        <div
          key={`bullet-${index}`}
          className={`bullet ${bullet.type || 'normal'}`}
          style={{ 
            left: `${bullet.x}px`, 
            bottom: `${bullet.y}px`,
            transform: `translateX(-50%)`
          }}
        >
          {bullet.type === 'laser' && <div className="laser-trail"></div>}
        </div>
      ))}

      {/* Enemy Bullets */}
      {enemyBullets.map((bullet, index) => (
        <div
          key={`enemy-bullet-${index}`}
          className={`enemy-bullet ${bullet.type || 'normal'}`}
          style={{ 
            left: `${bullet.x}px`, 
            top: `${bullet.y}px`,
            transform: `translateX(-50%)`
          }}
        />
      ))}
      
      {/* Power-ups */}
      {powerUps.map((powerUp, index) => (
        <div
          key={`powerup-${index}`}
          className={`power-up power-up-${powerUp.type}`}
          style={{ 
            left: `${powerUp.x}px`, 
            bottom: `${powerUp.y}px`,
            transform: `translateX(-50%)`
          }}
          onClick={() => onPowerUpCollect?.(powerUp)}
        >
          <div className="power-up-glow"></div>
        </div>
      ))}

      {/* Explosion Effects */}
      {explosions.map((explosion) => (
        <div
          key={explosion.id}
          className={`explosion explosion-${explosion.type}`}
          style={{
            left: `${explosion.x}px`,
            top: `${explosion.y}px`,
            width: `${explosion.size}px`,
            height: `${explosion.size}px`,
            transform: `translate(-50%, -50%)`
          }}
        />
      ))}

      {/* Particle Effects */}
      {particles.map((particle, index) => (
        <div
          key={`particle-${index}`}
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity
          }}
        />
      ))}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="game-over-overlay">
          <div className="game-over-content">
            <div className="game-over-title">GAME OVER</div>
            <div className="final-score">FINAL SCORE: {score}</div>
            <div className="game-over-buttons">
              <button className="restart-button">PLAY AGAIN</button>
              <button className="menu-button">MAIN MENU</button>
            </div>
          </div>
        </div>
      )}

      {/* Level Complete Animation */}
      {level > 1 && invaders.length === 0 && !gameOver && (
        <div className="level-complete">
          <div className="level-complete-text">LEVEL {level - 1} COMPLETE!</div>
          <div className="level-complete-subtext">GET READY FOR LEVEL {level}</div>
        </div>
      )}

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <div>Player: {player.x}, {player.y}</div>
          <div>Invaders: {invaders.filter(i => !i.destroyed).length}</div>
          <div>Bullets: {bullets.length}</div>
        </div>
      )}
    </div>
  );
};

export default GameArena;
