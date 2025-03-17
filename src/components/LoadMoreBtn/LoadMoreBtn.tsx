import s from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const LoadMoreBtn = ({ setPage }: LoadMoreBtnProps) => {
  return (
    <div className={s.btnContainer}>
      <button className={s.btn} onClick={() => setPage((prev) => prev + 1)}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
