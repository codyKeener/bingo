'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { useState } from 'react';
import BingoCard from '../components/BingoCard';
import CalledNumberTable from '../components/CalledNumberTable';

function Home() {
  const { user } = useAuth();
  const [bingoCard, setBingoCard] = useState('');
  const [currentBingoNumber, setCurrentBingoNumber] = useState(<h1>Hey, {user.displayName}! Let&apos;s Play Bingo!</h1>);
  const [calledBingoNumbers, setCalledBingoNumbers] = useState([]);
  const [stampedBoxes, setStampedBoxes] = useState(['N-2']);
  const [win, setWin] = useState(true);
  const [buttonText, setButtonText] = useState('Get a Bingo Card');
  const [table, setTable] = useState('');

  const getBingoCard = () => {
    setBingoCard(<BingoCard />);
    setTable(
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '16px', width: '30%', paddingRight: '50px' }}>
        <h2>Called Numbers</h2>
        <CalledNumberTable />
      </div>,
    );
    // GET RID OF STAMPS IF PLAYING AGAIN
    for (let i = 0; i < calledBingoNumbers.length; i++) {
      const number = `${calledBingoNumbers[i]}-stamp`;
      const tableNumber = `${calledBingoNumbers[i]}-stamp-table`;
      const box = document.getElementById(number);
      const tableBox = document.getElementById(tableNumber);
      if (box) {
        box.classList.remove('called-number');
      }
      if (tableBox) {
        tableBox.classList.remove('called-number');
      }
    }
    // RESET GAME
    setCurrentBingoNumber(<h1>Call a Number!</h1>);
    setStampedBoxes(['N-2']);
    setCalledBingoNumbers([]);
    setButtonText('Call a Number');
    setWin(false);
  };

  const checkWin = (boxesStamped) => {
    const winningCombinations = [
      // COLUMNS
      ['B-0', 'B-1', 'B-2', 'B-3', 'B-4'],
      ['I-0', 'I-1', 'I-2', 'I-3', 'I-4'],
      ['N-0', 'N-1', 'N-2', 'N-3', 'N-4'],
      ['G-0', 'G-1', 'G-2', 'G-3', 'G-4'],
      ['O-0', 'O-1', 'O-2', 'O-3', 'O-4'],
      // ROWS
      ['B-0', 'I-0', 'N-0', 'G-0', 'O-0'],
      ['B-1', 'I-1', 'N-1', 'G-1', 'O-1'],
      ['B-2', 'I-2', 'N-2', 'G-2', 'O-2'],
      ['B-3', 'I-3', 'N-3', 'G-3', 'O-3'],
      ['B-4', 'I-4', 'N-4', 'G-4', 'O-4'],
      // DIAGONALS
      ['B-0', 'I-1', 'N-2', 'G-3', 'O-4'],
      ['B-4', 'I-3', 'N-2', 'G-1', 'O-0'],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      if (winningCombinations[i].every((combo) => boxesStamped.includes(combo))) {
        setWin(true);
        setCurrentBingoNumber(<h1>Bingo! You won! Play again?</h1>);
        setButtonText('Play again');
        break;
      }
    }
  };

  const callNumber = () => {
    let newNumberCalled = false;

    while (newNumberCalled === false) {
      const number = Math.floor(Math.random() * (75 - 1 + 1) + 1);

      if (!calledBingoNumbers.includes(number)) {
        setCalledBingoNumbers((prevState) => [...prevState, number]);

        // STAMP CALLED NUMBERS TABLE
        const tableStamp = `${number}-stamp-table`;
        const tableBox = document.getElementById(tableStamp);
        tableBox.classList.add('called-number');

        if (number <= 15) {
          setCurrentBingoNumber(<h1>B{number}</h1>);
        } else if (number > 15 && number <= 30) {
          setCurrentBingoNumber(<h1>I{number}</h1>);
        } else if (number > 30 && number <= 45) {
          setCurrentBingoNumber(<h1>N{number}</h1>);
        } else if (number > 45 && number <= 60) {
          setCurrentBingoNumber(<h1>G{number}</h1>);
        } else {
          setCurrentBingoNumber(<h1>O{number}</h1>);
        }

        // STAMP BINGO CARD
        const numStamp = `${number}-stamp`;
        const box = document.getElementById(numStamp);

        if (box) {
          box.classList.add('called-number');
          const boxParent = box.parentElement.id;
          // USING FUNCTION FORM OF SETTING STATE TO MAKE IT HAPPEN IMMEDIATELY AND THEN PASSING THAT VALUE INTO THE CHECKWIN FUNCTION
          setStampedBoxes((prevState) => {
            const newState = [...prevState, boxParent];
            checkWin(newState);
            return newState;
          });
          checkWin(stampedBoxes);
        }
        newNumberCalled = true;
      }
    }
  };

  const handleClick = () => {
    if (win === true) {
      getBingoCard();
    } else {
      callNumber();
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', width: '70%', paddingLeft: table === '' ? '0px' : '400px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div>{currentBingoNumber}</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>{bingoCard}</div>
        </div>
        <Button onClick={handleClick}>{buttonText}</Button>
      </div>
      {table}
    </div>
  );
}

export default Home;
