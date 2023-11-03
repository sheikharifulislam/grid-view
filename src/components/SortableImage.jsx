import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import Image from "./Image";

const SortableImage = (props) => {
    const { image } = props;
    const sortable = useSortable({ id: image.id });
    const { attributes, listeners, setNodeRef, transform, transition } =
        sortable;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Image
            ref={setNodeRef}
            style={style}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
};

export default SortableImage;
