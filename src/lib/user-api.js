import { httpErrorHandler } from "../utils/httpErrorHandler";
import axios from "axios";

export const getUserDetails = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/users/${id}`,
      config
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    const processedError = httpErrorHandler(error);
    throw processedError;
  }
};

export const updateUserProfile = async (token, data, userID) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/users/${userID}`,
      data,
      config
    );

    const tokenData = response.data.token;
    const nameData = response.data.name;

    window.sessionStorage.setItem("token", tokenData);
    window.sessionStorage.setItem("name", nameData);
    console.log(response.data);
  } catch (error) {
    //console.log(error)
    const processedError = httpErrorHandler(error);
    throw processedError;
  }
};

export const getMyTournaments = async ({
  id,
  token,
  search = "",
  page = 0,
  sortBy = "DESC",
  size = 8,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        sortBy,
        size,
      },
    };
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/users/${id}/tournaments`,
      config
    );
	console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    const processedError = httpErrorHandler(error);
    throw processedError;
  }
};
