import { useState } from "react";
import { useDispatch } from "../redux";
import { v4 } from "uuid";

const AddCard = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const onAdd = () => {
    const action = {
      payload: {
        id: v4(),
        title: value,
        todos: [],
        readOnly: true,
      },
      type: "addCard",
    };
    dispatch(action);

    setValue("");
  };

  return (
    <div className="add-card">
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={onAdd}>ADD</button>
    </div>
  );
};

export default AddCard;
