import React from "react";
import ReactDOM from "react-dom";
/**

  SearchComponent is a stated component which manages its open close state
  and invoke parents function when value of search string is updated.
  This is purely reusable component
*/
export default class SearchComponent extends React.Component {
  constructor() {

      super();
      this.state={
        mode : "default"
      };
  }

  onSearchBtnClick() {
    this.state.mode = "search";
    this.forceUpdate();
  }

  onSearchClose() {
    this.state.mode = "default";
    if(this.props.onSearchChange){
      this.props.onSearchChange("");
    }
  }

  onSearchChange(event){
    if(this.props.onSearchChange){
      this.props.onSearchChange(event.target.value);
    }
  }

  render() {
    let control = "";
    if(this.state.mode == "default") {
        return <div className="searchIcon" onClick={this.onSearchBtnClick.bind(this)}/>;

    } else if(this.state.mode == "search") {
        return  (<div className="searchBar">
                      <input type="text"
                             className="searchInput"
                             placeholder="Search"
                             onChange={this.onSearchChange.bind(this)}
                             />
                      <div className="searchCrossBtn" onClick={this.onSearchClose.bind(this)}/>
                    </div>);

    }

  }

}
