import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImagesWithTopic } from "./images-api";
import { Image } from "./types";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchImagesWithTopic(query, page);
        setImages((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    if (query === newQuery) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotalPages(0);
  };

  const handleOpenModal = (image: Image) => {
    if (!modalIsOpen) {
      setCurrentImage(image);
      setModalIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setCurrentImage(null);
    setModalIsOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleOpenModal} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}

      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn setPage={setPage} />
      )}

      {modalIsOpen && currentImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onCloseModal={handleCloseModal}
          currentImage={currentImage}
        />
      )}
    </>
  );
}

export default App;
