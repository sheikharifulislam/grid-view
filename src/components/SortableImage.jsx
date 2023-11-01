import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import Photo from "./Photo";

const SortableImage = (props) => {
    const { image } = props;
    const sortable = useSortable({ id: image.id });
    const {
        attributes,
        listeners,
        isDragging,
        setNodeRef,
        transform,
        transition,
    } = sortable;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Photo
            ref={setNodeRef}
            style={style}
            {...props}
            {...attributes}
            {...listeners}
            isDragging={isDragging}
        />
    );
};

export default SortableImage;
