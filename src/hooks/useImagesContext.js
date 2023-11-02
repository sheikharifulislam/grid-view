import { ImagesContext } from "context/ImagesProvider";
import { useContext } from "react";

const useImagesContext = () => {
    const imagesCtxValues = useContext(ImagesContext);

    return {
        ...imagesCtxValues,
    };
};

export default useImagesContext;
