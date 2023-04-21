import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../../responsive";
const Updatecat = styled.div`
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
  margin: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;
const LanLatInfo = styled.div`
  flex: 1;
  ${mobile({ marginBottom: "20px" })}
`;
const Label2 = styled.label`
  margin-right: 10px;
  font-family: "Delicious Handrawn", cursive;
  font-size: 20px;
`;
const Input = styled.input`
  border: 1px solid gray;
  padding: 5px;
  border-radius: 15px;
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
const UpdateCategory = () => {
  const location = useLocation();
  const categoryId = location.pathname.split("/")[2];

  const history = useNavigate();
  const category = useSelector((state) => {
    return state.category.categories.find(
      (category) => category.id == categoryId
    );
  });
  const [title, setTitle] = useState(category.title.toString());
  const [latin_title, setLatin_title] = useState(
    category.latin_title.toString()
  );
  const [is_active, setIs_active] = useState(category.is_active);
  const [type, setType] = useState(category.type.toString());
  const token = useSelector((state) => state.user.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "application/json",
    },
  };
  const handleClick = async (e) => {
    e.preventDefault();

    const form = { title, latin_title, is_active, type };

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/admin/dashboard/units/a/categories/${categoryId}`,
        form,
        configuration
      );

      history(`/category`);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <Updatecat>
      <Product>
        <ProductTitleContainer>
          <ProductTitle>new country</ProductTitle>
        </ProductTitleContainer>

        <ProductForm>
          <Label1>title</Label1>
          <Input
            defaultValue={category.title}
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <Label1>latin_title</Label1>
          <Input
            defaultValue={category.latin_title}
            type="text"
            name="latin_title"
            onChange={(e) => setLatin_title(e.target.value)}
          />

          <Label1>status</Label1>
          <Input
            defaultValue={category.is_active}
            type="text"
            name="is_active"
            onChange={(e) => setIs_active(e.target.value)}
          />
          <Label1>type</Label1>
          <Input
            defaultValue={category.type}
            type="text"
            name="type"
            onChange={(e) => setType(e.target.value)}
          />
          <ProductFormRight>
            <ProductButton onClick={handleClick}>update</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </Product>
    </Updatecat>
  );
};

export default UpdateCategory;
