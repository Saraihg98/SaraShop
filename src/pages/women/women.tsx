import { Catalog } from "../../components/Catalog/Catalog";
import { Hero } from "../../components/Hero/Hero";
import {  catalogWomen } from "../../data/catalog";


const heroWomenPage = {
    imageUrl: 'https://res.cloudinary.com/deofotbwc/image/upload/v1732994595/mujeres_sfhfu5.png',
    imageText: 'Nuevos modelos',
    headline: 'Nuevas',
    button: {
        href: '/',
    }
};  

const WomenPage = () => {
    return <>
        <Hero {...heroWomenPage}/>
        <Catalog productList={catalogWomen}/>
    </>
}

export { WomenPage };