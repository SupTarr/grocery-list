type PropsType = {
  search: string;
  setSearch(search: string): void;
};

const SearchItem = ({ search, setSearch }: PropsType) => {
  return (
    <form
      className="addForm flex flex-nowrap p-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="hidden" htmlFor="search">
        Search
      </label>
      <input
        className="max-w-[calc(21.25rem+48px)] input input-bordered mr- w-full"
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Items"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
