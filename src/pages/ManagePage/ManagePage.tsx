import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setManagerState } from 'src/store/slice/manageSlice';
import ManageHeader from '../../components/manage/ManageHeader/ManageHeader';
import ManageBody from '../../components/manage/ManageBody/ManageBody';
import { Tasks } from 'src/types/todo';
import ManageConfirm from '../../components/manage/ManageConfirm/ManageConfirm';

interface ManagePageProps {
  todo: Tasks;
  loading: boolean;
}

const ManagePage = ({ todo, loading }: ManagePageProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setManagerState(todo));
    // eslint-disable-next-line
  }, [todo]);

  return (
    <div className="manage" style={{ backgroundColor: 'var(--color-bg-1)', minHeight: '100vh' }}>
      <ManageHeader />
      <ManageBody loading={loading} />
      <ManageConfirm />
    </div>
  );
};

export default ManagePage;
