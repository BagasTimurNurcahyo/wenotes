import React, { useState } from "react";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SIgn_img from "./SIgn_img";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    password: "",
  });

  const history = useNavigate();
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

    const { name, email, date, password } = inpval;

    if (name === "") {
      alert("name field is requred");
    } else if (email === "") {
      alert("email field is requred");
    } else if (!email.includes("@")) {
      alert("plz enter valid email adderess");
    } else if (password === "") {
      alert("password field is requred");
    } else if (password.length < 5) {
      alert("password length greater five");
    } else {
      console.log("data added successfully");

      localStorage.setItem("userwenotes", JSON.stringify([...data, inpval]));
      Swal.fire("Registrasi akun berhasil");
      history("/login");
    }
  };

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-5 p-3" style={{ width: "100%" }}>
            <h3 className="col-lg-6">Selamat Datang.</h3>
            <br></br>
            <h7 className="col-lg-6">Name</h7>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={getdata}
                  placeholder="Enter Your Name"
                />
              </Form.Group>
              <h7 className="col-lg-6">Email</h7>
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
                Daftar
              </Button>
            </Form>
            <p className="mt-3">
              Sudah Punya Akun?
              <span>
                <NavLink to="/login"> Login</NavLink>
              </span>
            </p>
          </div>
          <SIgn_img />
        </section>
      </div>
    </>
  );
};

export default Home;
