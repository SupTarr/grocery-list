import { Item } from "./types/Item";
import LineItem from "./LineItem";
import { Alert, AlertType } from "./Alert";

type PropsType = {
  items: Item[];
  handleCheck(id: number): void;
  handleDelete(id: number): void;
};

const Content = ({ items, handleCheck, handleDelete }: PropsType) => {
  return (
    <main>
      {items.length ? (
        <ul className="flex flex-col gap-5 p-5">
          {items.map((item) => (
            <LineItem
              key={item.id}
              item={item}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      ) : (
        <Alert type={AlertType.Info} message="Your list is empty." />
      )}
    </main>
  );
};

export default Content;
