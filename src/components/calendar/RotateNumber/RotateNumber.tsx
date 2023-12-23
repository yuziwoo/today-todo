import './rotateNumber.css';

interface RotateNumberProps {
  prev: number;
  current: number;
}

const digits = Array.from({ length: 11 }, (_, index) => index % 10);

const RotateNumber = ({ prev, current }: RotateNumberProps) => {
  const is9to0 = prev === 9 && current === 0;
  const is0to9 = prev === 0 && current === 9;

  return (
    <div className={`rotate-number${is9to0 ? ' nine-zero' : ''}${is0to9 ? ' zero-nine' : ''}`}>
      <div className="wrapper" style={{ transform: `translateY(-${current}00%)` }}>
        {digits.map((digit, index) => (
          <h1 key={index} style={{ top: `${100 * index}%` }}>
            {digit}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default RotateNumber;
