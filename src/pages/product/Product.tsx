import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Product.styles.scss';
import EmblaCarousel from '../../components/EmblaCarousel/EmblaCarousel';
import { useContext, useEffect, useState } from 'react';
import { catalogKids, catalogMen, catalogWomen } from '../../data/catalog';
import { ProductCardProps } from '../../components/ProductCard/ProductCard';
import ReactStars from 'react-stars';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Catalog } from '../../components/Catalog/Catalog';
import { ShoppingCartContext } from '../../providers/ShoppingCartContext';
import { setToLocalStorage } from '../../utils/localStorage';
import Input from '../../components/Input/Input';
import { FavoritesContext } from '../../providers/FavoritesContext';
import Button from '../../components/Button/Button';

interface ProductFormProps {
    quantity: number;
}

const PRODUCT_LIST_KEY = "PRODUCT_LIST_KEY";
const FAVORITES_LIST_KEY = "FAVORITES_LIST_KEY";
const ProductPage = () => {
    const { productList, setProductList } = useContext(ShoppingCartContext);
    const { favoritesList, setFavoritesList } = useContext(FavoritesContext);
    const { register, handleSubmit } = useForm<ProductFormProps>();
    const params = useParams();
    const [ product, setProduct ] = useState<ProductCardProps>();

    useEffect(() => {
        const result = catalogMen.find((product) => {
            return product.id === params.productId
        });
        if (result) {
            setProduct(result);
        }
    }, []);
    useEffect(() => {
        const result = catalogWomen.find((product) => {
            return product.id === params.productId
        });
        if (result) {
            setProduct(result);
        }
    }, []);
    useEffect(() => {
        const result = catalogKids.find((product) => {
            return product.id === params.productId
        });
        if (result) {
            setProduct(result);
        }
    }, []);

    useEffect(() => {
        if (productList && productList.length > 0) {
            setToLocalStorage(PRODUCT_LIST_KEY, productList);
        }
    }, [productList]);

    useEffect(() => {
        if (favoritesList && favoritesList.length > 0) {
            setToLocalStorage(FAVORITES_LIST_KEY, favoritesList);
        }
    }, [favoritesList]);

    const findProduct = () => {
        // Si lo encuentra regresa la posicion, sino regresa un -1
        const result = productList.findIndex((productSearch: ProductCardProps) => 
            productSearch.id === product?.id
        );

        return result;
    }
    const findProductFromFavorites = () => {
        // Si lo encuentra regresa la posicion, sino regresa un -1
        const result = favoritesList.findIndex((productSearch: ProductCardProps) => 
            productSearch.id === product?.id
        );

        return result;
    }

    const onSubmit: SubmitHandler<ProductFormProps> = (data) => {
        const productIndex = findProduct();
        if (productIndex === -1) { // Cuando no existe, lo añade a la lista
            setProductList(
                [
                    ...productList,
                    {
                        ...product,
                        quantity: Number(data.quantity)
                    }
                ]
            );
        } else { // Cuando existe, solo modificalo
            productList[productIndex].quantity = 
                Number(productList[productIndex].quantity) + 
                Number(data.quantity);
            setProductList([...productList]);
        }
        toast.info("Producto añadido al carrito");
    };

    const addToFavorites = () => {
        const productIndex = findProductFromFavorites();
        if (productIndex === -1) { // Cuando no existe, lo añade a la lista
            setFavoritesList(
                [
                    ...favoritesList,
                    {
                        ...product,
                        quantity: Number(1)
                    }
                ]
            );
        } else { // Cuando existe, solo modificalo
            favoritesList[productIndex].quantity = 
                Number(favoritesList[productIndex].quantity) + 
                Number(1);
            setFavoritesList([...favoritesList]);
        }
        toast.info("Producto añadido a favoritos");
    }
    if (!product) {
        return <div>Este producto no existe, intenta más tarde</div>;
    }

    return <div className='product-page'>
        <div className='product-page-body'>
            <div className='product-page-carousel'>
                <EmblaCarousel slides={product?.imagesUrl}/>
            </div>
            <div className='product-page-detail-wrapper'>
                <div className='product-page-detail-title'>
                    {product.title}
                </div>
                <div className='product-page-detail-price-wrapper'>
                    <div className='product-page-detail-price'>
                        {product.price} MXN
                    </div>
                    <div className='product-page-detail-discount'>
                        {product.discount}%
                    </div>
                </div>
                <ReactStars
                    count={5}
                    size={16}
                    value={product.stars}
                    edit={false}
                />
                {product.description}
                <form className='product-page-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='product-page-form-quantity'>
                        <label>
                            Cantidad
                        </label>
                        <select className='select dark' {...register('quantity')}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                    <Input type='submit' value="Agregar al carrito" className='dark' />
                </form>
                <Button type='button' label="Agregar a favoritos" className='dark' onClick={addToFavorites} />
            </div>
        </div>
        <label>Productos que te pueden interesar:</label>
        <Catalog productList={catalogMen.slice(1, 3)}/>
        <ToastContainer />
    </div>
};

export { ProductPage };
