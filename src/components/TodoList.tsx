import { useDrop } from "react-dnd";
import { ICard, ITodo } from "../ts/types";
import Todo from "./Todo";
import { useDispatch } from "../redux";

type Props = {
  todos: ITodo[];
  currCard: ICard;
};

type TypeOnDropTodo = (dragIndex: string, dropIndex: string) => void;

const TodoList = ({ todos, currCard }: Props) => {
  const dispatch = useDispatch();
  const [{ isDragged }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item: { id: string }) => dropTodoToCard(item.id, currCard.id),
    collect: (mtr) => ({ isDragged: mtr.isOver() }),
  }));

  const dropTodoToCard: TypeOnDropTodo = (dragId, dropId) => {
    const action = {
      type: "dndTodosToCard",
      payload: currCard,
      dragId,
      dropId,
    };

    dispatch(action);
  };

  return (
    <div className="todo-list" style={{ outline: isDragged ? "1px dashed red" : "0px" }} ref={drop}>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} currCard={currCard} />
      ))}
    </div>
  );
};

export default TodoList;
