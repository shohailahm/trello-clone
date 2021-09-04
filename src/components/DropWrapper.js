import React from "react";
import { useDrop } from "react-dnd";
import { boards } from "../utils/mockData";

const DropWrapper = ({ onDrop, children, status }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    canDrop: (item, monitor) => {
      const itemIndex = boards.findIndex((si) => si.name === item.status);
      const statusIndex = boards.findIndex((si) => si.name === status);
      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
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
