import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "../redux";
import { ICard, ITodo } from "../ts/types";
import { useState } from "react";

type Props = {
  todo: ITodo;
  currCard: ICard;
};

type TypeOnDropTodo = (dragIndex: string, dropIndex: string) => void;

const Todo = ({ todo, currCard }: Props) => {
  const [newValue, setNewValue] = useState(todo.value);
  const dispatch = useDispatch();
  const [{ isDragged }, drag] = useDrag(() => ({
    type: "todo",
    item: todo,
    collect: (mtr) => ({
      isDragged: !!mtr.isDragging(),
    }),
  }));

  const [{ isDragged: isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item: { id: string }) => onDropTodo(item.id, todo.id),
    collect: (mtr) => ({
      isDragged: !!mtr.isOver(),
    }),
  }));

  const onDropTodo: TypeOnDropTodo = (dragId, dropId) => {
    const action = {
      type: "dndTodos",
      dragId,
      dropId,
      payload: currCard,
    };

    dispatch(action);
  };

  const onFocusTodo = () => {
    const action = {
      type: "editTodo",
      payload: currCard,
      todoId: todo.id,
    };

    dispatch(action);
  };

  const onBlurTodo = () => {
    const action = {
      type: "editTodo",
      payload: { ...currCard, todos: [...currCard.todos] },
      todoId: todo.id,
      todoNewValue: newValue,
    };

    dispatch(action);
  };

  const onDeleteTodo = () => {
    const action = {
      type: "deleteTodo",
      payload: currCard,
      todoId: todo.id,
    };

    dispatch(action);
  };

  return (
    <div ref={drop} style={{ outline: isOver ? "1px dashed red" : "", visibility: isDragged ? "hidden" : "inherit" }}>
      <input
        ref={drag}
        key={todo.id}
        readOnly={todo.readOnly}
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        onFocus={onFocusTodo}
        onBlur={onBlurTodo}
        style={{
          background: todo.readOnly ? "" : "rgba(199, 141, 54, 0.5)",
        }}
      />
      <button onClick={onDeleteTodo}>Del</button>
    </div>
  );
};

export default Todo;
