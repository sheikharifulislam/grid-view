import { Button, Checkbox, Flex } from "@mantine/core";
import React, { useState } from "react";

/***************************Local Imports **************/
import useImagesContext from "hooks/useImagesContext";

const Header = () => {
    const [selected, setSelected] = useState(false);
    const { selectedImages, setSelectedImages, images, setImages } =
        useImagesContext();

    const handleSelectAllImages = ({ target }) => {
        const selectedImagesSet = new Set(selectedImages);
        setSelected(target.checked);
        if (target.checked) {
            images.forEach((image) => {
                selectedImagesSet.add(image.id);
            });
        } else {
            selectedImagesSet.clear();
        }

        setSelectedImages(selectedImagesSet);
    };

    const handleDeleteImages = () => {
        const selectedImagesSet = new Set(selectedImages);
        const filteredImages = images.filter((image) => {
            if (selectedImagesSet.has(image.id)) {
                selectedImagesSet.delete(image.id);
                return false;
            }
            return true;
        });
        setSelectedImages(selectedImagesSet);
        setImages(filteredImages);
    };

    return (
        <Flex
            justify="space-between"
            align="center"
            style={{
                padding: "10px 15px",
                borderBottom: "1px solid #eee",
            }}
        >
            <Checkbox
                label={`${new Set(selectedImages).size} File Selected`}
                onChange={(e) => handleSelectAllImages(e)}
                {...(selectedImages.size === 0
                    ? { checked: false }
                    : { checked: selected })}
            />
            <Button
                variant="filled"
                color="red"
                onClick={handleDeleteImages}
                disabled={!selectedImages.size}
            >
                Delete Files
            </Button>
        </Flex>
    );
};

export default Header;
