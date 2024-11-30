import './NavUtils.styles.scss';
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { Favorites } from "../Favorites/Favorites";

const NavUtils = () => {
    return <div className="nav-utils">
        <Favorites />
        <ShoppingCart />
    </div>
};
export { NavUtils };