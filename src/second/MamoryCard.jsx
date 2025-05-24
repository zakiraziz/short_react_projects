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

// Difficulty levels
const difficultySettings = {
  easy: { pairs: 4, timeLimit: null },
  medium: { pairs: 6, timeLimit: 60 },
  hard: { pairs: 8, timeLimit: 45 }
};

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [timeLeft, setTimeLeft] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [bestScore, setBestScore] = useState(null);

  // Shuffle cards based on difficulty
  const shuffleCards = () => {
    const selectedPairs = cardImages.slice(0, difficultySettings[difficulty].pairs);
    const shuffledCards = [...selectedPairs, ...selectedPairs]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: Math.random() + index }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setGameWon(false);
    setGameStarted(true);
    
    // Set time limit if applicable
    if (difficultySettings[difficulty].timeLimit) {
      setTimeLeft(difficultySettings[difficulty].timeLimit);
    } else {
      setTimeLeft(null);
    }
  };

  // Handle choice
  const handleChoice = (card) => {
    if (!gameStarted) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          const newCards = prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
          
          // Check if all cards are matched
          if (newCards.every(card => card.matched)) {
            setGameWon(true);
            // Update best score if applicable
            if (!bestScore || turns + 1 < bestScore) {
              setBestScore(turns + 1);
            }
          }
          
          return newCards;
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === null || !gameStarted || gameWon) return;
    
    if (timeLeft === 0) {
      // Game over due to time
      setGameStarted(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameWon]);

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // Start new game when difficulty changes
  useEffect(() => {
    if (gameStarted) {
      shuffleCards();
    }
  }, [difficulty]);

  return (
    <div className="App">
      <h1 className="header">Memory Game</h1>
      
      <div className="game-controls">
        <div className="difficulty-selector">
          <label>Difficulty: </label>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={gameStarted && !gameWon}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <button onClick={shuffleCards}>
          {gameStarted ? 'Restart Game' : 'Start Game'}
        </button>
      </div>
      
      <div className="game-info">
        <div>Turns: {turns}</div>
        {timeLeft !== null && <div>Time Left: {timeLeft}s</div>}
        {bestScore && <div>Best Score: {bestScore}</div>}
      </div>
      
      {gameWon && (
        <div className="winner">
          <h2>Congratulations! You won in {turns} turns!</h2>
        </div>
      )}
      
      {!gameStarted && !gameWon && (
        <div className="game-instructions">
          <p>Match all pairs of cards in the least turns possible!</p>
          <p>Select a difficulty and click Start Game to begin.</p>
        </div>
      )}
      
      <div className="card-grid">
        {cards.map(card => (
          <div 
            className={`card ${card.matched ? 'matched' : ''} 
              ${(card === choiceOne || card === choiceTwo) ? 'flipped' : ''}`} 
            key={card.id}
            onClick={() => 
              !disabled && 
              !card.matched && 
              !(card === choiceOne || card === choiceTwo) && 
              handleChoice(card)
            }
          >
            <div className="front">
              <img src={card.src} alt="card front" />
            </div>
            <div className="back"></div>
          </div>
        ))}
      </div>
      
      {!gameStarted && timeLeft === 0 && (
        <div className="game-over">
          <h2>Time's up! Game Over!</h2>
        </div>
      )}
    </div>
  );
}

export default App;
