import React from "react";
/*
Popup is props based component which shows data provided by parent and invoke parents function when cancel button is clicked
This is purely resuable component
It can show any type of data (table, div, span etc) which is provided in "props.children"
*/
export default class Popup extends React.Component {

  constructor() {

    super();
    this.config = {};

  }

  handlePopupClose(event) {

    if(this.props.onCancelClick)
       this.props.onCancelClick();

  }

  render() {

      return(
          <div className="popupMainDiv">

            <div className="popupOverlay" ></div>
            <div className="popupWindow">
              <div className="popupDiv">
                    <div>
          						<div><span className= "panelTitle">{this.props.title}</span></div>
                      <div className="crossButton"
                        onMouseDown = {this.handlePopupClose.bind(this)}></div>
                    </div>
                    <div className="popupcontent">
                      {this.props.children}
                    </div>
              </div>
            </div>
        </div>);

  }

}
