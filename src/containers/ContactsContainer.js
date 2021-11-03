import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core/";
import { requestContacts } from "../actions/contactsActions";

const Contacts = () => {
  const { contactsData, isLoading, isError } = useSelector(
    (state) => state.result
  );
  const dispatch = useDispatch();
  const [filteredContacts, setFilteredContacts] = useState(contactsData);

  useEffect(() => {
    dispatch(requestContacts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredContacts([
      ...new Map(
        contactsData.map((call) => [call["phoneNumber"], call])
      ).values(),
    ]);
  }, [contactsData]);

  const [hideMessage, setHideMessage] = useState(false);

  const handleErrorMessage = () => {
    setHideMessage(!hideMessage);
  };

  if (isError)
    return (
      <div className={hideMessage ? "hide-message" : "error-message"}>
        Error while loading users
        <Button
          color="default"
          className="close-icon"
          onClick={() => handleErrorMessage()}
        >
          X
        </Button>
      </div>
    );

  return (
    <>
      {isLoading && <div className="loading">Data loading</div>}
      {filteredContacts.map((contact, index) => {
        return (
          <div className="container" key={index}>
            <div className="content">
              <span>
                {contact.firstName} {contact.lastName}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Contacts;
