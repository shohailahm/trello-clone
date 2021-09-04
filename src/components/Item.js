import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const Item = ({ item, index, moveItem, board }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "ITEM",
    hover(item, monitor) {
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
    item: { type: "ITEM", ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [show, setShow] = useState(false); //TODO: to add modal later

  const onOpen = () => setShow(true); //TODO: modal method

  const onClose = () => setShow(false); //TODO: modal method

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
          style={{ backgroundColor: board.color || "white" }}
        />
        <p className={"item-title"}>{item.content}</p>
      </div>
    </>
  );
};

export default Item;
