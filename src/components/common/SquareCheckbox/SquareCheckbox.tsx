import { IconCheck } from '../../icons/icons';
import './squareCheckbox.css';

interface SquareCheckboxProps {
  checked: boolean;
  color?: string;
}

const SquareCheckbox = ({ checked, color }: SquareCheckboxProps) => {
  return (
    <div
      className={`square-checkbox${checked ? ' checked' : ''}`}
      style={{
        backgroundColor: `${checked ? color : 'transparent'}`,
        border: `2px solid ${color}`,
      }}
    >
      <IconCheck color="white" />
    </div>
  );
};

export default SquareCheckbox;
