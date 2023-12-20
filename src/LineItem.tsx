import { FaTrashAlt } from "react-icons/fa";
import { Item } from "./types/Item";

type PropsType = {
  item: Item;
  handleCheck(id: number): void;
  handleDelete(id: number): void;
};

const LineItem = ({ item, handleCheck, handleDelete }: PropsType) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        onChange={() => handleCheck(item.id)}
        checked={item.checked}
      />
      <label
        style={{ textDecoration: item.checked ? "line-through" : "" }}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.name}
      </label>
      <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        role="button"
        tabIndex="0"
        aria-label={`Delete ${item.name}`}
      />
    </li>
  );
};

export default LineItem;
