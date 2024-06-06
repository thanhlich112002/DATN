import React, { useEffect, useState } from "react";
import { useUser } from "../../service/userContext";
import { useAuth } from "../../service/authContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function AddAdress({ setIsOpen }) {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
      });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const city = cities.find((city) => city.Id === selectedCity);
      setDistricts(city.Districts);
    } else {
      setDistricts([]);
    }
    setWards([]);
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(
        (district) => district.Id === selectedDistrict
      );
      setWards(district.Wards);
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  return (
    <div className="full">
      <div className="Form_Add">
        <div className="X" onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className="checkout_left_top">
          <span>Thông tin mua hàng</span>
        </div>
        <div className="checkout_left">
          <div class="field__input-wrapper">
            <label for="phone" class="field__label">
              Số điện thoại
            </label>
            <input name="phone" id="phone" type="tel" class="field__input" />
          </div>
          <div className="diachi">
            {" "}
            <div class="field__input-wrapper">
              <label for="province" class="field__label">
                Chọn tỉnh
              </label>
              <select
                name="province"
                id="province"
                class="field__input"
                data-bind="province"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map((city) => (
                  <option key={city.Id} value={city.Id}>
                    {city.Name}
                  </option>
                ))}
              </select>
            </div>
            <div class="field__input-wrapper">
              <label for="district" class="field__label">
                Chọn huyện
              </label>
              <select
                name="district"
                id="district"
                class="field__input"
                data-bind="district"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                {districts.map((district) => (
                  <option key={district.Id} value={district.Id}>
                    {district.Name}
                  </option>
                ))}
              </select>
            </div>
            <div class="field__input-wrapper">
              <label for="ward" class="field__label">
                Chọn phường xã
              </label>
              <select
                name="ward"
                id="ward"
                class="field__input"
                data-bind="ward"
              >
                {wards.map((ward) => (
                  <option key={ward.Id} value={ward.Id}>
                    {ward.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ gap: "10px" }}>
            <input type="checkbox" id="setDefault" />
            <label htmlFor="setDefault">Đặt làm mặc định</label>
          </div>
          <div>
            <div className="cart1_button dmk">
              <div className="Cart1_item_rigth">
                <span>Thêm địa chỉ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAdress;
