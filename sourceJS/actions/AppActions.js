
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
const AppActions  = {


    loadData: function(url) {

        AppDispatcher.dispatch({
            actionType: AppConstants.LOAD_DATA,
            url
        });

    },

    setDisplayPopup: function(value){
      AppDispatcher.dispatch({
          actionType: AppConstants.DISPLAY_POPUP,
          value
      });
    },

    loadPlanetData: function(url) {

        AppDispatcher.dispatch({
            actionType: AppConstants.LOAD_PLANET_DATA,
            url
        });

    },

    onSearchChange: function(str) {

        AppDispatcher.dispatch({
            actionType: AppConstants.SEARCH_CHANGE,
            searchString: str
        });

    },


};

export default AppActions;
