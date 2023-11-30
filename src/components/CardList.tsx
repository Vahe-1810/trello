import { useSelector } from "../redux";
import Card from "./Card";

const CardList = () => {
  const cardList = useSelector((state) => state.cardList);

  return (
    <div className="card-list">
      {cardList.map(({ id, title, todos, readOnly }) => (
        <Card key={id} id={id} title={title} todos={todos} readOnly={readOnly} />
      ))}
    </div>
  );
};

export default CardList;
