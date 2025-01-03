import PropTypes from 'prop-types';

function Column({ letter, number1, number2, numRows }) {
  const randBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const getBingoNumbers = () => {
    const numbers = [];
    while (numbers.length < numRows) {
      const number = randBetween(number1, number2);
      if (!numbers.includes(number)) {
        numbers.push(parseInt(number, 10));
      }
    }

    // SORT IN NUMERICAL ORDER IF CREATING THE CALLED NUMBER TABLE
    if (numRows > 5) {
      numbers.sort((a, b) => a - b);
    }

    // CHANGE MIDDLE SQUARE TO FREE SQUARE ON BINGO CARD
    if (numRows <= 5 && (letter === 'N' || letter === 'n')) {
      numbers[2] = 'FREE';
    }

    return numbers;
  };

  const bingoNumbers = getBingoNumbers();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: numRows <= 5 ? '100px' : '50px', minHeight: numRows <= 5 ? '600px' : '300px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', minWidth: numRows <= 5 ? '100px' : '50px', minHeight: numRows <= 5 ? '65px' : '32px', fontSize: numRows <= 5 ? '38px' : '19px', borderBottom: '1px solid white' }}>{letter}</div>
      {bingoNumbers.map((number, index) => (
        <div key={numRows <= 5 ? number : `${number}-table`} id={numRows <= 5 ? `${letter}-${index}` : `${letter}-${index}-table`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: numRows <= 5 ? '100px' : '50px', minHeight: numRows <= 5 ? '100px' : '50px', border: '2px solid white', fontSize: numRows <= 5 ? '35px' : '17px' }}>
          <div key={`${number}-stamp`} id={numRows <= 5 ? `${number}-stamp` : `${number}-stamp-table`} className={number === 'FREE' ? 'called-number' : ''}>
            {number}
          </div>
        </div>
      ))}
    </div>
  );
}

Column.propTypes = {
  letter: PropTypes.string.isRequired,
  number1: PropTypes.number.isRequired,
  number2: PropTypes.number.isRequired,
  numRows: PropTypes.number.isRequired,
};

export default Column;
