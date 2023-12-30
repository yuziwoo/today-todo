import { IconCheck, IconExit } from 'src/components/icons/icons';
import './editorHeader.css';

const EditorHeader = ({ onExitButton }: { onExitButton: () => void }) => {
  return (
    <div className="editor-header">
      <button className="canHover close" onClick={onExitButton}>
        <IconExit color="black" />
      </button>
      <h1>할 일</h1>
      <button className="canHover check">
        <IconCheck color="#148140" />
      </button>
    </div>
  );
};

export default EditorHeader;
