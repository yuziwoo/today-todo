import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '../../icons/icons';
import './manageHeader.css';

const ManageHeader = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };
  return (
    <section className="manage-header flex-center">
      <div className="title flex-center">
        <button className="event-hover hover-soft color-active flex-center" onClick={handleGoHome}>
          <IconArrowLeft color="black" />
        </button>
        <h1>일정 관리</h1>
      </div>
    </section>
  );
};

export default ManageHeader;
