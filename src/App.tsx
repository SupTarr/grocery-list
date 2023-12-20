import { useReducer, useEffect } from "react";
import Header from "./Header";
import AddItem from "./AddItem";
import Footer from "./Footer";

type Item = {
  id: number;
  checked: boolean;
  name: string;
};

type Action =
  | { type: "setItems"; items: Item[] }
  | { type: "setNewItem"; newItem: string }
  | { type: "setSearch"; search: string };

type State = {
  items: Item[];
  newItem: string;
  search: string;
};

const App = () => {
  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "setItems":
          return {
            ...state,
            items: action.items,
          };
        case "setNewItem":
          return {
            ...state,
            newItem: action.newItem,
          };
        case "setSearch":
          return {
            ...state,
            search: action.search,
          };
        default:
          return state;
      }
    },
    {
      items: JSON.parse(localStorage.getItem("shopping-list") || "[]") || [],
      newItem: "",
      search: "",
    },
  );

  useEffect(() => {
    localStorage.setItem("shopping-list", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (name: string) => {
    const id = state.items.length
      ? state.items[state.items.length - 1].id + 1
      : 1;
    const myNewItem = { id, checked: false, name };
    const listItems = [...state.items, myNewItem];
    dispatch({ type: "setItems", items: listItems });
  };

  const handleCheck = (id: number) => {
    const listItems = state.items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    dispatch({ type: "setItems", items: listItems });
  };

  const handleDelete = (id: number) => {
    const listItems = state.items.filter((item) => item.id !== id);
    dispatch({ type: "setItems", items: listItems });
  };

  const handleSubmit = () => {
    if (!state.newItem) return;
    addItem(state.newItem);
    dispatch({ type: "setNewItem", newItem: "" });
  };

  return (
    <div className="app min-h-screen">
      <Header />
      <div className="main min-h-[calc(100vh-144px)] w-fll max-w-screen-lg mx-auto">
        <AddItem
          newItem={state.newItem}
          setNewItem={(v: string) =>
            dispatch({ type: "setNewItem", newItem: v })
          }
          handleSubmit={handleSubmit}
        />
      </div>
      <Footer length={state.items.length} />
    </div>
  );
};

export default App;
