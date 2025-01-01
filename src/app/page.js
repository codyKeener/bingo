'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { useState } from 'react';
import BingoCard from '../components/BingoCard';

function Home() {
  const { user } = useAuth();
  const [bingoCard, setBingoCard] = useState('');

  const getBingoCard = () => {
    setBingoCard(
      <BingoCard />,
    );
  };

  const callNumber = () => {
    console.warn('testing 1 2 3');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', width: '100%' }}>
        <div>
          <h1>Hey, {user.displayName}! Let&apos;s Play Bingo!</h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '45px', marginBottom: '15px' }}>{bingoCard}</div>
        </div>
        <Button onClick={bingoCard === '' ? getBingoCard : callNumber}>{bingoCard === '' ? 'Get a Card' : 'Call a Number'}</Button>
      </div>
  );
}

export default Home;
