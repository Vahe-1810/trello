import { useDispatch } from "../redux";
import { ICard } from "../ts/types";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import TodoList from "./TodoList";
import { v4 } from "uuid";

type TypeOnDrop = (dragIndex: string, dropIndex: string) => void;

const Card = (props: ICard) => {
  const dispatch = useDispatch();
  const { title, todos, readOnly, id } = props;
  const [newTitle, setNewTitle] = useState(title);
  const [todoFieldValue, setTodoFieldValue] = useState("");

  const [{ isDragged }, drag] = useDrag(() => ({
    type: "card",
    item: { id },
    collect: (mtr) => ({
      isDragged: !!mtr.isDragging(),
    }),
  }));

  const [{ isDragged: isOver }, drop] = useDrop(() => ({
    accept: "card",
    drop: (item: { id: string }) => onDrop(item.id, id),
    collect: (mtr) => ({
      isDragged: !!mtr.isOver(),
    }),
  }));

  const onDeleteCard = () => {
    const action = {
      type: "deleteCard",
      payload: props,
    };

    dispatch(action);
  };

  const onEditCard = () => {
    const action = {
      type: "editCardTitle",
      payload: { ...props, title: newTitle },
    };

    dispatch(action);
  };

  const onDrop: TypeOnDrop = (dragId, dropId) => {
    if (dragId === dropId) return;
    const action = {
      type: "dndCards",
      dragId,
      dropId,
      payload: props,
    };

    dispatch(action);
  };

  const onAddTodo = () => {
    const newTodo = {
      id: v4(),
      value: todoFieldValue,
      readOnly: true,
    };
    const action = {
      type: "addTodo",
      payload: {
        ...props,
        todos: [...todos, newTodo],
      },
    };

    dispatch(action);

    setTodoFieldValue("");
  };

  return (
    <div ref={drop} style={{ outline: isOver ? "1px dashed red" : "" }} className="card-background">
      <div className="card" style={{ visibility: isDragged ? "hidden" : "inherit" }} ref={drag}>
        <div>
          <input
            readOnly={readOnly}
            value={newTitle}
            className={readOnly ? "card-title" : "card-editing"}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div className="todo-actions">
            <input value={todoFieldValue} onChange={(e) => setTodoFieldValue(e.target.value)} />
            <button onClick={onAddTodo}>ADD</button>
          </div>
          <div className="todo-list">
            <TodoList todos={todos} currCard={props} />
          </div>
        </div>
        <div className="card-actions">
          <button onClick={onDeleteCard}>DELETE</button>
          <button onClick={onEditCard}>{readOnly ? "EDIT" : "SAVE"}</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
