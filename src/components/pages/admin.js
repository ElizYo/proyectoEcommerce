import React, { useState } from "react";
import 'bootstrap';
import UsuarioList from './listadoUsuarios';
import OrdersList from './listOrdenes';
import AddProduct from './addNewProduct';
import ProductsList from './listadoProductos';
import EditProduct from './editproduct';

import { useSelector, useDispatch } from "react-redux";
import'../../style/admin.scss';

export default function Admin() {
    const getCurrentuser = useSelector((state) => state.loginReducer);
    const { currentUser } = getCurrentuser;

    if (!currentUser || currentUser.isAdmin === false) {
        window.location.href = '/';
        return false;
    }
   
    const [selectedTab, setSelectedTab] = useState("users");
    const renderContent = () => {
        switch (selectedTab) {
          case "users":
            return <UsuarioList />;
          case "products":
            return <ProductsList/>;
          case "add-product":
            return <AddProduct />;
          case "orders":
            return <OrdersList />;
          case "edit-product":
            return <EditProduct />;
          default:
            return <UsuarioList />;
        }
      };
      
    return (
        <div className="admin-container">
            <div className="nav">
                <button
                    className={`nav-link ${selectedTab === "users" ? "active" : ""}`}
                    onClick={() => setSelectedTab("users")}
                >
                    Usuarios
                </button>
                <button
                    className={`nav-link ${selectedTab === "products" ? "active" : ""}`}
                    onClick={() => setSelectedTab("products")}
                >
                    Productos
                </button>
                <button
                    className={`nav-link ${selectedTab === "add-product" ? "active" : ""}`}
                    onClick={() => setSelectedTab("add-product")}
                >
                    Añadir Productos
                </button>
                <button
                    className={`nav-link ${selectedTab === "orders" ? "active" : ""}`}
                    onClick={() => setSelectedTab("orders")}
                >
                    Pedidos
                </button>
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    )
}
