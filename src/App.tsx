import { useReducer, useEffect } from "react";
import { Item } from "./types/Item";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import Content from "./Content";
import Footer from "./Footer";
import { Alert, AlertType } from "./Alert";
import { Loading, Size } from "./Loading";
import Api from "./Api";

type Action =
  | { type: "setItems"; items: Item[]; loading: boolean; error: Error | null }
  | { type: "setNewItem"; newItem: string }
  | { type: "setSearch"; search: string };

type State = {
  items: Item[];
  newItem: string;
  search: string;
  loading: boolean;
  error: Error | null;
};

const App = () => {
  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "setItems":
          return {
            ...state,
            items: action.items,
            loading: action.loading,
            error: action.error,
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
      items: [],
      newItem: "",
      search: "",
      loading: true,
      error: null,
    },
  );

  const API_URL = "http://localhost:3500";

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        try {
          const response = await fetch(API_URL + "/items");
          if (!response.ok) throw new Error("Did not receive expected data");
          const listItems = await response.json();
          dispatch({
            type: "setItems",
            items: listItems,
            loading: false,
            error: null,
          });
        } catch (e) {
          console.log(`>> error: ${(e as Error).message}`);
          dispatch({
            type: "setItems",
            items: [],
            loading: false,
            error: e as Error,
          });
        }
      })();
    }, 2000);
  }, []);

  const addItem = async (name: string) => {
    const id = state.items.length
      ? state.items[state.items.length - 1].id + 1
      : 1;
    const myNewItem = { id, checked: false, name };
    const listItems = [...state.items, myNewItem];
    dispatch({
      type: "setItems",
      items: listItems,
      loading: false,
      error: null,
    });

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };
    const result = await Api(API_URL + "/items/", postOptions);
    if (result)
      dispatch({
        type: "setItems",
        items: state.items,
        loading: false,
        error: new Error(result),
      });
  };

  const handleCheck = async (id: number) => {
    const listItems = state.items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    dispatch({
      type: "setItems",
      items: listItems,
      loading: false,
      error: null,
    });

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const result = await Api(API_URL + `/items/${id}`, updateOptions);
    if (result)
      dispatch({
        type: "setItems",
        items: state.items,
        loading: false,
        error: new Error(result),
      });
  };

  const handleDelete = async (id: number) => {
    const listItems = state.items.filter((item) => item.id !== id);
    dispatch({
      type: "setItems",
      items: listItems,
      loading: false,
      error: null,
    });

    const deleteOptions = {
      method: "DELETE",
    };
    const result = await Api(API_URL + `/items/${id}`, deleteOptions);
    if (result)
      dispatch({
        type: "setItems",
        items: state.items,
        loading: false,
        error: new Error(result),
      });
  };

  const handleSubmit = () => {
    if (!state.newItem) return;
    addItem(state.newItem);
    dispatch({ type: "setNewItem", newItem: "" });
  };

  return (
    <div className="app min-h-screen">
      <Header />
      <div className="main mx-auto min-h-[calc(100vh-144px)] w-full max-w-screen-lg">
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
        {state.loading && <Loading size={Size.Large} />}
        {state.error != null && (
          <Alert type={AlertType.Error} message={state.error.message} />
        )}
        {state.error == null && !state.loading && (
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
