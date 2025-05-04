import { useReducer, useEffect } from "react";
import { Item } from "./types/Item";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import Content from "./Content";
import Footer from "./Footer";
import { Loading, Size } from "./Loading";

type Action =
  | { type: "setItems"; items: Item[] }
  | { type: "setNewItem"; newItem: string }
  | { type: "setSearch"; search: string }
  | { type: "setLoading"; isLoading: boolean };

type State = {
  items: Item[];
  newItem: string;
  search: string;
  isLoading: boolean;
};

const STORAGE_KEY = "groceryList";
const defaultItems: Item[] = [
  { id: 1, checked: false, name: "Almonds" },
  { id: 2, checked: false, name: "Pizza" },
  { id: 3, checked: false, name: "Bread" },
];

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
        case "setLoading":
          return {
            ...state,
            isLoading: action.isLoading,
          };
        default:
          return state;
      }
    },
    {
      items: [],
      newItem: "",
      search: "",
      isLoading: true,
    },
  );

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(STORAGE_KEY);
      const initialItems = storedItems ? JSON.parse(storedItems) : defaultItems;
      dispatch({ type: "setItems", items: initialItems });
    } catch (error) {
      console.error("Failed to load items from localStorage:", error);
      dispatch({ type: "setItems", items: defaultItems });
    } finally {
      setTimeout(() => {
        dispatch({ type: "setLoading", isLoading: false });
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (state.items.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }

    setTimeout(() => {
      dispatch({ type: "setLoading", isLoading: false });
    }, 1000);
  }, [state.items]);

  const addItem = (name: string) => {
    const id = state.items.length
      ? Math.max(...state.items.map((item) => item.id)) + 1
      : 1;
    const myNewItem = { id, checked: false, name };
    const listItems = [...state.items, myNewItem];
    dispatch({ type: "setItems", items: listItems });
    dispatch({ type: "setLoading", isLoading: true });
  };

  const handleCheck = (id: number) => {
    const listItems = state.items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );

    dispatch({ type: "setItems", items: listItems });
    dispatch({ type: "setLoading", isLoading: true });
  };

  const handleDelete = (id: number) => {
    const listItems = state.items.filter((item) => item.id !== id);
    dispatch({ type: "setItems", items: listItems });
    dispatch({ type: "setLoading", isLoading: true });
  };

  const handleSubmit = () => {
    if (!state.newItem) return;
    addItem(state.newItem);
    dispatch({ type: "setNewItem", newItem: "" });
    dispatch({ type: "setLoading", isLoading: true });
  };

  return (
    <div className="app min-h-screen">
      <Header />
      <div className="main mx-auto min-h-[calc(100vh-144px)] w-full max-w-screen-lg">
        {state.isLoading && <Loading size={Size.Large} />}
        <AddItem
          newItem={state.newItem}
          setNewItem={(v: string) =>
            dispatch({ type: "setNewItem", newItem: v })
          }
          handleSubmit={handleSubmit}
        />
        <SearchItem
          search={state.search}
          setSearch={(v: string) => dispatch({ type: "setSearch", search: v })}
        />
        {!state.isLoading && (
          <Content
            items={state.items.filter((item) =>
              item.name.toLowerCase().includes(state.search.toLowerCase()),
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </div>
      <Footer length={state.items.length} />
    </div>
  );
};

export default App;
