import { Image } from "../../types";
import s from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => {
  const { urls, alt_description } = image;
  return (
    <div>
      <img
        className={s.img}
        src={urls.small}
        alt={alt_description || "Image"}
        onClick={() => onClick(image)}
      />
    </div>
  );
};

export default ImageCard;
