import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../providers/ShoppingCartContext";
import { ProductCardProps } from "../../components/ProductCard/ProductCard";

import './ShoppingCart.styles.scss';
import { setToLocalStorage } from "../../utils/localStorage";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import ButtonLink from "../../components/ButtonLink/ButtonLink";

const PRODUCT_LIST_KEY = "PRODUCT_LIST_KEY";

const ShoppingCartPage = () => {
    const { productList, setProductList } = useContext(ShoppingCartContext);
    const [ total, setTotal ] = useState(0);

    useEffect(() => {
        let totalGlobal = 0;
        // useEffect Va a estar escuchando cuando las propiedades en el array cambien
        productList.forEach((product: ProductCardProps) => { // Leemos cada producto de la lista
            // Calcular el total por producto 
            const totalByProduct = product.quantity! * product.price;

            // El total por producto lo suma al total general
            totalGlobal = totalGlobal + totalByProduct;
        });
        setTotal(totalGlobal);
    }, [productList]);

    const handleClick = (id: string) => { // id selecciando
        // Cuando el usuario de click, se ejecuta esta función
        // Usamos filter, porque queremos eliminar un elemento de la lista
        const result = productList.filter((product: ProductCardProps) => {
            return product.id !== id // Regresamos todos los products que cumplan esta condición
        });
        setProductList(result);
        setToLocalStorage(PRODUCT_LIST_KEY, result);
    };

    const findProduct = (id: string) => {
        // Si lo encuentra regresa la posicion, sino regresa un -1
        const result = productList.findIndex((productSearch: ProductCardProps) => 
            productSearch.id === id
        );

        return result;
    }

    const handleOnQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const productIndex = findProduct(id); // Buscamos el indice del producto en la lista
        productList[productIndex].quantity = Number(event.target.value); // Actualizamos la vieja cantidad por la nueva
        setProductList([...productList]); // Actualizamos la lista de productos con los nuevos datos para
        // que se vean los datos actualizados en la página
        setToLocalStorage(PRODUCT_LIST_KEY, [...productList]); // Guardamos en localStorage para que se guarde incluso 
        // al actualizar
    }

    return <div className="shopping-cart-page">
        <h1>Carrito</h1>
        <div className="shopping-cart-page-list">
            <div className="shopping-cart-page-list-headline">
                <label>
                    Precio
                </label>
                <label>
                    Total
                </label>
            </div>
            {
                productList.map((product: ProductCardProps) => {
                    return <div className="shopping-cart-page-product">
                        <div className="shopping-cart-page-product-image">
                            <img src={product.imagesUrl[0]} alt="" />
                        </div>
                        <div className="shopping-cart-page-product-desc">
                            <div>
                                {product.description}
                            </div>
                            <div className="shopping-cart-page-product-quantity">
                                <div>
                                    <label>CANTIDAD:</label>
                                    <Input
                                        className="dark"
                                        type="number"
                                        defaultValue={product.quantity}
                                        onChange={(e) => {handleOnQuantityChange(e, product.id)}}/>
                                </div>
                                <Button 
                                    type="button"
                                    onClick={() => handleClick(product.id)}
                                    label="Eliminar"
                                    className="dark"
                                />
                            </div>
                        </div>
                        <div className="shopping-cart-page-product-price">
                            ${product.price}
                        </div>
                        <div className="shopping-cart-page-product-total">
                            ${product.quantity! * product.price}
                        </div>
                    </div>
                })
            }
            <div className="shopping-cart-page-total">
                <label>Total: ${total}</label>
                <ButtonLink href="checkout" label="Proceder al pago" className="dark" />
            </div>
        </div>
    </div>
};

export { ShoppingCartPage };
