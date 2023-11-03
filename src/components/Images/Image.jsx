import { Checkbox } from "@mantine/core";
import React, { forwardRef, useState } from "react";

/***************************Local Imports **************/
import useImagesContext from "hooks/useImagesContext";

const Image = forwardRef(
    ({ image, index, faded, style, activeId, overId, ...props }, ref) => {
        const { selectedImages, setSelectedImages } = useImagesContext();

        const [hover, setHover] = useState(false);

        const selected = selectedImages.has(image.id);

        const ImageStyles = {
            opacity: faded ? "0.2" : "1",
            transformOrigin: "0 0",
            // gridRowStart: index === 0 ? "span 2" : null,
            // gridColumnStart: index === 0 ? "span 2" : null,
            cursor: activeId ? "grabbing" : "pointer",
            // boxShadow: faded ? "34px 38px 239px 44px rgba(0,0,0,0.13)" : null,
            // zIndex: 2000,
            // zIndex: faded ? 2000 : 100,
            ...style,
        };

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
                style={ImageStyles}
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
    }
);

export default Image;
