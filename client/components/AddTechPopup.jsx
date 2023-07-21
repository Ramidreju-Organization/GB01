import React from 'react';

function AddTechPopup(props) {
  // console.log('props of AddTech Popup: ', props.overlayState)
  // const [showOverlay, setShowOverlay] = props.overlayState;
  // console.log(showOverlay, setShowOverlay);

  return (
    <div className="overlay">
      <div className="overlay-content">
        <form onSubmit={props.handleAddTechSubmit}>
          <div className="formGroup">
            <h2>Add Tech</h2>
            <input
              type="text"
              className="overlayName"
              placeholder="Add Tech Name"
              id='name'
            />

            <input
              type="text"
              className="overlayLink"
              placeholder="Add Tech URL"
              id="link"
            />
            <input
              type="text"
              className="overlayDescription"
              placeholder="Add Brief Description"
              id="description"
            />
            <input
              type="text"
              placeholder="add image url(optional)"
              id="image"
              className="overlayImage"
            />
            <div id="overlayButtonContainer" className="input-one">
              <input id="overlaySubmitButton" type="submit" value="Submit" />
              <button id="overlayCancelButton" onClick={props.overlayOff}>
                Cancel
              </button>
            </div>

            {/* <input type="file" className="input-one" accept="image/*" /> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTechPopup;
