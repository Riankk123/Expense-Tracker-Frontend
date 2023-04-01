import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import "./Icons.css";
import { expenseAction } from "../../Store/expenses";
const Icons = (props) => {
  const id = props.id;
  const dispatch = useDispatch();
  const removeExpense = () => {
    dispatch(expenseAction.deleteExpense({ id: id }));
  };
  return (
    <div>
      <AiFillEdit className="icon" size={32} />
      <AiTwotoneDelete onClick={removeExpense} className="icon" size={32} />
    </div>
  );
};
export default Icons;
