import React, { useState } from "react";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SIgn_img from "./SIgn_img";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const history = useNavigate();

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);
  console.log(inpval);

  const getdata = (e) => {
    const { value, name } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();

    const getuserArr = localStorage.getItem("userwenotes");
    console.log(getuserArr);

    const { email, password } = inpval;

    if (email === "") {
      alert("email field is requred");
    } else if (!email.includes("@")) {
      alert("plz enter valid email adderess");
    } else if (password === "") {
      alert("password field is requred");
    } else if (password.length < 5) {
      alert("password length greater five");
    } else {
      if (getuserArr && getuserArr.length) {
        const userdata = JSON.parse(getuserArr);
        const userlogin = userdata.filter((el, k) => {
          return el.email === email && el.password === password;
        });

        if (userlogin.length === 0) {
          alert("invalid details");
        } else {
          console.log("user login success");

          localStorage.setItem("user_login", JSON.stringify(getuserArr));
          Swal.fire("Login berhasil");
          history("/notes");
        }
      }
    }
  };

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-5 p-3" style={{ width: "100%" }}>
            <h3 className="col-lg-6">Selamat Datang.</h3>
            <br></br>
            <h7 className="col-lg-6">Email</h7>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getdata}
                  placeholder="Enter email"
                />
              </Form.Group>
              <h7 className="col-lg-6">Password</h7>
              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={getdata}
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="col-lg-6"
                onClick={addData}
                type="submit"
              >
                Masuk
              </Button>
            </Form>
            <p className="mt-3">
              Belum Punya Akun?
              <span>
                <NavLink to="/"> Daftar</NavLink>
              </span>
            </p>
          </div>
          <SIgn_img />
        </section>
      </div>
    </>
  );
};

export default Login;
