import React, { useState } from "react";
import style from "./Account.css";
import Input from "../Login/Input";
import Button from "../Login/button";
import Form from "./form";
import { useAuth } from "../../service/authContext";

function Address() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="address">
      {isOpen ? <Form setIsOpen={setIsOpen} /> : <></>}

      <span className="checkout_left_span">Địa chỉ</span>
      <div className="cart1_button dmk">
        <div className="Cart1_item_rigth" onClick={() => setIsOpen(true)}>
          <span>Thêm địa chỉ</span>
        </div>
      </div>
      <div>
        <div>
          {user?.contact.map((contact) => (
            <div class="address-group" key={contact._id}>
              <div class="address-group_info">
                <p>
                  <strong>Số điện thoại:</strong> {contact.phoneNumber}
                  {user.defaultContact === contact._id ? (
                    <span class="address-default">Địa chỉ mặc định</span>
                  ) : (
                    <></>
                  )}
                </p>
                <p>
                  <strong>Địa chỉ: </strong>
                  {contact.address}
                </p>
              </div>
              <div class="address-group_ad">Chỉnh sửa địa chỉ</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Address;
