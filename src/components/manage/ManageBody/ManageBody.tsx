import CalendarLoading from 'src/components/effect/CalendarLoading';
import ManageOptions from '../ManageOptions/ManageOptions';
import ManageTaskList from '../ManageTaskList/ManageTaskList';

interface ManageBodyProps {
  loading: boolean;
}

const ManageBody = ({ loading }: ManageBodyProps) => {
  if (loading) return <CalendarLoading minHeight={250} />;
  return (
    <section className="manage-body" style={{ position: 'relative' }}>
      <ManageOptions />
      <ManageTaskList />
    </section>
  );
};

export default ManageBody;
