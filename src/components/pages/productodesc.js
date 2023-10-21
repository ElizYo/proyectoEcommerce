import React, { useState, useEffect } from "react";


export default function ({ match }) { // Añade los paréntesis y renombra la función a ProductPage

    const productid = match.params.id;
    const product=products.find(product=>product.id==productid)
    return (
        <div>
                <div className="row mt-5">
                    <div className="col-md-6">
                        <div className="card p-2 m-3 shadow p-3 mb-5 bg-white rounded">
                            <h1>
                                <b>{product.name}</b>
                            </h1>
                            <hr />
                            <img src={product.image} alt={product.name} className="img-fluid m-3 bigimg" />
                            <p>{product.description}</p>
                        </div>
                    </div>

                    <div className="col-md-6 text-left">
                        <div className="m-2 shadow p-3 mb-5 bg-white rounded">
                            
                        </div>
                    </div>
                    </div>
        </div>
    );
}
