// FormSearch.tsx
import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export const FormSearch = ({ onSearch }: Props) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <nav className="w-full ">
      <div className="flex w-full justify-end">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex items-center rounded-lg px-2.5 py-1 gap-x-1"
        >
          <input
            className="outline-none"
            type="text"
            placeholder="Buscar..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="cursor-pointer" type="submit">
            <img
              width="30px"
              height="30px"
              src="./src/assets/search.svg"
              alt=""
            />
          </button>
        </form>
      </div>
    </nav>
  );
};
