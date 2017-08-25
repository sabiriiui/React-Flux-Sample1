import React from "react";
import ReactDOM from "react-dom";
import GridView from "./gridView.react";
import AppActions from "../actions/AppActions";
import { DataStore } from "../stores/DataStore";
export default class App extends React.Component{

  constructor() {

      super();
      this.state = this.getStateData(); //this will initiallize state with default values

  }

  getStateData(){
    return {
      data: DataStore.getData(),
      planetData: DataStore.getPlanetData(),
      searchString: DataStore.getSearchString(),
      displayPopUp: DataStore.getDisplayPopup()
    }
  }

  /**
    *  uodates states on change
    */
  _onChange() {

      this.setState(this.getStateData());

  }

  componentWillMount(){
    //whenever store will change and emit a change event _onChange function will be invoked to update state
    DataStore.addChangeListener(this._onChange.bind(this));
    //async call to load data in store
    AppActions.loadData("https://swapi.co/api/people");
  }

  componentWillUnMount(){

    DataStore.removeChangeListener(this._onChange);
  }

  render(){
    let developerInfo = ""
    let result = "";
    //before response of loading service call showing Data loading..
    if(Object.keys(this.state.data).length == 0){
      result =  <div>Data loading..</div>;
    }else{
      //Grid will be created after data loading
      result = <GridView data={this.state.data.results}
                      planetInfo = {this.state.planetData}
                      searchString  = {this.state.searchString}
                      displayPopUp = {this.state.displayPopUp}/>;

      developerInfo = <div className="developerInfo">
                                              Sabir Hussain<br/>
                                              email: sabir.iiui@gmail.com<br/>
                                              skype: sabir.elixir<br/>
                                          </div>;
    }

    return (<div className="appDiv">
                {result}
                {developerInfo}
            </div>);
  }

}

//this will mount whole app on assignment div which is created in index.html
ReactDOM.render(
    <App/>, document.getElementById("assignment")
  );
