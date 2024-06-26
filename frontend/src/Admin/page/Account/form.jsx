import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { addContact } from "../../../service/API";

function AddAddress({ setIsOpen, getUserData }) {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ward, setWard] = useState("");
  const [setDefault, setSetDefault] = useState(false);

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
  }, [selectedCity, cities]);

  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(
        (district) => district.Id === selectedDistrict
      );
      setWards(district.Wards);
    } else {
      setWards([]);
    }
  }, [selectedDistrict, districts]);

  const handleAddAddress = async () => {
    try {
      if (!phoneNumber || !selectedCity || !selectedDistrict || !ward) {
        console.error("Vui lòng điền đầy đủ thông tin");
        return;
      }
      const selectedProvince = cities.find((city) => city.Id === selectedCity);
      const selectedDistrictObj = districts.find(
        (district) => district.Id === selectedDistrict
      );
      const provinceName = selectedProvince ? selectedProvince.Name : "";
      const districtName = selectedDistrictObj ? selectedDistrictObj.Name : "";
      const address = `${ward} - ${provinceName} - ${districtName}`;

      const response = await addContact({
        contact: {
          phoneNumber: phoneNumber,
          address: address,
        },
      });
      getUserData();
      setIsOpen(false);

      setPhoneNumber("");
      setSelectedCity("");
      setSelectedDistrict("");
      setWard("");
      setSetDefault(false);
    } catch (error) {
      console.error("Lỗi khi thêm địa chỉ:", error);
    }
  };

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
          <div className="field__input-wrapper">
            <label htmlFor="phone" className="field__label">
              Số điện thoại
            </label>
            <input
              name="phone"
              id="phone"
              type="tel"
              className="field__input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="diachi">
            <div className="field__input-wrapper">
              <label htmlFor="province" className="field__label">
                Chọn tỉnh
              </label>
              <select
                name="province"
                id="province"
                className="field__input"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Chọn tỉnh</option>
                {cities.map((city) => (
                  <option key={city.Id} value={city.Id}>
                    {city.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field__input-wrapper">
              <label htmlFor="district" className="field__label">
                Chọn huyện
              </label>
              <select
                name="district"
                id="district"
                className="field__input"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Chọn huyện</option>
                {districts.map((district) => (
                  <option key={district.Id} value={district.Id}>
                    {district.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field__input-wrapper">
              <label htmlFor="ward" className="field__label">
                Chọn phường xã
              </label>
              <select
                name="ward"
                id="ward"
                className="field__input"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              >
                <option value="">Chọn phường xã</option>
                {wards.map((ward) => (
                  <option key={ward.Id} value={ward.Name}>
                    {ward.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ gap: "10px" }}>
            <input
              type="checkbox"
              id="setDefault"
              defaultChecked
              checked={true}
            />
            <label htmlFor="setDefault">Đặt làm mặc định</label>
          </div>
          <div>
            <div className="cart1_button dmk">
              <div className="Cart1_item_rigth">
                <span onClick={() => handleAddAddress()}>Thêm địa chỉ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
