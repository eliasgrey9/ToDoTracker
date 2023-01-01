import "./App.css";
import React, { useState } from "react";
import cuid from "cuid";

function App() {
  const [activeLinkClicked, setActiveLinkClicked] = useState(true);
  const [completeLinkClicked, setCompleteLinkClicked] = useState(false);
  const [activeArr, setActiveArr] = useState([]);
  const [inputVal, setInputVal] = useState();
  const [disabledBtn, setDisabledBtn] = useState(false);

  const createListItem = (e) => {
    e.preventDefault();
    if (inputVal !== "") {
      setActiveArr((current) => [
        ...current,
        Object.assign({}, { inputVal, id: cuid(), complete: false }),
      ]);
      setInputVal("");
      console.log("active array", activeArr);
    } else {
      console.log("Nothing to submit!");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInputVal(e.target.value);
  };

  const showActive = () => {
    setActiveLinkClicked(true);
    setCompleteLinkClicked(false);
  };

  const showCompleted = () => {
    setCompleteLinkClicked(true);
    setActiveLinkClicked(false);
  };

  const updateArr = (item) => {
    const tempArr = [...activeArr];
    const index = tempArr.findIndex((arrItem) => arrItem.id === item.id);
    tempArr[index].complete = true;
    setActiveArr(tempArr);
  };

  const changeDisableBtn = () => {
    activeArr.length > 3 ? setDisabledBtn(true) : setDisabledBtn(false);
  };

  const incompleteItems = activeArr.filter((item) => !item.complete);
  const completeItems = activeArr.filter((item) => item.complete);
  console.log({ incompleteItems, completeItems });

  return (
    <>
      <div className="App">
        <div className="Static section">
          <header className="header">Task Tracker</header>

          <form onSubmit={createListItem}>
            <input
              maxLength={30}
              type="text"
              value={inputVal}
              onChange={(e) => handleChange(e)}
            ></input>
            <button
              className={disabledBtn === true ? "disableBtn" : ""}
              type="submit"
            >
              Add
            </button>
          </form>

          <div className="bottom-btns">
            <button className="btn" onClick={showActive}>
              Active
            </button>
            <button className="btn" onClick={showCompleted}>
              Complete
            </button>
          </div>
        </div>
        <div className="list-area">
          {activeLinkClicked ? (
            <div className="active-items">
              {incompleteItems.map((item) => (
                <div key={item.id} className="itemRow">
                  <button type="submit" onClick={() => updateArr(item)}>
                    &#x2714;
                  </button>
                  <li className="list-item">{item.inputVal}</li>
                </div>
              ))}
            </div>
          ) : (
            <div className="completed-items">
              {completeItems.map((item) => (
                <div key={item.id} className="completed-items">
                  <li className="list-item">{item.inputVal}</li>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
