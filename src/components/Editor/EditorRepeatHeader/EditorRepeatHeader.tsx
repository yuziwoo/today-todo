import './editorRepeatHeader.css';

const EditorRepeatHeader = () => {
  return (
    <div className="editor-repeat-header">
      <h2>반복</h2>
      <div className="cycle">
        <span>없음</span>
        <span>매일</span>
        <span>매주</span>
        <span>매달</span>
        <span>매년</span>
      </div>
    </div>
  );
};

export default EditorRepeatHeader;
