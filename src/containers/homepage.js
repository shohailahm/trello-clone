import React, { useState } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";

import Input from "../components/Input";
import { useDispatch } from "react-redux";
import { addBoard, addTASKS, DELETETASKS, setItems } from "../store/actions";
import { useSelector } from "react-redux";
import { uniqueId } from "../utils/utils";

const Homepage = () => {
  const [ShowAdd, setShowAdd] = useState(false);
  const [names, setnames] = useState({});
  const [title, settitle] = useState("");
  const dispatch = useDispatch();
  const boards = useSelector((state) => {
    return state.boards;
  });
  const data = useSelector((state) => {
    return state.data;
  });

  const onDrop = (item, monitor, board) => {
    const newData = () => {
      const newItems = data
        .filter((i) => i.id !== item.id)
        .concat({ ...item, board });
      return [...newItems];
    };
    dispatch(setItems(newData()));
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = data[dragIndex];
    let newData = () => {
      const newItems = data.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    };
    dispatch(setItems(newData()));
  };

  const showAddCB = () => {
    setShowAdd(true);
  };

  const addBoardCB = () => {
    if (!title) return;
    dispatch(addBoard(title));
    setShowAdd(false);
    settitle("");
  };

  const settitleCB = (e) => {
    settitle(e.target.value);
  };

  const setdynamicValue = (e) => {
    const {
      target: { value, name },
    } = e;

    setnames((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTask = (board) => {
    if (!names[board.id]) return;
    let obj = {
      id: uniqueId(),
      board: board.name,
      title: names[board.id],
      content: "",
    };
    dispatch(addTASKS(obj));
    setnames((prev) => ({
      ...prev,
      [board.id]: "",
    }));
  };
  const deleteItem = (id) => {
    dispatch(DELETETASKS(id));
  };
  return (
    <>
      {!ShowAdd && (
        <div className="row">
          <button className="btn-add" onClick={showAddCB}>
            Add Board
          </button>
        </div>
      )}
      {ShowAdd && (
        <div className="row">
          <Input
            placeholder="Enter Title"
            onChange={settitleCB}
            value={title}
          />
          <button className="btn-add" onClick={() => addBoardCB()}>
            Add Board
          </button>
        </div>
      )}
      <div className={"row"}>
        {boards.length > 0 &&
          boards.map((board) => {
            return (
              <div key={board.id} className={"col-wrapper"}>
                <h2 className={"col-header"}>{board.name.toUpperCase()}</h2>

                <DropWrapper onDrop={onDrop} board={board.name} boards={boards}>
                  <div>
                    <Input
                      name={board.id}
                      placeholder="Enter Title"
                      onChange={setdynamicValue}
                      value={names[board.id] || ""}
                    />
                    <button className="btn-add" onClick={() => addTask(board)}>
                      Add Task
                    </button>
                    {data
                      .filter((i) => i.board === board.name)
                      .map((i, idx) => {
                        return (
                          <Item
                            key={i.id}
                            item={i}
                            index={idx}
                            moveItem={moveItem}
                            board={board}
                            deleteItem={deleteItem}
                          />
                        );
                      })}
                  </div>
                </DropWrapper>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Homepage;
