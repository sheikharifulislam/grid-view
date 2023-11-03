import { Checkbox } from "@mantine/core";
import React, { forwardRef, useState } from "react";

/***************************Local Imports **************/
import useImagesContext from "hooks/useImagesContext";

const Image = forwardRef(({ image, index, style, ...props }, ref) => {
    const { selectedImages, setSelectedImages } = useImagesContext();
    const [hover, setHover] = useState(false);
    const selected = selectedImages.has(image.id);

    const handleImageSelect = ({ target }) => {
        const SelectedImagesSet = new Set(selectedImages);
        if (target.checked) {
            SelectedImagesSet.add(image.id);
        } else {
            SelectedImagesSet.delete(image.id);
        }
        setSelectedImages(SelectedImagesSet);
    };

    return (
        <div
            className="image"
            style={style}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div ref={ref} {...props} className="img-wrapper">
                <img src={image.src} />
                {(hover || selected) && (
                    <div
                        className={` overlay ${
                            selected ? "overlay-select" : "overlay-default"
                        }`}
                    ></div>
                )}
            </div>
            {(hover || selected) && (
                <div className="checkbox">
                    <Checkbox
                        onChange={(e) => handleImageSelect(e)}
                        checked={selected}
                        style={{
                            paddingTop: "5px",
                            paddingLeft: "5px",
                        }}
                    />
                </div>
            )}
        </div>
    );
});

export default Image;
