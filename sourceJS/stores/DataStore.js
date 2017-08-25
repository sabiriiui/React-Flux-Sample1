import DataConstants from "../constants/AppConstants";
import EventEmitter from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
let CHANGE_EVENT = "change";
/*
DataStore is mantaining data for diffrent compononent
All data is being provided by single source to make sure (source of truth)
*/
export default class DataStoreClass extends  EventEmitter{

    constructor() {
        super();
        this.data = {};
        this.planetData={};
        this.searchString = "";

    }

    getSearchString(){
      return this.searchString;
    }

    setSearchString(value){
      this.searchString = value;
    }

    getData(){
      return this.data;
    }

    setData(data){
      this.data = data;
    }

    getPlanetData(){
      return this.planetData;
    }

    setPlanetData(pData){
      this.planetData = pData;
    }

    getDisplayPopup(){
      return this.displayPopUp;
    }

    setDisplayPopup(val){
      this.displayPopUp = val;
    }

    //async call which use fetch API to load grid data
    loadDataInStore(url){
      const dataPromise = fetch(url);
      dataPromise.then(rawData=>{
        rawData.json().then(data=>{
          this.setData(data);
          this.emitChange();
        });
      });
    }
    //async call which use fetch API to load Planet information
    loadPlanetData(url){
      const dataPromise = fetch(url);
      dataPromise.then(rawData=>{
        rawData.json().then(data=>{
          this.displayPopUp = true;
          this.setPlanetData(data);
          this.emitChange();
        });
      });
    }

    emitChange() {

      this.emit(CHANGE_EVENT);

  }

  addChangeListener(callback) {

      this.on(CHANGE_EVENT, callback);

  }

  removeChangeListener(callback) {

      this.removeListener(CHANGE_EVENT, callback);

  }
}
export const DataStore = new DataStoreClass();
DataStore.dispatchToken = AppDispatcher.register((action) => {

    switch (action.actionType) {

      case DataConstants.LOAD_DATA:
        DataStore.loadDataInStore(action.url);
        break;

      case DataConstants.LOAD_PLANET_DATA:
        DataStore.loadPlanetData(action.url);
        break;

      case DataConstants.SEARCH_CHANGE:
        DataStore.setSearchString(action.searchString);
        DataStore.emitChange();
        break;

      case DataConstants.DISPLAY_POPUP:
        DataStore.setDisplayPopup(action.value);
        DataStore.emitChange();
        break;
    }

});
