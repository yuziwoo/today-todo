import './editorHeader.css';
import { IconArrowLeft } from '../../icons/icons';

interface EditorHeaderProps {
  onCancelEditor: () => void;
}

const EditorHeader = ({ onCancelEditor }: EditorHeaderProps) => {
  return (
    <div className="editor-header">
      <div className="title">
        <button className="close event-hover color-reverse" onClick={onCancelEditor}>
          <IconArrowLeft color="white" />
        </button>
        <h1>EDIT TASK</h1>
      </div>
    </div>
  );
};

export default EditorHeader;
