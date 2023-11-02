import imagesData from "data/images.json";
import React, { createContext, useState } from "react";

export const ImagesContext = createContext();

const ImagesProvider = ({ children }) => {
    const [images, setImages] = useState([...imagesData]);
    const [selectedImages, setSelectedImages] = useState(new Set());
    return (
        <ImagesContext.Provider
            value={{
                images,
                setImages,
                selectedImages,
                setSelectedImages,
            }}
        >
            {children}
        </ImagesContext.Provider>
    );
};

export default ImagesProvider;
