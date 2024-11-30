import { Catalog } from "../../components/Catalog/Catalog";
import { Hero } from "../../components/Hero/Hero";
import { catalogKids } from "../../data/catalog";


const heroKidsPage = {
    imageUrl: 'https://res.cloudinary.com/deofotbwc/image/upload/v1732994595/Inter_lqwhrl.png',
    imageText: 'Nuevos modelos',
    headline: 'Nuevas',
    button: {
        href: '/',
    }
};  

const KidsPage = () => {
    return <>
        <Hero {...heroKidsPage}/>
        <Catalog productList={catalogKids}/>
    </>
}

export { KidsPage };