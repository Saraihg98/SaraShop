import { useContext } from "react";
import { ProductCardProps } from "../../components/ProductCard/ProductCard";
import { FavoritesContext } from "../../providers/FavoritesContext";
import { setToLocalStorage } from "../../utils/localStorage";
import Button from "../../components/Button/Button";

const FAVORITES_LIST_KEY = "FAVORITES_LIST_KEY";

const FavoritesPage = () => {
    const { favoritesList, setFavoritesList } = useContext(FavoritesContext);

    const handleClick = (id: string) => { // id selecciando
        // Cuando el usuario de click, se ejecuta esta función
        // Usamos filter, porque queremos eliminar un elemento de la lista
        const result = favoritesList.filter((product: ProductCardProps) => {
            return product.id !== id // Regresamos todos los products que cumplan esta condición
        });
        setFavoritesList(result);
        setToLocalStorage(FAVORITES_LIST_KEY, result);
    };

    return <div>
        <h1>Favoritos</h1>
        {
                favoritesList.map((product: ProductCardProps) => {
                    return <div className="shopping-cart-page-product">
                        <div className="shopping-cart-page-product-image">
                            <img src={product.imagesUrl[0]} alt="" />
                        </div>
                        <div className="shopping-cart-page-product-desc">
                            <div>
                                {product.description}
                            </div>
                        </div>
                        <div className="shopping-cart-page-product-price">
                            ${product.price}
                        </div>
                        <Button 
                            type="button"
                            onClick={() => handleClick(product.id)}
                            label="Eliminar"
                            className="dark"
                        />
                    </div>
                })
            }
    </div>
}

export { FavoritesPage };