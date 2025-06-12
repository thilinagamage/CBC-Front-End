import { useState } from "react";

export default function ImageSlider({ images, galleryimages = [] }) {
   const allImages = [...(images || []), ...galleryimages].filter(Boolean);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
       
        
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % allImages.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
        
    };

    return (
        <div className=" w-full h-full relative flex flex-row items-center justify-center p-4">
             {/* Thumbnail row */}
            <div className="flex-row absolute left-15 z-10 overflow-x-auto">
{allImages.map((img, index) => (
  <div
    key={index}
    className="border-2 border-amber-200 rounded mb-1"
  >
    <img
      src={img}
      alt={`Thumbnail ${index + 1}`}
      className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
        index === currentIndex ? "border-amber-600" : "border-transparent"
      }`}
      onClick={() => handleThumbnailClick(index)}
    />
  </div>
))}

            </div>


            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded shadow mb-4">
                <img
                    src={allImages[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    className="w-full h-full  rounded transition duration-300"
                />
                {/* Nav arrows */}
                {allImages.length > 1 && (
                    <>
                        <button onClick={goToPrev} className="absolute left-20 top-4/5 -translate-y-1/2 bg-amber-600 text-white px-3 py-1 rounded-full shadow hover:bg-amber-300">
                            ‹
                        </button>
                        <button onClick={goToNext} className="absolute right-9 top-4/5 -translate-y-1/2 bg-amber-600 text-white px-3 py-1 rounded-full shadow hover:bg-amber-300">
                            ›
                        </button>
                    </>
                )}
            </div>


        </div>
    );
}
