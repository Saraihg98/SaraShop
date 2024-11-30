import { FC } from "react";
import ButtonLink from "../ButtonLink/ButtonLink";
import { FaCartShopping } from "react-icons/fa6";
import ReactStars from 'react-stars';
import './ProductCard.styles.scss';

export interface ProductCardProps {
    id: string;
    imagesUrl: string[];
    description: string;
    price: number;
    stars: number;
    discount?: number;
    title: string;
    quantity?: number;
}

const ProductCard: FC<ProductCardProps> = ({
    imagesUrl,
    description,
    price,
    stars,
    discount,
    id
}) => {
    return <a className="product-card"
        href={`/product/${id}`}>
        <img
            className="product-card-img" 
            src={imagesUrl[0]}
            alt="" />
        <label>{description}</label>
        <ReactStars
            count={5}
            size={16}
            value={stars}
            edit={false}
        />
        <div className="product-card-footer">
            <p>
                <label
                    className="product-card-price">
                        $MXN{price}
                </label>
                <label
                    className="product-card-discount">
                        -{discount}%
                </label>
            </p>
        </div>
    </a>
}

export { ProductCard };
