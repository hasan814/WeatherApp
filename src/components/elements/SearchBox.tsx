import { SearchProps } from "@/types";
import { IoSearch } from "react-icons/io5";
import { cn } from "@/utils/cn";

const SearchBox = ({ value, onChange, onSubmmit, className }: SearchProps) => {
  return (
    <form
      onSubmit={onSubmmit}
      className={cn(
        "flex relative items-center justify-center h-10",
        className
      )}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search Location"
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      />
      <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full">
        <IoSearch />
      </button>
    </form>
  );
};

export default SearchBox;
