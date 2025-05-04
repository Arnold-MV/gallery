import { useEffect, useState, useRef } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

import { FormSearch } from "./FormSearch";
import ImageCard from "./ImageCard";
import { getPopularImages, searchImages } from "../services/pexelsService";
import type { PexelsPhoto } from "../services/pexelsService.types";

interface Props {
  apiKey: string;
}

export const ImageGallery = ({ apiKey }: Props) => {
  const [images, setImages] = useState<PexelsPhoto[]>([]);
  const [searchQuery, setSearchQuery] = useState("nature");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const fetchImages = async (
    query = searchQuery,
    pageNum = page,
    append = false
  ) => {
    setLoading(true);
    try {
      const data =
        query.trim() === ""
          ? await getPopularImages(apiKey, pageNum)
          : await searchImages(query, apiKey, pageNum);

      setImages((prev) => (append ? [...prev, ...data.photos] : data.photos));
      setPage(pageNum);
    } catch (error) {
      console.error("Error al cargar imágenes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, [images]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(searchQuery, page + 1, true);
  };

  return (
    <>
      <main className="max-xl:px-4 flex flex-col gap-y-4">
        <FormSearch
          onSearch={(query) => {
            setSearchQuery(query);
            fetchImages(query, 1); // Ejecuta nueva búsqueda
          }}
        />

        <div
          id="gallery"
          ref={galleryRef}
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 "
        >
          {images.length > 0
            ? images.map((image) => <ImageCard key={image.id} image={image} />)
            : !loading && (
                <p>No se encontraron imágenes. Intenta con otra búsqueda.</p>
              )}
        </div>

        {loading && <p className="text-center mt-4">Cargando imágenes...</p>}

        {images.length > 0 && !loading && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Ver más
            </button>
          </div>
        )}
      </main>
    </>
  );
};
