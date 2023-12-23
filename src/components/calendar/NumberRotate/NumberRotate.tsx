import './numberRotate.css';

interface NumberRotateProps {
  prevValue: number;
  currentValue: number;
}

const digits = Array.from({ length: 11 }, (_, index) => index % 10);
const NumberRotate = ({ prevValue, currentValue }: NumberRotateProps) => {
  const is9to0 = prevValue === 9 && currentValue === 0;
  const is0to9 = prevValue === 0 && currentValue === 9;

  return (
    <div className={`numberRotate${is9to0 ? ' 9to0' : ''}${is0to9 ? ' 0to9' : ''}`}>
      <div className="wrapper">
        {digits.map((digit, index) => (
          <h1 key={index}>{digit}</h1>
        ))}
      </div>
      {/* <div className="wrapper" style={{ transform: `translateY(${translate}00%)` }}>
        {numberArray.map((num) => (
          <h1 key={num} style={{ top: `-${100 * num}%` }}>
            {num}
          </h1>
        ))}
      </div> */}
    </div>
  );
};

export default NumberRotate;
