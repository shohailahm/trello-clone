import React, { useState } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import { data, boards } from "../utils/mockData";

const Homepage = () => {
  const [items, setItems] = useState(data);

  const onDrop = (item, monitor, status) => {
    const mapping = boards.find((si) => si.status === status);

    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status, icon: mapping.icon });
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  return (
    <div className={"row"}>
      {boards.map((board) => {
        return (
          <div key={board.id} className={"col-wrapper"}>
            <h2 className={"col-header"}>{board.name.toUpperCase()}</h2>
            <DropWrapper onDrop={onDrop} status={board.name}>
              <div>
                {items
                  .filter((i) => i.board === board.name)
                  .map((i, idx) => (
                    <Item
                      key={i.id}
                      item={i}
                      index={idx}
                      moveItem={moveItem}
                      baord={board}
                    />
                  ))}
              </div>
            </DropWrapper>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
