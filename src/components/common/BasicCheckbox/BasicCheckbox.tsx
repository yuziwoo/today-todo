import { IconCheck } from '../../icons/icons';
import './basicCheckbox.css';

interface BasicCheckboxProps {
  checked: boolean;
}

const BasicCheckbox = ({ checked }: BasicCheckboxProps) => {
  return (
    <div className={`basic-checkbox${checked ? ' checked' : ''}`}>
      <IconCheck color="white" />
    </div>
  );
};

export default BasicCheckbox;
