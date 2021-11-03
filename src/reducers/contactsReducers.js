import { CONTACTS } from "../actions/types";

const initialState = {
  contactsData: [],
  isLoading: false,
  isError: false,
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACTS.LOAD:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case CONTACTS.LOAD_SUCCESS:
      return {
        ...state,
        contactsData: action.contactsData,
        isLoading: false,
      };
    case CONTACTS.LOAD_ERROR:
      return {
        ...state,
        contactsData: [],
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default contactsReducer;
