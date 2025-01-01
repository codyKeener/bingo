import PropTypes from 'prop-types';

function Column({ letter, number1, number2 }) {
  const randBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const getBingoNumbers = () => {
    const numbers = [];
    while (numbers.length < 5) {
      const number = randBetween(number1, number2);
      if (!numbers.includes(number)) {
        numbers.push(parseInt(number, 10));
      }
    }
    numbers.sort((a, b) => a - b);

    if (letter === 'N' || letter === 'n') {
      numbers[2] = 'FREE';
    }

    return numbers;
  };

  const bingoNumbers = getBingoNumbers();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100px', height: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', width: '100px', height: '65px', fontSize: '35px' }}>{letter}</div>
        {bingoNumbers.map((number) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '100px', border: '2px solid white', fontSize: '35px' }}>{number}</div>
        ))}
      </div>
  );
}

Column.propTypes = {
  letter: PropTypes.string.isRequired,
  number1: PropTypes.number.isRequired,
  number2: PropTypes.number.isRequired,
};

export default Column;
