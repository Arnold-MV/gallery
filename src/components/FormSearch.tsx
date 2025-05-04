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
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </nav>
  );
};
