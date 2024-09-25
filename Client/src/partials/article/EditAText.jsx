import { useState } from "react";
import { EditAtextButton } from "../Buttons/EditAtextButton";
export const EditAText = ({ dashMode, setDashMode }) => {
  const [toggleForm, setToggleForm] = useState(false);

  if (dashMode !== 1) {
    return (
      <div>
        <EditAtextButton
          toggleForm={toggleForm}
          setToggleForm={setToggleForm}
          setDashMode={setDashMode}
        ></EditAtextButton>
        {toggleForm && dashMode == 2 && (
          <div>
            <h1>Text Editing Here</h1>
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
