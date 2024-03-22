import React, { useState } from "react";
import "../sass/addproduct.scss";
import { Link } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const [onProductAdded, setOnProductAdded] = useState({});
  const [formData, setFormData] = useState({
    brand: "",
    arikul: "",
    price: "",
    discountPercentage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/products", formData);
      setOnProductAdded(res.data);
      setFormData({ brand: "", arikul: "", price: "", discountPercentage: "" });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="addproduct">
      <div className="fixed">
        <div className="header">
          <div className="text">
            <div>
              <h2>Товары</h2>
            </div>
            <div className="p">
              <Link to="/">
                <p>Главная</p>
              </Link>
              <p>/</p>
              <Link to="/">
                <p>Товары</p>
              </Link>
              <p>/</p>
              <Link>
                <p>Новый товар</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed_content">
        <div className="content">
          <div className="content_aside">
            <Link to="/">
              <button>Основные</button>
            </Link>
            <form>
              <label>
                <span>
                  Бренд <span className="red">*</span>
                </span>
                <input
                  className="brand"
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <span>
                  Артикул производителя <span className="red">*</span>
                </span>
                <input
                  className="artikul"
                  type="text"
                  name="arikul"
                  value={formData.arikul}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="pricess">
                <label>
                  <span>Цена</span>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <span> Цена со скидкой</span>
                  <input
                    type="text"
                    id="1"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="fixed_footer">
        <div className="footer">
          <div className="btns">
            <button className="green" onClick={handleSubmit}>
              Сохранить
            </button>
            <Link to="/">
              <button className="cancle">Cancle</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
