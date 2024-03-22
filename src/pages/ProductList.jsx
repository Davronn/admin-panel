import React, { useEffect, useState } from "react";
import "../sass/productlist.scss";
import pusk from "../assets/pusk.svg";
import plus from "../assets/plus.svg";
import delet from "../assets/delet.svg";
import edit from "../assets/edit.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

function ProductList() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedFields, setEditedFields] = useState({
    arikul: "",
    brand: "",
    price: "",
    discountPercentage: "",
  });

  useEffect(() => {
    setLoading(true)
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProduct(res.data);
      } catch (error) {
        console.log(error.message);
      }
      finally{
        setLoading(false)
      }
    };
    fetchProduct();
  }, []);

  const productNum = product.length;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = product.filter((pr) =>
    pr.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm("O'chirilsinmi ?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/products/${productId}`);
        setProduct(product.filter((pr) => pr.id !== productId));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditedFields({
      arikul: product.arikul,
      brand: product.brand,
      price: product.price,
      discountPercentage: product.discountPercentage || "",
    });
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setModalOpen(false);
  };

  const handleFieldChange = (e) => {
    setEditedFields({
      ...editedFields,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:3000/products/${editingProduct.id}`,
        editedFields
      );
      const updatedProductList = product.map((pr) => {
        if (pr.id === editingProduct.id) {
          return { ...pr, ...editedFields };
        }
        return pr;
      });
      setProduct(updatedProductList);
      closeEditModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="productlist">
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
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content_head">
          <div className="content-h">
            <div>
              <h2>Все товары ({productNum})</h2>
            </div>
            <div className="input">
              <img src={pusk} alt="" />
              <input
                type="text"
                name=""
                id=""
                placeholder="Поиск"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="line"></div>
        </div>
        <div className="content_aside">
        {loading && <Loader />}
          <table>
            <thead>
              <tr>
                <th className="id">Наименование</th>
                <th className="num">Артикул </th>
                <th className="brend">Бренд</th>
                <th className="price">Цена</th>
                <th className="discount">Цена со скидкой</th>
                <th className="btns"></th>
              </tr>
            </thead>
            <tbody className="tabel-scroll">
            
              {product.length > 0 &&
                filteredProducts.map((pr, i) => (
                  <tr key={pr.id}>
                    <td className="id">Товар {i + 1}</td>
                    <td className="num">{pr.arikul}</td>
                    <td className="brend">{pr.brand}</td>
                    <td className="price">{pr.price}$</td>
                    <td className="discount">
                      {pr.discountPercentage
                        ? `${pr.discountPercentage}$ ✅`
                        : "Chegirma yoq ❌"}
                    </td>
                    <td className="btns">
                      <div className="imgs">
                        <img
                          src={edit}
                          alt=""
                          onClick={() => openEditModal(pr)}
                        />
                        <img
                          src={delet}
                          alt=""
                          onClick={() => deleteProduct(pr.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer">
        <Link to="/addproduct">
          <button>
            <img src={plus} alt="" />
            Новый товар
          </button>
        </Link>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditModal}>
              ❌
            </span>
            <h2>
              Edit Product <span className="red">{editedFields.brand}</span>
            </h2>
            <div className="inputs">
              <div className="input">
                <p>Артикул</p>
                <input
                  className="arikul"
                  type="text"
                  name="arikul"
                  value={editedFields.arikul}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="input">
                <p>Бренд</p>
                <input
                  className="brand"
                  type="text"
                  name="brand"
                  value={editedFields.brand}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="prices">
                <div className="input">
                  <p>Цена</p>
                  <input
                    type="text"
                    name="price"
                    value={editedFields.price}
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="input">
                  <p>Цена со скидкой</p>
                  <input
                    type="text"
                    name="discountPercentage"
                    value={editedFields.discountPercentage}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>
            </div>
            <button className="save" onClick={saveChanges}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
