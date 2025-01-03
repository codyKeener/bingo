import Column from './Column';

export default function BingoCard() {
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
    <div style={{ display: 'flex', justifyContent: 'center', width: '525px', borderRadius: '5px', backgroundColor: `${bcolor}` }}>
      <div style={{ display: 'flex', width: '500px' }}>
        <Column key="B-column" letter="B" number1={1} number2={15} />
        <Column key="I-column" letter="I" number1={16} number2={30} />
        <Column key="N-column" letter="N" number1={31} number2={45} />
        <Column key="G-column" letter="G" number1={46} number2={60} />
        <Column key="O-column" letter="O" number1={61} number2={75} />
      </div>
    </div>
  );
}
