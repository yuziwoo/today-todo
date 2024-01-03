import './editorRepeatInfoBalloon.css';
import BasicCheckbox from '../../common/BasicCheckbox/BasicCheckbox';
import { CALENDAR_API } from 'src/constants/API';
import {
  convertDateToNumber,
  convertNumberToDateData,
  convertToTwoDigitString,
} from 'src/utills/converter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import {
  toggleEditorRepeatDayOfWeek,
  toggleEditorUseEndDay,
  updateEditorEndDay,
} from 'src/store/slice/editorSlice';
import { getNextDay } from 'src/utills/calendarUtils';

interface EditorRepeatInfoBalloonProps {
  cycle: string;
}

const EditorRepeatInfoBalloon = ({ cycle }: EditorRepeatInfoBalloonProps) => {
  const editorState = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();

  const startDay = convertNumberToDateData(editorState.startDay);
  const minEndDay = getNextDay(startDay);
  const formattedMinEndDay = `${minEndDay.year}-${convertToTwoDigitString(
    minEndDay.month + 1
  )}-${convertToTwoDigitString(minEndDay.day)}`;

  const { year, month, day } = convertNumberToDateData(editorState.endDay);

  const handleEndDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateArray = e.target.value.split('-');
    const endDay = +dateArray.join('');
    const { year, month, day } = convertNumberToDateData(endDay);

    const formattedEndDay = convertDateToNumber({ year, month: month - 1, day });

    dispatch(updateEditorEndDay(formattedEndDay));

    if (!editorState.useEndDay) {
      dispatch(toggleEditorUseEndDay());
    }
  };

  const updateRepeatDayOfWeek = (dayOfWeek: number) => {
    dispatch(toggleEditorRepeatDayOfWeek(dayOfWeek));
  };

  const dayOfWeeks = CALENDAR_API.dayOfWeek.map((dayOfWeek, index) => ({
    dayOfWeek,
    isActive: editorState.repeatDayOfWeek.includes(index),
  }));

  if (cycle === 'single') return <></>;
  return (
    <div className={`edit-balloon${cycle === editorState.repeatCycle ? ' current-cycle' : ''}`}>
      <div className="edit-balloon-content">
        <div className={`endDay-select${editorState.useEndDay ? ' active' : ''}`}>
          <button
            className="canHover switch"
            onClick={() => {
              dispatch(toggleEditorUseEndDay());
            }}
          >
            <BasicCheckbox checked={editorState.useEndDay} />
            <h3>종료일</h3>
          </button>

          <div className="endDay">
            <h3>
              {`${year}년 ${month + 1}월 ${day}일`}
              <input
                type="date"
                min={`${formattedMinEndDay}`}
                max={`${CALENDAR_API.maxYear}-12-31`}
                onChange={handleEndDayChange}
              />
            </h3>
          </div>
        </div>

        {cycle === 'week' && (
          <div className="select-dayOfWeek">
            {dayOfWeeks.map((dayOfWeek, index) => (
              <button
                className={`dayOfWeek canHover${dayOfWeek.isActive ? ' active' : ''}`}
                onClick={() => {
                  updateRepeatDayOfWeek(index);
                }}
                key={index}
              >
                <div className="circle">
                  <span>{dayOfWeek.dayOfWeek}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorRepeatInfoBalloon;
