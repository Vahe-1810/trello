import { v4 } from "uuid";

export const INITIALCARDS = [
  {
    id: v4(),
    title: "Learn",
    readOnly: true,
    todos: [
      {
        id: v4(),
        value: "JavaScript",
        readOnly: true,
      },
      {
        id: v4(),
        value: "React",
        readOnly: true,
      },
      {
        id: v4(),
        value: "Redux",
        readOnly: true,
      },
    ],
  },
  {
    id: v4(),
    title: "Eat",
    readOnly: true,
    todos: [
      {
        id: v4(),
        value: "Chicken",
        readOnly: true,
      },
      {
        id: v4(),
        value: "Bread",
        readOnly: true,
      },
    ],
  },
];
