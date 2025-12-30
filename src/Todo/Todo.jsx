import "./todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDog,
  faTrash,
  faPenToSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Todo = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [updateIndex, setUpdateIndex] = useState(null);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleAdd = () => {
    if (input == undefined || input == "") {
      return;
    }

    if (updateIndex !== null) {
      let tempList = [...list];
      tempList[updateIndex] = input;

      setList([...tempList]);
      setUpdateIndex(null);
    } else {
      setList([input, ...list]);
    }
    setInput("");

    // setList([])
  };
  const handleClearAll = () => {
    setList([]);
  };
  const deleteHandler = (index) => {
    setList(
      list.filter((_, i) => {
        return index !== i;
      })
    );
  };
  const updateHandler = (index) => {
    setInput(list[index]);
    setUpdateIndex(index);
  };

  return (
    <div className="SimpleTodo">
      <div>
        <div className="containertodo">
          <div className="header">
            <FontAwesomeIcon
              icon={faDog}
              style={{ color: "green", fontSize: "35px" }}
            />
            <h1>Todo App</h1>
          </div>

          <div className="input_area">
            <input
              type="text"
              style={{ color: "black" }}
              placeholder="Add your todo"
              value={input}
              onChange={(e) => handleChange(e)}
            />
            {updateIndex !==null ? (
              <button className="add-btn" onClick={handleAdd}>
                <FontAwesomeIcon style={{ fontSize: "14px" }} icon={faCheck} />
              </button>
            ) : (
              <button className="add-btn" onClick={handleAdd}>
                +
              </button>
            )}
          </div>

          <div className="task-list">
            {list.map((element, index) => {
              return (
                <div
                  className="task done"
                  key={index}
                  style={
                    updateIndex !== null && index == updateIndex
                      ? { backgroundColor: "rgba(255, 212, 131, 1)" }
                      : { backgroundColor: "beige" }
                  }
                >
                  {element}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    {" "}
                    <button
                      style={{ backgroundColor: "transparent", color: "black" }}
                      className="delete-btn update-btn"
                      onClick={() => updateHandler(index)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      style={{ backgroundColor: "transparent", color: "red" }}
                      className="delete-btn"
                      onClick={() => deleteHandler(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="footer">
            <p>
              You have{" "}
              <strong>
                {list.length}
                <span> Work</span>
              </strong>
            </p>
            <button className="clear-btn" onClick={handleClearAll}>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
