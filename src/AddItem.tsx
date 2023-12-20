import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

type PropsType = {
  newItem: string;
  setNewItem(item: string): void;
  handleSubmit(): void;
};

const AddItem = ({ newItem, setNewItem, handleSubmit }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="addForm p-5 flex flex-nowrap"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className="hidden" htmlFor="addItem">
        Add Item
      </label>
      <input
        className="input input-bordered w-full max-w-xs mr-5"
        autoFocus
        ref={inputRef}
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        className="btn"
        type="submit"
        aria-label="Add Item"
        onClick={() => (inputRef.current ? inputRef.current.focus() : null)}
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
