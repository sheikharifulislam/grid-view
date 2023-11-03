import { Button, Checkbox, Flex } from "@mantine/core";
import useImagesContext from "hooks/useImagesContext";
import React from "react";

const Header = () => {
    const { selectedImages, setSelectedImages, images, setImages } =
        useImagesContext();

    const handleSelectAllImages = ({ target }) => {
        const selectedImagesSet = new Set(selectedImages);
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
            }}
        >
            <Checkbox
                label={`${new Set(selectedImages).size} File Selected`}
                onChange={(e) => handleSelectAllImages(e)}
                {...(selectedImages.size === 0 ? { value: false } : {})}
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
