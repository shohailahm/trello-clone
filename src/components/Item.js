import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import ModalComponent from "./Modal";

const Item = ({ item, index, moveItem, board, deleteItem }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "ITEM",
    drop: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: () => ({ ...item, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [show, setShow] = useState(false);

  const onOpen = () => {
    setShow(true);
  };

  const onClose = () => setShow(false);

  drag(drop(ref));

  return (
    <>
      <div
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className={"item"}
        onClick={onOpen}
      >
        <div
          className={"color-bar"}
          style={{ backgroundColor: board?.color || "white" }}
        />
        <p className={"item-title"}>{item.title}</p>
        <button onClick={() => deleteItem(item.id)}>Delete</button>
      </div>
      <ModalComponent item={item} onClose={onClose} show={show} />
    </>
  );
};

export default Item;
