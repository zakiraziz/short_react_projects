.game-rena {
  position: relative;
  width: 800px;
  height: 600px;
  background: linear-gradient(to bottom, #0a0a2a, #1a1a4a);
  border: 2px solid #00ffff;
  overflow: hidden;
}

/* Game Stats */
.game-stats {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #00ffff;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  z-index: 10;
}

.game-stats div {
  margin-bottom: 5px;
  text-shadow: 0 0 5px #00ffff;
}

/* Player with health bar */
.player {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #00ff00;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transition: all 0.1s ease;
}

.player.invulnerable {
  animation: blink 0.5s infinite;
}

.health-bar {
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 4px;
  background: #333;
  border-radius: 2px;
}

.health-fill {
  height: 100%;
  background: #00ff00;
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Invaders */
.invader {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.invader-type-1 { background: #ff4444; }
.invader-type-2 { background: #ffaa00; }
.invader-type-3 { background: #8844ff; }

.invader.damaged {
  background: #ff8888 !important;
}

.invader-health {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 10px;
  font-weight: bold;
}

/* Bullets */
.bullet {
  position: absolute;
  width: 4px;
  height: 12px;
  background: #ffff00;
  border-radius: 2px;
}

.bullet.power {
  background: #ff4444;
  box-shadow: 0 0 10px #ff4444;
}

/* Power-ups */
.power-up {
  position: absolute;
  width: 20px;
  height: 20px;
  font-size: 16px;
  text-align: center;
  z-index: 5;
}

/* Explosions */
.explosion {
  position: absolute;
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, #ffff00, #ff4444, transparent);
  border-radius: 50%;
  pointer-events: none;
}
/* Game Over Screen */
.game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.game-over-content {
  text-align: center;
  color: white;
  font-family: 'Courier New', monospace;
}

.game-over-title {
  font-size: 48px;
  color: #ff4444;
  margin-bottom: 20px;
  text-shadow: 0 0 10px #ff4444;
}

.final-score, .final-level {
  font-size: 24px;
  margin-bottom: 10px;
  color: #00ffff;
}

.restart-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #00ff00;
  border: none;
  border-radius: 5px;
  color: #000;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.restart-button:hover {
  background: #00cc00;
  transform: scale(1.1);
}

/* Level Start Animation */
.level-start {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  color: #00ffff;
  font-family: 'Courier New', monospace;
  animation: fadeInOut 2s ease-in-out;
  z-index: 50;
}

/* Animations */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes explode {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
