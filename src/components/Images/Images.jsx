import {
    closestCenter,
    DndContext,
    DragOverlay,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
} from "@dnd-kit/sortable";
import { Flex } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto } from "@tabler/icons-react";
import React, { useState } from "react";

/***************************Local Imports **************/
import useImagesContext from "hooks/useImagesContext";
import SortableImage from "./SortableImage";

const Images = () => {
    const { images, setImages } = useImagesContext();
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragCancel() {
        setActiveId(null);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
            setImages((images) => {
                const oldIndex = images.findIndex(
                    (image) => image.id === active.id
                );
                const newIndex = images.findIndex(
                    (image) => image.id === over.id
                );

                return arrayMove(images, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }

    const handleFileDrop = (files) => {
        const data = files.map((file) => {
            const url = URL.createObjectURL(file);
            return {
                src: url,
                id: Date.now() + Math.random() * 1000,
            };
        });
        setImages((prv) => [...prv, ...data]);
    };

    return (
        <DndContext
            autoScroll={true}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={images} strategy={rectSortingStrategy}>
                <div className="image-gallery">
                    {images.map((image, index) => (
                        <SortableImage
                            key={image.id}
                            image={image}
                            index={index}
                        />
                    ))}
                    <Dropzone
                        onDrop={handleFileDrop}
                        maxSize={3 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                        height="100%"
                        style={{
                            border: "1px dotted gray",
                            borderRadius: "4px",
                        }}
                    >
                        <Flex
                            justify="center"
                            align="center"
                            direction="column"
                            style={{
                                height: "100%",
                            }}
                        >
                            <div
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                <IconPhoto />
                                <br />
                                <span>Add Images</span>
                            </div>
                        </Flex>
                    </Dropzone>
                </div>
                <DragOverlay adjustScale={true}>
                    {activeId ? (
                        <div className="drag-overlay-inner">
                            <img
                                src={
                                    images.find((img) => img.id === activeId)
                                        .src
                                }
                            />
                        </div>
                    ) : null}
                </DragOverlay>
            </SortableContext>
        </DndContext>
    );
};

export default Images;
