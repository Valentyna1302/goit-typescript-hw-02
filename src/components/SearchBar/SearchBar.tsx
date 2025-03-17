import { FormEvent } from "react";
import toast from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import s from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (topic: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const topicInput = form.elements.namedItem("topic") as HTMLInputElement;
    const topic = topicInput ? topicInput.value : "";
    if (topic.trim() === "") {
      toast.error("Please enter search term!");
      return;
    }

    onSubmit(topic);
    form.reset();
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit}>
        <div className={s.inputWrapper}>
          <button className={s.btn} type="submit">
            <IoIosSearch />
          </button>
          <input
            className={s.input}
            type="text"
            name="topic"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
