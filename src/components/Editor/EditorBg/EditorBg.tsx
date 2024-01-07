import './editorBg.css';

interface EditorBgProps {
  editing: boolean;
  scrollTop: number;
}

const EditorBg = ({ editing, scrollTop }: EditorBgProps) => {
  return (
    <div className={`editor-bg${editing ? ' on' : ''}`}>
      <div className="cube">
        <div
          className="img-wrap"
          style={{
            filter: `hue-rotate(${scrollTop / 10}deg)`,
            transform: `translateY(${-scrollTop * 0.2}px)`,
          }}
        >
          <img src="./assets/img/editor-bg-w.png" alt="배경 이미지" />
          <img src="./assets/img/editor-bg-b.png" alt="배경 이미지" />
        </div>
      </div>
      <div className="background"></div>
    </div>
  );
};

export default EditorBg;
