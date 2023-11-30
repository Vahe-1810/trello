import deepcopy from "deepcopy";
import { INITIALCARDS } from "../../constants";
import { ICard } from "../../ts/types";

interface ICardAction {
  type: string;
  payload: ICard;
  dropId?: string;
  dragId?: string;
  todoId?: string;
  todoNewValue?: string;
}

interface ICardState {
  cardList: ICard[];
}

const initialState: ICardState = {
  cardList: INITIALCARDS,
};

export const cardSlice = (state = initialState, action: ICardAction): ICardState => {
  const newState: ICardState = deepcopy(state);

  switch (action.type) {
    case "addCard":
      return {
        ...state,
        cardList: [...state.cardList, action.payload],
      };
    case "deleteCard":
      return {
        ...state,
        cardList: state.cardList.filter((card) => card.id !== action.payload.id),
      };
    case "editCardTitle":
      return {
        ...state,
        cardList: state.cardList.map((card) => {
          const currentCard = card.id === action.payload.id;

          return currentCard ? { ...card, readOnly: !card.readOnly, title: action.payload.title } : card;
        }),
      };
    case "dndCards":
      const dropIndex = newState.cardList.findIndex((card) => card.id === action.dropId);
      const dragIndex = newState.cardList.findIndex((card) => card.id === action.dragId);
      const dragCard = newState.cardList.find((card) => card.id === action.dragId);

      const cardCopy = newState.cardList[dropIndex];

      if (dragCard) newState.cardList[dropIndex] = dragCard;

      newState.cardList[dragIndex] = cardCopy;

      return newState;
    case "addTodo":
      return {
        ...state,
        cardList: newState.cardList.map((card) =>
          card.id === action.payload.id
            ? {
                ...card,
                todos: action.payload.todos,
              }
            : card,
        ),
      };

    case "deleteTodo":
      return {
        ...state,
        cardList: newState.cardList.map((card) =>
          card.id === action.payload.id
            ? { ...card, todos: card.todos.filter((todo) => todo.id !== action.todoId) }
            : card,
        ),
      };
    case "editTodo":
      return {
        ...state,
        cardList: newState.cardList.map((card) =>
          card.id === action.payload.id
            ? {
                ...card,
                todos: card.todos.map((todo) =>
                  todo.id === action.todoId
                    ? {
                        ...todo,
                        readOnly: !todo.readOnly,
                        value: todo.readOnly ? todo.value : action.todoNewValue + "",
                      }
                    : todo,
                ),
              }
            : card,
        ),
      };
    case "dndTodos":
      let dragIdx: number;
      let dropIdx: number;

      const droppedTodoCard = newState.cardList.find((card) => card.id === action.payload.id);
      const draggedTodoCard = newState.cardList.find((card) => {
        return card.todos.some((todo) => todo.id === action.dragId);
      });

      if (draggedTodoCard && droppedTodoCard) {
        const draggedTodo = draggedTodoCard.todos.find((todo, i) => {
          dragIdx = i;
          return todo.id === action.dragId;
        });
        const droppedTodo = droppedTodoCard.todos.find((todo, i) => {
          dropIdx = i;
          return todo.id === action.dropId;
        });

        return {
          ...state,
          cardList: newState.cardList.map((card) => {
            const newTodos = [...card.todos];

            if (draggedTodoCard.id === droppedTodoCard.id && droppedTodoCard.id === card.id && droppedTodo) {
              const todoCopy = newTodos[dragIdx];

              newTodos[dragIdx] = droppedTodo;
              newTodos[dropIdx] = todoCopy;

              return { ...card, todos: newTodos };
            }

            if (card.id === draggedTodoCard.id && droppedTodo) {
              newTodos[dragIdx] = droppedTodo;
              return { ...card, todos: newTodos };
            }

            if (card.id === droppedTodoCard.id && draggedTodo) {
              newTodos[dropIdx] = draggedTodo;
              return { ...card, todos: newTodos };
            }

            return card;
          }),
        };
      }

      return newState;
    case "dndTodosToCard":
      const draggedTodoFromCard = newState.cardList.find((card) =>
        card.todos.some((todo) => todo.id === action.dragId),
      );

      const draggedCardTodo = draggedTodoFromCard?.todos.find((todo) => todo.id === action.dragId);

      if (action.dropId === draggedTodoFromCard?.id) return newState;

      return {
        ...newState,
        cardList: newState.cardList.map((card) => {
          if (card.id === draggedTodoFromCard?.id && action.dragId) {
            return {
              ...card,
              todos: card.todos.filter((todo) => todo.id !== action.dragId),
            };
          }

          if (card.id === action.dropId && draggedCardTodo) {
            return {
              ...card,
              todos: [...card.todos, draggedCardTodo],
            };
          }
          return card;
        }),
      };
    default:
      return state;
  }
};
