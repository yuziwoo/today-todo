import BasicCheckbox from 'src/components/common/BasicCheckbox/BasicCheckbox';
import './editorBasicRepeatButton.css';

interface EditorBasicRepeatButtonProps {
  name: string;
  cycleString?: string;
  cycle: string;
  isActive: boolean;
  handleUpdateCycle: (cycle: string) => void;
}

const EditorBasicRepeatButton = ({
  name,
  cycleString,
  cycle,
  isActive,
  handleUpdateCycle,
}: EditorBasicRepeatButtonProps) => {
  const handleButtonClick = () => {
    handleUpdateCycle(cycle);
  };

  return (
    <button
      className={`editor-repeat-button${isActive ? ' active' : ''}`}
      onClick={handleButtonClick}
    >
      <h2>{name}</h2>
      {cycleString ? <h2>{cycleString}</h2> : ''}
      <BasicCheckbox checked={isActive} />
    </button>
  );
};

export default EditorBasicRepeatButton;
