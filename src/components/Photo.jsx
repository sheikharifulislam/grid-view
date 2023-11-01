import { Checkbox } from "@mantine/core";
import React, { forwardRef } from "react";
import "./photo.css";

const Photo = forwardRef(
    ({ image, index, faded, style, isDragging, ...props }, ref) => {
        const inlineStyles = {
            opacity: faded ? "0.2" : "1",
            transformOrigin: "0 0",
            // height: index === 0 ? 410 : 200,
            gridRowStart: index === 0 ? "span 2" : null,
            gridColumnStart: index === 0 ? "span 2" : null,
            cursor: isDragging ? "grabbing" : "pointer",
            ...style,
        };

        return (
            <div
                className="photo"
                style={{
                    ...inlineStyles,
                    position: "relative",
                    overflow: "hidden",
                }}
                ref={ref}
                {...props}
            >
                <img src={image.src} className="image" />
                <div className="overlay">
                    <Checkbox
                        style={{
                            paddingTop: "5px",
                            paddingLeft: "5px",
                        }}
                    />
                </div>
            </div>
        );
    }
);

export default Photo;
