import React, { useState } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import { data, boards } from "../utils/mockData";

const Homepage = () => {
  const [items, setItems] = useState(data);

  const onDrop = (item, monitor, board) => {
    const mapping = boards.find((si) => si.name === board.name);

    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, board });
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
            <DropWrapper onDrop={onDrop} board={board.name}>
              <div>
                {items
                  .filter((i) => i.board === board.name)
                  .map((i, idx) => {
                    return (
                      <Item
                        key={i.id}
                        item={i}
                        index={idx}
                        moveItem={moveItem}
                        board={board}
                      />
                    );
                  })}
              </div>
            </DropWrapper>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
