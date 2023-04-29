import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../../responsive";
import Swal from "sweetalert2";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FaceIcon from "@mui/icons-material/Face";
import Face6Icon from "@mui/icons-material/Face6";
import axios from "axios";
import {
  deleteAvatar,
  deletePassportImage,
  getCitiesByCountryId,
  getContinentIdByName,
  getContinents,
  getCountriesByName,
  getLogo,
  getPassportImage,
  uploadAvatar,
  uploadPassportImage,
} from "../../../redux/apiCalls";

import Avatar from "@mui/material/Avatar";
const CreateUser = styled.div`
  flex: 9;
  /* height: 100vh; */
  width: 100vh;
  margin-left: 40px;
`;
const Product = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ProductTitleContainer = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: center;
`;

const ProductTitle = styled.h1`
  font-size: 18px;
  text-align: center;
  color: #909066;
  font-family: "Delicious Handrawn", cursive;
  font-size: 40px;
`;
const ProductForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mobile({ alignItems: "center" })}
`;

const Label1 = styled.label`
  /* line-height: 15px; */
  margin-bottom: 10px;
  margin-top: 15px;
  font-family: "Delicious Handrawn", cursive;
  font-size: 20px;
`;

const LanLat = styled.div`
  margin: 20px 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mobile({ flexDirection: "column" })}
`;
const LanLatInfo = styled.div`
  margin-bottom: "20px";
  flex: 1;
  ${mobile({ marginBottom: "20px" })}
`;
const Label2 = styled.label`
  margin-right: 10px;
  font-family: "Delicious Handrawn", cursive;
  font-size: 20px;
`;
const Label3 = styled.label`
  margin-right: 10px;
  font-family: "Delicious Handrawn", cursive;
  font-size: 20px;
  ${mobile({ marginBottom: "5px" })}
`;
const Input = styled.input`
  height: 42px;
  border: 1px solid #dcdcdc;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  &:hover {
    outline: none;
    padding: 5px;
  }
`;
const ProductFormRight = styled.div`
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ProductFormCenter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;
const PhoneContainer = styled.div`
  flex: 1;
  margin-left: 8px;
  ${mobile({ margin: "10px" })}
`;
const ProductButton = styled.button`
  background-color: #909066;
  color: white;
  padding: 5px 10px;
  margin: 10px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  &:hover {
    color: black;
  }
`;
const Error = styled.span`
  color: red;
  font-size: 14px;
  direction: rtl;
  margin: 10px auto 10px;
  font-family: "Vazir", sans-serif;
`;

const Suggestion = styled.div`
  background-color: white;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 8px #ddd;
  padding: 3px;
  margin-top: 0.5rem;
  max-height: 300px;
  font-family: "Vazir", sans-serif;
  cursor: pointer;
  &:hover {
    background-color: #909066;
  }
`;
// overflow-y: auto;
const SocialMedia = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SocialTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  font-family: "Delicious Handrawn", cursive;
`;
const SocialIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;
const SocialIcon = styled.div`
  cursor: pointer;
  background-color: white;
  border: none;
  margin: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ margin: "10px" })}
`;
const SocialInput = styled.input`
  height: 42px;
  border: 1px solid gray;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  &:hover {
    outline: none;
    padding: 5px;
  }
`;
const Search = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${mobile({ alignItems: "center" })}
`;
const SearchLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${mobile({ flexDirection: "column" })}
`;
const SearchInfo = styled.div`
  margin: 10px;
  display: flex;
  flex: 1;
  ${mobile({
    marginBottom: "20px",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
  })}
`;
const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SelectContainer = styled.div`
  height: 42px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px;
  &:focus {
    border: none;
    outline: none;
  }
`;
const LableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const InputContainer = styled.div`
  margin: 10px;
  display: flex;
  flex: 1;
  flex-direction: column;
  ${mobile({
    marginBottom: "20px",
    justifyContent: "center",

    marginRight: "auto",
    marginLeft: "auto",
  })}
`;
const InputContainer1 = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  ${mobile({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
  })}
`;
const InputContainer2 = styled.div`
  flex: 1;
  ${mobile({
    display: "flex",
  })}
`;
const UnitLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const UnitLogoUpload = styled.div`
  font-size: 20px;

  font-family: "Delicious Handrawn", cursive;
  cursor: pointer;
`;
const UnitLogoDelete = styled.div`
  font-size: 20px;
  margin-top: 5px;
  font-family: "Delicious Handrawn", cursive;
  cursor: pointer;
`;
const UnitLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  cursor: pointer;
`;

const UpdateUser = () => {
  const history = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  //find user
  const singleUser = useSelector((state) => {
    return state.userList.userList.find((user) => user.id == userId);
  });
  const [error, setError] = useState({});
  const [data, setData] = useState("");

  const [first_name, setFirst_name] = useState(singleUser.first_name);
  const [last_name, setLast_name] = useState(singleUser.last_name);
  const [gender, setGender] = useState(singleUser.gender);
  const [mobile, setMobile] = useState(singleUser.mobile);
  const [email, setEmail] = useState(singleUser.email);
  const [password, setPassword] = useState(singleUser.password);
  const [password_confirmation, setPassword_confirmation] = useState(
    singleUser.password_confirmation
  );
  const [role_id, setRole_id] = useState(singleUser.role_id);
  const [is_active, setIs_active] = useState(singleUser.is_active);
  const [continent_id, setContinent_id] = useState(singleUser.continent_id);
  const [country_id, setCountry_id] = useState(singleUser.country_id);
  const [city_id, setCity_id] = useState(singleUser.city_id);
  const [avatar, setAvatar] = useState(singleUser.avatar);
  const [passport_image, setPassport_image] = useState(
    singleUser.passport_image
  );
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "application/json",
    },
  };
  const continents = useSelector((state) => state.continent.continents);
  const countries = useSelector((state) => state.country.countries);
  const cities = useSelector((state) => state.city.cities);
  const continentId = useSelector((state) => state.continent.id);
  //city
  const [cityList, setCityList] = useState([]);
  const [cityName, setCityName] = useState("");
  const [permission, setPermission] = useState(1);
  //country
  const [suggestion, setSuggestion] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [controller, setController] = useState(1);
  //continent
  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState([]);
  ////////////////////uplaod avatar///////////////
  const [avatarFile, setAvatarFile] = useState(null);
  const logoPath = useSelector((state) => state.logo.logo);
  const [isShownUploadAvatar, setIsShownUploadAvatar] = useState(true);

  //////////passport Image//////////////////////////
  const [passportImgFile, setPassportImgFile] = useState(null);
  const [isShownUploadPassportImg, setIsShownUploadPassportImg] =
    useState(true);
  const passportImgPath = useSelector((state) => state.image.images);
  //////////////////continent/////////////////////////////
  useEffect(() => {
    getContinentIdByName(dispatch, configuration, select);
    setContinent_id(continentId);
  }, [dispatch, select]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/admin/dashboard/locations/continents/${continent_id}`,
        configuration
      )
      .then((response) => {
        // console.log(response.data.body)
        setSelected(response.data.body.name);
      })
      .catch((error) => {
        // handle error
      });
  }, []);
  useEffect(() => {
    getContinents(dispatch, configuration, 1);
    setOptionList(continents);
  }, []);
  /////////////////////country///////////////////

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/admin/dashboard/locations/countries/${country_id}`,
        configuration
      )
      .then((response) => {
        // console.log(response.data.body);
        setCountryName(response.data.body.name);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          Swal.fire({
            title: "select valid country",
            icon: "warning",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            position: "top",
          });
        }
      });
  }, []);
  useEffect(() => {
    if (controller == 1) {
      setSuggestion([]);
    }

    if (controller == 0) {
      getCountriesByName(dispatch, configuration, countryName);
      setSuggestion(countries);
      setController(1);
    }
  }, [countryName]);
  /////////////////////////////city//////////////////////////////
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/admin/dashboard/locations/cities/${city_id}`,
        configuration
      )
      .then((response) => {
        // console.log(response.data.body.name);
        setCityName(response.data.body.name);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          Swal.fire({
            title: "select valid city",
            icon: "warning",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            position: "top",
          });
        }
      });
  }, []);

  useEffect(() => {
    if (permission == 1) {
      setCityList([]);
    }

    if (permission == 0) {
      getCitiesByCountryId(dispatch, configuration, country_id);
      // console.log(country_id);
      setCityList(cities);
      setPermission(1);
    }
  }, [cityName, countryName, country_id, dispatch]);
  //////////avatar////////////
  useEffect(() => {
    const formData = new FormData();
    if (avatarFile) {
      formData.append("image", avatarFile);
      uploadAvatar(userId, dispatch, configuration, formData);
      setAvatar(logoPath);
      setIsShownUploadAvatar((current) => !current);
      Swal.fire({
        title: "avatar uploaded!",
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top",
      });
    }
  }, [avatarFile]);
  const handelDeleteAvatar = () => {
    setIsShownUploadAvatar((current) => !current);
    deleteAvatar(userId, dispatch, configuration);
    setAvatar("");
    Swal.fire({
      title: "avatar deleted!",
      icon: "success",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
      toast: true,
      position: "top",
    });
  };
  ////////////////passport Image/////////////////
  useEffect(() => {
    const formData = new FormData();
    if (passportImgFile) {
      formData.append("image", passportImgFile);
      uploadPassportImage(userId, dispatch, configuration, formData);
      setPassport_image(passportImgPath);
      setIsShownUploadPassportImg((current) => !current);
    }
  }, [passportImgFile]);
  const handelDeletePassportImg = () => {
    setIsShownUploadPassportImg((current) => !current);
    deletePassportImage(userId, dispatch, configuration);
    setPassport_image("");
    Swal.fire({
      title: "passport image deleted!",
      icon: "success",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
      toast: true,
      position: "top",
    });
  };
  ////////////////fetch user///////////////////
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/admin/dashboard/users/${userId}`,
        configuration
      )
      .then((response) => {
        console.log(response.data.body);
        setAvatar(response.data.body.avatar);
        setPassport_image(response.data.body.passport_image);
      })
      .catch((error) => {
        // handle error
      });
  }, [avatar, passport_image]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/admin/dashboard/users/images/fetch/passport/${userId}`,
        configuration
      )
      .then((response) => {
        // console.log(response.data)
        setData(response.data);
      })
      .catch((error) => {
        // handle error
      });
  }, [passport_image]);
  const clickHandelerCountry = (text) => {
    setCountryName(text);
    setController(1);
    setSuggestion([]);
  };
  const clickHandelerCity = (text) => {
    setCityName(text);
    setPermission(1);
    setCityList([]);
  };
  const handleClick = async (e) => {
    e.preventDefault();

    const form = {
      first_name,
      last_name,
      gender,
      password,
      password_confirmation,
      role_id,
      is_active,
      email,
      mobile,
      continent_id,
      country_id,
      city_id,
    };

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/admin/dashboard/users/${userId}`,
        form,
        configuration
      );

      history(`/users`);
      // console.log(res);
    } catch (err) {
      console.log();
      if (err.response.status === 422) {
        // let error = err.response.data.message;
        setError(err.response.data.errors);

        console.log(err.response.data.errors);
        Swal.fire({
          title: err.response.data.message,
          icon: "warning",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
          toast: true,
          position: "top",
        });
      }
    }
  };
  const onOptionChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <>
      <CreateUser>
        <Product>
          {/* <pre>{JSON.stringify(error)}</pre> */}
          <ProductTitleContainer>
            <ProductTitle>update user</ProductTitle>
          </ProductTitleContainer>

          <ProductForm>
            <UnitLogoContainer>
              {avatar ? (
                <UnitLogo
                  src={`http://localhost:8000/storage/image/user/${userId}/avatar/${avatar}`}
                  alt=""
                ></UnitLogo>
              ) : (
                <Avatar
                  src="/broken-image.jpg"
                  sx={{ width: 60, height: 60 }}
                />
              )}

              {!isShownUploadAvatar && (
                <UnitLogoUpload>
                  <Label2 htmlFor="fileInput">
                    upload new avatar :
                    <FaceIcon
                      style={{ margin: "10px", cursor: "pointer" }}
                      fontSize="large"
                    />
                  </Label2>

                  <Input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setAvatarFile(e.target.files[0])}
                  />
                </UnitLogoUpload>
              )}
              {avatar ? <em style={{ color: "gray" }}>avatar uploaded</em> : ""}
              <UnitLogoDelete>
                delete avatar :
                <DeleteForeverIcon
                  onClick={handelDeleteAvatar}
                  fontSize="large"
                />
              </UnitLogoDelete>
              {!error.avatar ? (
                " "
              ) : (
                <Error>{JSON.stringify(error.avatar)}</Error>
              )}
            </UnitLogoContainer>
            <Label1>first name</Label1>
            <Input
              required
              defaultValue={singleUser.first_name}
              type="text"
              name="first_name"
              onChange={(e) => setFirst_name(e.target.value)}
            />
            {!error.first_name ? (
              " "
            ) : (
              <Error>{JSON.stringify(error.first_name)}</Error>
            )}
            <Label1>last name</Label1>
            <Input
              defaultValue={singleUser.last_name}
              required
              type="text"
              name="last_name"
              onChange={(e) => setLast_name(e.target.value)}
            />
            {!error.last_name ? (
              " "
            ) : (
              <Error>{JSON.stringify(error.last_name)}</Error>
            )}
            <Search style={{ marginTop: "10px" }}>
              <SearchInfo>
                <Label2>gender:</Label2>
                <input
                  type="radio"
                  name="type"
                  value="زن"
                  id="زن"
                  checked={gender === "زن"}
                  onChange={onOptionChange}
                />
                <Label2 htmlFor="زن" style={{ marginLeft: "5px" }}>
                  Female
                </Label2>

                <input
                  style={{ marginLeft: "30px" }}
                  type="radio"
                  name="type"
                  value="مرد"
                  id="مرد"
                  checked={gender === "مرد"}
                  onChange={onOptionChange}
                />
                <Label2 htmlFor="مرد" style={{ marginLeft: "5px" }}>
                  Male
                </Label2>
              </SearchInfo>
            </Search>
            {!error.gender ? (
              " "
            ) : (
              <Error>{JSON.stringify(error.gender)}</Error>
            )}
            <Label1>email</Label1>
            <Input
              defaultValue={singleUser.email}
              required
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {!error.email ? " " : <Error>{JSON.stringify(error.email)}</Error>}
            <Label1>mobile</Label1>
            <Input
              defaultValue={singleUser.mobile}
              required
              type="text"
              name="mobile"
              onChange={(e) => setMobile(e.target.value)}
            />
            {!error.mobile ? (
              " "
            ) : (
              <Error>{JSON.stringify(error.mobile)}</Error>
            )}
            <LanLat>
              <LanLatInfo style={{ marginBottom: "20px" }}>
                <Label2>password</Label2>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                />
              </LanLatInfo>
              {!error.password ? (
                " "
              ) : (
                <Error>{JSON.stringify(error.password)}</Error>
              )}
              <LanLatInfo>
                <Label2>password confirmation</Label2>
                <Input
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                  type="text"
                />
              </LanLatInfo>
              {!error.password_confirmation ? (
                " "
              ) : (
                <Error>{JSON.stringify(error.password_confirmation)}</Error>
              )}
            </LanLat>
            <Label1>role Id</Label1>
            <Input
              defaultValue={singleUser.role_id}
              required
              type="text"
              name="role_id"
              onChange={(e) => setRole_id(e.target.value)}
            />

            <Label1>status</Label1>
            <Input
              defaultValue={singleUser.is_active}
              required
              type="text"
              name="is_active"
              onChange={(e) => setIs_active(e.target.value)}
            />

            <SelectContainer>
              <Label1 style={{ marginRight: "10px" }}>continent</Label1>
              <select
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #dcdcdc",
                  fontFamily: " 'Vazir', sans-serif",
                }}
                disabled={false}
                value={select}
                onChange={(e) => setSelected(e.currentTarget.value)}
              >
                {optionList.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </SelectContainer>
            <SearchInfo>
              <Label2>country name:</Label2>
              <SearchBar>
                <Input
                  style={{
                    direction: "rtl",
                    fontFamily: " 'Vazir', sans-serif",
                  }}
                  type="text"
                  name="country_id"
                  onChange={(e) => {
                    setCountryName(e.target.value);
                    setController(0);
                  }}
                  value={countryName}
                  onBlur={() => {
                    setTimeout(() => {
                      setController(1);
                      setSuggestion([]);
                    }, 200);
                  }}
                />
                {suggestion.map((suggestion) => {
                  return (
                    <Suggestion
                      onClick={() => {
                        clickHandelerCountry(suggestion.name);
                        setCountry_id(suggestion.id);
                      }}
                    >
                      {suggestion.name}
                    </Suggestion>
                  );
                })}
              </SearchBar>
            </SearchInfo>
            <SearchInfo>
              <Label2>city name:</Label2>
              <SearchBar>
                <Input
                  style={{
                    direction: "rtl",
                    fontFamily: " 'Vazir', sans-serif",
                  }}
                  type="text"
                  name="city_id"
                  onChange={(e) => {
                    setCityName(e.target.value);
                    setPermission(0);
                  }}
                  value={cityName}
                  onBlur={() => {
                    setTimeout(() => {
                      setPermission(1);
                      setCityList([]);
                    }, 200);
                  }}
                />
                {cityList.map((city) => {
                  return (
                    <Suggestion
                      onClick={() => {
                        clickHandelerCity(city.name);
                        setCity_id(city.id);
                      }}
                    >
                      {city.name}
                    </Suggestion>
                  );
                })}
              </SearchBar>
            </SearchInfo>
            <UnitLogoContainer style={{ marginTop: "30px" }}>
              {passport_image ? (
                <UnitLogo
                  src={`data:image/jpeg;base64,${data}`}
                  alt=""
                ></UnitLogo>
              ) : (
                <Avatar
                  src="/broken-image.jpg"
                  sx={{ width: 60, height: 60 }}
                />
              )}
              {!isShownUploadPassportImg && (
                <UnitLogoUpload>
                  <Label2 htmlFor="fileInput">
                    upload new passport image :
                    <FaceIcon
                      style={{ margin: "10px", cursor: "pointer" }}
                      fontSize="large"
                    />
                  </Label2>

                  <Input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setPassportImgFile(e.target.files[0])}
                  />
                </UnitLogoUpload>
              )}
              {passport_image ? (
                <em style={{ color: "gray", marginTop: "10px" }}>
                  passport Image uploaded
                </em>
              ) : (
                ""
              )}
              <UnitLogoDelete>
                delete image :
                <DeleteForeverIcon
                  onClick={handelDeletePassportImg}
                  fontSize="large"
                />
              </UnitLogoDelete>
              {!error.passport_image ? (
                " "
              ) : (
                <Error>{JSON.stringify(error.passport_image)}</Error>
              )}
            </UnitLogoContainer>
            <ProductFormRight>
              <ProductButton onClick={handleClick}>update</ProductButton>
            </ProductFormRight>
          </ProductForm>
        </Product>
      </CreateUser>
    </>
  );
};

export default UpdateUser;
