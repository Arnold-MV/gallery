import type { PexelsPhoto } from "../lib/types/image.types";

interface ImageCardProps {
  image: PexelsPhoto;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <a
      href={image.src.original}
      data-pswp-width={image.width}
      data-pswp-height={image.height}
    >
      <img
        src={image.src.medium}
        alt={image.photographer}
        className="w-full rounded-lg mb-4 break-inside-avoid"
      />
    </a>
  );
};

export default ImageCard;
