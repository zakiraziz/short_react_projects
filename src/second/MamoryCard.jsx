import React, { useState, useEffect } from 'react';
import './App.css';

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [bestScore, setBestScore] = useState(Infinity);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Check if game is won
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameWon(true);
      setIsRunning(false);
      
      // Update best score
      if (turns < bestScore) {
        setBestScore(turns);
        localStorage.setItem('bestScore', turns.toString());
      }
    }
  }, [cards, turns, bestScore]);

  // Load best score from localStorage on component mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('bestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: Math.random(), uniqueId: index }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setGameWon(false);
    setTimer(0);
    setIsRunning(true);
  };

  // Handle choice
  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
    }
  };

  // Compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      
      if (choiceOne.src === choiceTwo.src && choiceOne.uniqueId !== choiceTwo.uniqueId) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // Start game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // Auto-complete game (cheat/debug feature)
  const autoCompleteGame = () => {
    setCards(prevCards => prevCards.map(card => ({ ...card, matched: true })));
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      
      <div className="game-info">
        <div className="stats">
          <div className="stat">
            <span className="stat-label">Turns:</span>
            <span className="stat-value">{turns}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Time:</span>
            <span className="stat-value">{formatTime(timer)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Best Score:</span>
            <span className="stat-value">
              {bestScore === Infinity ? '--' : bestScore}
            </span>
          </div>
        </div>
        
        <div className="controls">
          <button onClick={shuffleCards} className="btn btn-primary">
            New Game
          </button>
          {/* Remove autoComplete button in production - for testing only */}
          <button onClick={autoCompleteGame} className="btn btn-secondary" style={{display: 'none'}}>
            Auto Complete
          </button>
        </div>
      </div>

      {gameWon && (
        <div className="win-message">
          <h2>Congratulations! 🎉</h2>
          <p>You won in {turns} turns and {formatTime(timer)}!</p>
          {turns === bestScore && <p className="new-record">New Best Score! 🏆</p>}
        </div>
      )}
      
      <div className="card-grid">
        {cards.map(card => (
          <div 
            className={`card ${card.matched ? 'matched' : ''} 
              ${(card === choiceOne || card === choiceTwo) ? 'flipped' : ''}`} 
            key={card.uniqueId || card.id}
            onClick={() => {
              if (!disabled && !card.matched && card !== choiceOne && card !== choiceTwo) {
                handleChoice(card);
              }
            }}
          >
            <div className="front">
              <img src={card.src} alt="card front" />
            </div>
            <div className="back">
              <span>?</span>
            </div>
          </div>
        ))}
      </div>

      <div className="game-instructions">
        <p>Match all pairs of cards in the fewest turns possible!</p>
      </div>
    </div>
  );
}

export default App;
