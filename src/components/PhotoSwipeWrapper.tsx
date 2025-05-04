import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import PhotoSwipe from "photoswipe";

import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

// Definimos tipos para las referencias expuestas
export interface PhotoSwipeRef {
  openPhotoSwipe: (index: number, items: any[], options?: any) => void;
}

const PhotoSwipeWrapper = forwardRef<PhotoSwipeRef>((props, ref) => {
  const pswpRef = useRef<HTMLDivElement>(null);
  const photoSwipeInstance = useRef<PhotoSwipe | null>(null);

  // Exponemos métodos a través de la ref para que el componente padre pueda acceder
  useImperativeHandle(ref, () => ({
    openPhotoSwipe: (index, items, options = {}) => {
      const pswpElement = pswpRef.current;

      if (!pswpElement) return;

      // Opciones por defecto de PhotoSwipe
      const defaultOptions = {
        index: index,
        bgOpacity: 0.85,
        showHideOpacity: true,
        history: false,
        shareEl: false,
        getThumbBoundsFn: (index: number) => {
          // Encuentra el elemento de la imagen en el DOM
          const thumbnail = document.querySelectorAll(".gallery-item")[
            index
          ] as HTMLElement;
          if (!thumbnail) return { x: 0, y: 0, w: 0 };

          const pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          const rect = thumbnail.getBoundingClientRect();

          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
      };

      // Inicializa PhotoSwipe
      photoSwipeInstance.current = new PhotoSwipe({
        galleryUID: pswpElement?.getAttribute("data-pswp-uid") || "",
        dataSource: items,
        ...defaultOptions,
        ...options,
      });

      photoSwipeInstance.current.init();
    },
  }));

  // Limpieza al desmontar el componente
  useEffect(() => {
    return () => {
      if (photoSwipeInstance.current) {
        photoSwipeInstance.current.close();
        photoSwipeInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      className="pswp"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
      ref={pswpRef}
    >
      <div className="pswp__bg"></div>
      <div className="pswp__scroll-wrap">
        <div className="pswp__container">
          <div className="pswp__item"></div>
          <div className="pswp__item"></div>
          <div className="pswp__item"></div>
        </div>
        <div className="pswp__ui pswp__ui--hidden">
          <div className="pswp__top-bar">
            <div className="pswp__counter"></div>
            <button
              className="pswp__button pswp__button--close"
              title="Close (Esc)"
            ></button>
            <button
              className="pswp__button pswp__button--share"
              title="Share"
            ></button>
            <button
              className="pswp__button pswp__button--fs"
              title="Toggle fullscreen"
            ></button>
            <button
              className="pswp__button pswp__button--zoom"
              title="Zoom in/out"
            ></button>
            <div className="pswp__preloader">
              <div className="pswp__preloader__icn">
                <div className="pswp__preloader__cut">
                  <div className="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div className="pswp__share-tooltip"></div>
          </div>
          <button
            className="pswp__button pswp__button--arrow--left"
            title="Previous (arrow left)"
          ></button>
          <button
            className="pswp__button pswp__button--arrow--right"
            title="Next (arrow right)"
          ></button>
          <div className="pswp__caption">
            <div className="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Nombre para la ref en DevTools
PhotoSwipeWrapper.displayName = "PhotoSwipeWrapper";

export default PhotoSwipeWrapper;
