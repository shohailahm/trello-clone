import React from "react";
import { useDrop } from "react-dnd";

const DropWrapper = ({ onDrop, children, board, boards }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    canDrop: (item, monitor) => {
      const itemIndex = boards.findIndex((si) => si.name === item.board);
      const boardIndex = boards.findIndex((si) => si.name === board);
      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(boardIndex);
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, board);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={"drop-wrapper"}>
      {React.cloneElement(children, { isOver })}
    </div>
  );
};

export default DropWrapper;
