import axios from "axios";

const apiURL = 'http://dataservice.accuweather.com';


  
/**
 * Get session
 * @param query
 * @returns {AxiosPromise}
 */
export const getWeather = (url) => {  
    return axios({
      url: `${apiURL}/${url}`,
      method: "GET"
    });
  };

  
