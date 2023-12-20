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
      <div className="card max-w-2xl bg-neutral shadow-xl">
        <div className="card-body p-5">
          <div className="card-actions flex-nowrap justify-between">
            <div className="mt-1 flex gap-5">
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
            </div>

            <button
              className="btn btn-square btn-sm"
              onClick={() => handleDelete(item.id)}
              role="button"
              aria-label={`Delete ${item.name}`}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LineItem;
