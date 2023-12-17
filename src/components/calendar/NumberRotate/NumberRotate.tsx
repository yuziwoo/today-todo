import './numberRotate.css';

const numberArray = Array.from({ length: 10 }, (_, index) => index);

const NumberRotate = ({ translate }: { translate: number | string }) => {
  return (
    <div className="numberRotate">
      <div className="wrapper" style={{ transform: `translateY(${translate}00%)` }}>
        {numberArray.map((num) => (
          <h1 key={num} style={{ top: `-${100 * num}%` }}>
            {num}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default NumberRotate;
