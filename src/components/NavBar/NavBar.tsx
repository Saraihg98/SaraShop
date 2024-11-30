import ImageFrame from "../ImageFrame/ImageFrame";
import { Menu } from "./components/Menu/Menu";
import { NavUtils } from "./components/NavUtils/NavUtils";

import './NavBar.styles.scss';

const NavBar = () => {
    return <div className="nav-bar">
        <a href="/">
            <ImageFrame 
                src="https://res.cloudinary.com/deofotbwc/image/upload/v1732995798/logosemilla_pf4nha.png"
                alt="logo-semilla"
                width="50"
            />
        </a>
        <Menu />
        <NavUtils />
    </div>
}

export default NavBar;
