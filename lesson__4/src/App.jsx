import { useState, useRef, useEffect } from 'react';
import './App.scss';
import Player from './components/Player/Player';
import SecretNumber from './components/SecretNumber/SecretNumber';
import GameOver from './components/GameOver/GameOver';
import Messenger from './components/Messenger/Messenger';
import { getError, isNumberUsed } from './utils';

function App() {
    const secretNumbers = useRef([]);
    const [currentPlayer, setCurrentPlayer] = useState(0); // 0 - перший, 1 - другий
    const [inputs, setInputs] = useState(['', '']);
    const [playerNumbers, setPlayerNumbers] = useState([[], []]);
    const [guessedNumbers, setGuessedNumbers] = useState(['_', '_', '_']);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        generateSecretNumbers();
    }, []);

    const generateSecretNumbers = () => {
        const numbers = [];
        while (numbers.length < 3) {
            const num = Math.floor(Math.random() * 10);
            if (!numbers.includes(num)) numbers.push(num);
        }
        secretNumbers.current = numbers;
        setGuessedNumbers(['_', '_', '_']);
        setPlayerNumbers([[], []]);
        setInputs(['', '']);
        setCurrentPlayer(0);
        setGameOver(false);
        setWinner(null);
    };

    const handleInputChange = (idx, e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 1);
        setInputs((inputs) => inputs.map((v, i) => (i === idx ? val : v)));
    };

    const handleMove = (idx) => {
        const value = inputs[idx];
        const number = parseInt(value);
        if (isNaN(number) || isNumberUsed(number, playerNumbers)) return;
        const index = secretNumbers.current.indexOf(number);
        let newGuessedNumbers = guessedNumbers;
        if (index !== -1) {
            newGuessedNumbers = [...guessedNumbers];
            newGuessedNumbers[index] = number;
            setGuessedNumbers(newGuessedNumbers);
            if (!newGuessedNumbers.includes('_')) {
                setGameOver(true);
                setWinner(idx === 0 ? 1 : 0);
            }
        }
        setPlayerNumbers((nums) => nums.map((arr, i) => (i === idx ? [...arr, number] : arr)));
        setInputs((inputs) => inputs.map((v, i) => (i === idx ? '' : v)));
        setCurrentPlayer((cur) => 1 - cur);
    };

    return (
        <div className="app">
            <h1>Гра "Вгадай число"</h1>
            <div className="gameContainer">
                <SecretNumber guessedNumbers={guessedNumbers} />
                <div className="players">
                    {[0, 1].map((idx) => (
                        <Player
                            key={idx}
                            playerNumber={idx + 1}
                            value={inputs[idx]}
                            onChange={(e) => handleInputChange(idx, e)}
                            onMove={() => handleMove(idx)}
                            disabled={!!getError(inputs[idx], playerNumbers) || gameOver}
                            numbers={playerNumbers[idx]}
                            isActive={currentPlayer === idx && !gameOver}
                            error={getError(inputs[idx], playerNumbers)}
                        />
                    ))}
                </div>
                {gameOver && <GameOver winner={winner + 1} onRestart={generateSecretNumbers} />}
            </div>
            <Messenger />
        </div>
    );
}

export default App;
