import Modal from "react-modal";
import { Image } from "../../types";
import s from "./ImageModal.module.css";

interface ImageModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  currentImage: Image;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    padding: "5px",
  },
};

Modal.setAppElement("#root");

const ImageModal = ({
  isOpen,
  onCloseModal,
  currentImage,
}: ImageModalProps) => {
  if (!isOpen || !currentImage) return null;

  const {
    likes,
    alt_description,
    urls,
    user: { name },
  } = currentImage;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      contentLabel="Image Modal"
      style={customStyles}
      overlayClassName={s.Overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={s.modal}>
        <img
          src={urls.regular}
          alt={alt_description || "Image"}
          className={s.modalImage}
        />
        <div className={s.text}>
          <p>likes: {likes}</p>
          <p>artist: {name}</p>
        </div>

        <button onClick={onCloseModal} className={s.modalBtn}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
