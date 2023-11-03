import { useContext } from "react";

/***************************Local Imports **************/
import { ImagesContext } from "context/ImagesProvider";

const useImagesContext = () => {
    const imagesCtxValues = useContext(ImagesContext);

    return {
        ...imagesCtxValues,
    };
};

export default useImagesContext;
