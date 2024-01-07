import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { initialEditorState } from 'src/mocks/data/editorState';
import { resetEditorTask, toggleEditor } from 'src/store/slice/editorSlice';

import EditorBg from './EditorBg/EditorBg';
import EditorHeader from './EditorHeader/EditorHeader';
import EditorWorksInput from './EditorWorksInput/EditorWorksInput';
import EditorDateSelect from './EditorDateSelect/EditorDateSelect';
import EditorRepeatInfo from './EditorRepeatInfo/EditorRepeatInfo';
import EditorManageTask from './EditorManageTask/EditorManageTask';
import EditorConfirm from './EditorConfirm/EditorConfirm';
import './editor.css';

const Editor = () => {
  const dispatch = useDispatch();
  const editorState = useSelector((state: RootState) => state.editor);
  const isUpdating = editorState.task.id > initialEditorState.task.id;
  const [scrollTop, setScrollTop] = useState(0);

  const { editing, firstEdit } = editorState;
  const contentElement = useRef<HTMLDivElement>(null);

  const handleScrollUpdate = () => {
    if (contentElement.current) contentElement.current.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!editing) dispatch(resetEditorTask());
    // eslint-disable-next-line
  }, [editing]);

  const handleCancelEditor = () => {
    if (editing) {
      dispatch(toggleEditor());
      handleScrollUpdate();
    }
  };

  return (
    <>
      <section className={`editor${editing ? ' editing' : ''}${firstEdit ? '' : ' closed'}`}>
        <div className="editor-content">
          <EditorBg editing={editing} scrollTop={scrollTop} />
          <div
            className="content"
            ref={contentElement}
            onScroll={(e) => {
              setScrollTop(e.currentTarget.scrollTop);
            }}
          >
            <EditorHeader onCancelEditor={handleCancelEditor} />
            <EditorWorksInput />
            <EditorDateSelect editing={editing} />
            <EditorRepeatInfo />
            <EditorManageTask isUpdating={isUpdating} onCancelEditor={handleCancelEditor}/>
          </div>
          <EditorConfirm onCancelEditor={handleCancelEditor} isUpdate={isUpdating} />
        </div>
      </section>
    </>
  );
};

export default Editor;
