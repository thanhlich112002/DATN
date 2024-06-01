import React, { useEffect, useState } from "react";
import "./Login.css";
import Input from "./Input";
import Button from "./button";
import axios from "axios";
import { SingupAPI } from "../../service/API";
import { loginAPI } from "../../service/API";
import { useAuth } from "../../service/authContext";
import { useNavigate, useLocation } from "react-router-dom";

function Register() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfisrtname] = useState("");
  const [lastName, setlastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();

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
  const handle = async () => {
    const selectedCityObj = cities.find((city) => city.Id === selectedCity);
    const selectedDistrictObj = selectedCityObj
      ? selectedCityObj.Districts.find(
          (district) => district.Id === selectedDistrict
        )
      : null;
    const selectedWardObj = selectedDistrictObj
      ? selectedDistrictObj.Wards.find((ward) => ward.Id === selectedWard)
      : null;

    const cityName = selectedCityObj ? selectedCityObj.Name : "";
    const districtName = selectedDistrictObj ? selectedDistrictObj.Name : "";
    const wardName = selectedWardObj ? selectedWardObj.Name : "";

    try {
      // Register the user
      const signupRes = await SingupAPI({
        email: email,
        firstName: firstName, // Corrected typo in firstName variable name
        lastName: lastName, // Corrected typo in lastName variable name
        password: password,
        passwordConfirm: confirmPassword,
        contact: {
          phoneNumber: phoneNumber,
          address: wardName + "-" + cityName + "-" + districtName,
        },
      });

      if (signupRes.data.status === "success") {
        // If signup successful, login the user
        const loginRes = await loginAPI({
          email: email,
          password: password,
        });

        setIsLoggedIn(true);
        setUser(loginRes.data.data.user);
        localStorage.setItem("token", loginRes.data.token);
        localStorage.setItem(
          "setUser",
          JSON.stringify(loginRes.data.data.user)
        );
        if (loginRes.data.data.user.role === "User") {
          navigate("/"); // Redirect user to home page
        }
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-group w50">
        <h2 className="lineup">Tạo tài khoản</h2>
        <Input
          title="Tên"
          type="text"
          placeholder="Tên"
          value={firstName}
          setValue={setfisrtname}
        />
        <Input
          title="Họ"
          type="text"
          placeholder="Họ"
          value={lastName}
          setValue={setlastname}
        />
        <Input
          title="Số điện thoại"
          type="text"
          placeholder="Số điện thoại"
          value={phoneNumber}
          setValue={setPhoneNumber}
        />
        <Input
          title="E-mail"
          type="text"
          placeholder="E-mail"
          value={email}
          setValue={setEmail}
        />
        <Input
          title="Mật khẩu"
          type="password"
          placeholder="Mật khẩu"
          value={password}
          setValue={setPassword}
        />
        <Input
          title="Xác nhận mật khẩu"
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <div className="diachi mgt10 w90">
          <div className="field__input-wrapper">
            <label htmlFor="province" className="field__label">
              Chọn tỉnh
            </label>
            <select
              name="province"
              id="province"
              className="field__input"
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
          <div className="field__input-wrapper">
            <label htmlFor="district" className="field__label">
              Chọn huyện
            </label>
            <select
              name="district"
              id="district"
              className="field__input"
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
          <div className="field__input-wrapper">
            <label htmlFor="ward" className="field__label">
              Chọn phường xã
            </label>
            <select
              name="ward"
              id="ward"
              className="field__input"
              data-bind="ward"
              onChange={(e) => setSelectedWard(e.target.value)}
            >
              {wards.map((ward) => (
                <option key={ward.Id} value={ward.Id}>
                  {ward.Name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button title="Đăng ký" handle={handle} />
      </div>
    </div>
  );
}

export default Register;
