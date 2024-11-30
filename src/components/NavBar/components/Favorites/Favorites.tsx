import { FaRegHeart } from "react-icons/fa";
import { IconLink } from "../../../IconLink/IconLink";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../../../../providers/FavoritesContext";
import { ProductCardProps } from "../../../ProductCard/ProductCard";

const Favorites = () => {
    const { favoritesList } = useContext(FavoritesContext);
    const [ count, setCount ] = useState(0);

    useEffect(() => {
        let sum = 0;
        favoritesList.forEach((product: ProductCardProps) => {
            sum += Number(product.quantity);
        });
        setCount(sum);
    }, [favoritesList]);

    return <div>
        <IconLink href="/favorites"
            label={
                favoritesList.length > 0 ? 
                String(count) : 
                ''}>
            <FaRegHeart />
        </IconLink>
    </div>
}

export { Favorites };