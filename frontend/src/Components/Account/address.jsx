import React, { useEffect, useState } from "react";
import style from "./Account.css";
import Input from "../Login/Input";
import Button from "../Login/button";
import Form from "./form";
import { useAuth } from "../../service/authContext";
import { defaultContact, getUser, delContact } from "../../service/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function Address({ setIsLoading }) {
  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const res = await getUser();
      setUser(res.data);
      console.log(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  const deleteContact = async (contactId) => {
    try {
      // Call API to delete the contact
      setIsLoading(true);
      await delContact(contactId);
      toast.success("Contact deleted successfully");
      getUserData();
      setIsLoading(false);
    } catch (error) {
      // Display the error message using toast.error
      toast.error(error.response.data.error);
      console.error("Error deleting contact:", error);
      setIsLoading(false);
    }
  };
  const defContact = async (contactId) => {
    try {
      // Call API to delete the contact
      setIsLoading(true);
      await defaultContact(contactId);
      toast.success("Đỗi địa chỉ mặc định");
      getUserData();
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error deleting contact:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="address">
      {isOpen && <Form setIsOpen={setIsOpen} getUserData={getUserData} />}

      <span className="checkout_left_span">Địa chỉ</span>
      <div className="cart1_button dmk">
        <div className="Cart1_item_rigth" onClick={() => setIsOpen(true)}>
          <span>Thêm địa chỉ</span>
        </div>
      </div>
      <div>
        {user?.contact.map((contact) => (
          <div className="address-group" key={contact._id}>
            <div className="address-group_info">
              <p>
                <strong>Số điện thoại:</strong> {contact.phoneNumber}
                {user.defaultContact._id === contact._id && (
                  <span className="address-default">Địa chỉ mặc định</span>
                )}
              </p>
              <p>
                <strong>Địa chỉ: </strong>
                {contact.address}
              </p>
            </div>
            <div className="address-group_ad">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => defContact(contact._id)}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => deleteContact(contact._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Address;
