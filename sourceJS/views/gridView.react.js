import React from "react";
import Popup from "./popupView.react";
import SearchControl from "./search.react";
import AppActions from "../actions/AppActions";
/**
* GridView is not a stated component it receives data from its parent component and diplay it
* and call some actions which in result change its parent's state
*/
export default class GridView extends React.Component{

  constructor(){
      super();
  }

  onPopupCancel(){
    AppActions.setDisplayPopup(false);
  }

  onClickLink(event){
    event.preventDefault();
    AppActions.loadPlanetData(event.target);
  }

  onSearchChange(value){
    AppActions.onSearchChange(value);
  }

  getPopupContents(){
    return <table className="dataTable">
      <tbody>
        <tr>
          <td className="labelTD">Name</td> <td>{this.props.planetInfo.name}</td>
        </tr>
        <tr>
          <td className="labelTD">Diameter</td> <td>{this.props.planetInfo.diameter}</td>
        </tr>
        <tr>
          <td className="labelTD">Population</td> <td>{this.props.planetInfo.population}</td>
        </tr>
        <tr>
          <td className="labelTD">Climate</td> <td>{this.props.planetInfo.climate}</td>
        </tr>
      </tbody>
    </table>;
  }

  getHeader(){
    return <tr className="header">
              <td>
                <div style={{display:"flex", alignItems:"center"}}>
                  <span style={{marginRight:"10px"}}>Name</span>
                  <SearchControl onSearchChange={this.onSearchChange.bind(this)}/>
                </div>
              </td>
              <td>Height</td>
              <td>Mass</td>
              <td>Created</td>
              <td>Edited</td>
              <td>Planet(Link)</td>
          </tr>;
  }

  render(){

      let rows = [];
      let data = this.props.data;
      if(data.length > 0){
        //if we have some searchString then filter items from array that contains searchString
        if(this.props.searchString != ""){
          let filteredData = data.filter(o=>o.name.indexOf(this.props.searchString) > -1);
          data = filteredData;
        }
        rows.push(this.getHeader());
        data.map(obj=>{
          let {name,height,mass,created,edited,homeworld} = obj; //destructuring
          rows.push(<tr>
                      <td>{name}</td>
                      <td>{height}</td>
                      <td>{mass}</td>
                      <td>{created}</td>
                      <td>{edited}</td>
                      <td><a href={homeworld} onClick={this.onClickLink.bind(this)}>{homeworld}</a></td>
                    </tr>);
        });
      }

      const popup = (this.props.planetInfo == null || !this.props.displayPopUp)?"": <Popup title = "Planet Information" onCancelClick = {this.onPopupCancel.bind(this)} data={this.props.planetInfo}>
                    {this.getPopupContents()}
                </Popup>

      return (<div className="gridView">
                <div className="dataDiv">
                  <table className="dataTable">
                    <tbody>
                      {rows}
                    </tbody>
                  </table>
                </div>
                {popup}
            </div>);

  }

}
