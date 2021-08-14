import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";

export class Api {
  static async getImages(query, page) {
    const API_KEY = "6482848-443bdcc87ab7c743d3374b0c5";
    const params = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const { data } = await axios.get(params);
    return data.hits;
  }
}

export const getImages = async (query, page) => {
  const API_KEY = "6482848-443bdcc87ab7c743d3374b0c5";

  const params = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const { data } = await axios.get(params);
  console.log(data.hits);
  return data.hits;
};
