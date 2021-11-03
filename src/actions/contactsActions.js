import { CONTACTS } from "./types";
import axios from "axios";

export const requestContacts = () => async (dispatch) => {
  dispatch({ type: CONTACTS.LOAD });
  try {
    const res = await axios.get("data.json");

    dispatch({
      type: CONTACTS.LOAD_SUCCESS,
      contactsData: res.data,
      isError: false,
    });
  } catch (error) {
    dispatch({
      type: CONTACTS.LOAD_ERROR,
      contactsData: [],
      isError: true,
    });
  }
};
