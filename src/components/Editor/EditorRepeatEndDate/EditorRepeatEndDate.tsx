import BasicCheckbox from 'src/components/common/BasicCheckbox/BasicCheckbox';
import { convertDateToNumber, convertNumberToDateData } from 'src/utills/converter';
import './editorRepeatEndDate.css';
import { getNextDay } from 'src/utills/calendarUtils';
import { formatDateToInputString } from 'src/utills/formatter';
import { CALENDAR_API } from 'src/constants/API';
import { useDispatch } from 'react-redux';
import { updateEditorEndDay } from 'src/store/slice/editorSlice';

interface EditorRepeatEndDateProps {
  startDay: number;
  endDay: number;
  isActive: boolean;
  isVisible: boolean;
  handleToggleUseEndDay: () => void;
  handleUpdateEndDay: (endDay: number) => void;
}

const EditorRepeatEndDate = ({
  startDay,
  endDay,
  isActive,
  isVisible,
  handleToggleUseEndDay,
  handleUpdateEndDay,
}: EditorRepeatEndDateProps) => {
  const dispatch = useDispatch();
  const { year, month, day } = convertNumberToDateData(endDay);
  const dayAfterStartDay = getNextDay(convertNumberToDateData(startDay));
  const inputMinDate = formatDateToInputString(dayAfterStartDay);

  const handleEndDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) handleToggleUseEndDay();
    const dateArr = e.target.value.split('-');
    const inputDate = +dateArr.join('');
    const { year, month, day } = convertNumberToDateData(inputDate);
    const endDay = convertDateToNumber({ year, month: month - 1, day });
    dispatch(updateEditorEndDay(endDay));
  };

  return (
    <div className={`repeat-end-date${isVisible ? ' on' : ''}${isActive ? ' active' : ''}`}>
      <button
        className="isValuable"
        onClick={() => {
          handleToggleUseEndDay();
        }}
      >
        <BasicCheckbox checked={isActive} />
        <h2>종료일</h2>
      </button>
      <button className="end-date">
        <h2>{`${year}년 ${month + 1}월 ${day}일`}</h2>
        <input
          type="date"
          min={inputMinDate}
          max={`${CALENDAR_API.maxYear}-12-31`}
          onChange={handleEndDayChange}
        />
      </button>
    </div>
  );
};

export default EditorRepeatEndDate;
