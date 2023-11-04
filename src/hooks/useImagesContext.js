import { useContext } from "react";

/***************************Local Imports **************/
import { ImagesContext } from "contexts/ImagesProvider";

const useImagesContext = () => {
    const imagesCtxValues = useContext(ImagesContext);

    return {
        ...imagesCtxValues,
    };
};

export default useImagesContext;
