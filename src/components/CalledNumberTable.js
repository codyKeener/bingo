import Column from './Column';

function CalledNumberTable() {
  // const getColumnNumbers = (letter, min, max) => {
  //   const array = [letter]
  //   for (let i=0; i < max - min; i++) {
  //     array.push(min + i);
  //   }
  //   return array;
  // };

  // const bColumn = getColumnNumbers('B', 1, 15);
  // const iColumn = getColumnNumbers('I', 16, 30);
  // const nColumn = getColumnNumbers('N', 31, 45);
  // const gColumn = getColumnNumbers('G', 46, 60);
  // const oColumn = getColumnNumbers('O', 61, 75);

  const randBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const randBackground = () => {
    const rgb = [];
    while (rgb.length < 2) {
      const number = randBetween(0, 255);
      rgb.push(parseInt(number, 10));
    }
    return `rgb(0, ${rgb[0]}, ${rgb[1]})`;
  };

  const bcolor = randBackground();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '265px', borderRadius: '5px', backgroundColor: `${bcolor}` }}>
      <div style={{ display: 'flex', width: '250px', height: '800px' }}>
        <Column key="B-column-table" letter="B" number1={1} number2={15} numRows={15} />
        <Column key="I-column-table" letter="I" number1={16} number2={30} numRows={15} />
        <Column key="N-column-table" letter="N" number1={31} number2={45} numRows={15} />
        <Column key="G-column-table" letter="G" number1={46} number2={60} numRows={15} />
        <Column key="O-column-table" letter="O" number1={61} number2={75} numRows={15} />
      </div>
    </div>
  );
}

export default CalledNumberTable;
