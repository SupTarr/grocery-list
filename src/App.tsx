import { useReducer, useEffect } from "react";
import Header from "./Header";
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
      items: JSON.parse(localStorage.getItem("shoppinglist") || "") || [],
      newItem: "",
      search: "",
    }
  );

  useEffect(() => {
    localStorage.setItem('shoppinglist', JSON.stringify(state.items));
  }, [state.items])

  const addItem = (name: string) => {
    const id = state.items.length ? state.items[state.items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, name };
    const listItems = [...state.items, myNewItem];
    dispatch({ type: "setItems", items: listItems })
  }

  const handleCheck = (id: number) => {
    const listItems = state.items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    dispatch({ type: "setItems", items: listItems })
  }

  const handleDelete = (id: number) => {
    const listItems = state.items.filter((item) => item.id !== id);
    dispatch({ type: "setItems", items: listItems })
  }

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!state.newItem) return;
    addItem(state.newItem);
    dispatch({ type: "setNewItem", newItem: "" })
  }

  return (
    <div className="app min-h-screen">
      <Header />
      <Footer />
      <input type="text" onChange={e => e.preventDefault()} />
    </div>
  );
};

export default App;
