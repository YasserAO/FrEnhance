import { useState } from "react";
import { TextToolButton } from "../Buttons/TextToolButton";
import PropTypes from "prop-types";
export const InsertAtext = ({ dashMode, setDashMode }) => {
  const [toggleForm, setToggleForm] = useState(false);

  if (![1, 2].includes(dashMode)) {
    return (
      <div className="col-span-2">
        <TextToolButton
          type={3}
          toggleForm={toggleForm}
          setToggleForm={setToggleForm}
          setDashMode={setDashMode}
        ></TextToolButton>
        {toggleForm && dashMode == 3 && (
          <div>
            <h1>Inserting Text here</h1>
            <button
              onClick={() => {
                setDashMode(0);
                setToggleForm(false);
              }}
              className="mx-auto block h-8 bg-white px-2"
            >
              Reset Here
            </button>
          </div>
        )}
      </div>
    );
  }
};

InsertAtext.propTypes = {
  dashMode: PropTypes.any,
  setDashMode: PropTypes.func,
};
