import './editorCycleButton.css';

interface EditorCycleButtonProps {
  text: string;
  onClickHandler: (cycle: string) => void;
  cycle: string;
}

const EditorCycleButton = ({ text, onClickHandler, cycle }: EditorCycleButtonProps) => {
  const handleOnClick = () => {
    onClickHandler(cycle);
  };
  return (
    <button className="canHover cycle-button" onClick={handleOnClick}>
      <div className="radio">
        <div className="radio-highlight"></div>
      </div>
      <h2>{text}</h2>
    </button>
  );
};

export default EditorCycleButton;
