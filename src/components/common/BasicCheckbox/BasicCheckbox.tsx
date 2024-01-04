import { IconCheck } from '../../icons/icons';
import './basicCheckbox.css';

interface BasicCheckboxProps {
  checked: boolean;
  color?: string;
}

const BasicCheckbox = ({ checked, color }: BasicCheckboxProps) => {
  return (
    <div
      className={`basic-checkbox${checked ? ' checked' : ''}`}
      style={{ backgroundColor: `${color}` }}
    >
      <IconCheck color="white" />
    </div>
  );
};

export default BasicCheckbox;
