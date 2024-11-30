import { Catalog } from "../../components/Catalog/Catalog";
import { catalogMen } from "../../data/catalog";

const MenPage = () => {
    return <>
        <div style={{ textAlign: 'center', marginTop: '150px'}}>
        <img 
          src="https://res.cloudinary.com/deofotbwc/image/upload/v1732994594/PORTADAHOMBRES_1_xlplpp.png" 
          alt="portada hombre" 
          style={{ width: '100%', maxWidth: 'fit-content', height: 'auto' }} 
        />
        </div>
        <Catalog productList={catalogMen}/>
    </>
}
export { MenPage };