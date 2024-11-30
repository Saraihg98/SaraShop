import { FC } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import classNames from "classnames";

import './ButtonLink.styles.scss';

export interface ButtonLinkProps {
    href: string;
    label?: string | null;
    className?: string;
    iconAfter?: () => React.ReactElement;
    style?: any;
}

const ButtonLink: FC<ButtonLinkProps>
    = ({ href, label, className, iconAfter, style }) => {
    const classes = classNames('button-link', className);

    return <a className={classes} href={href} style={style}>
        { // if (condicion) { se ejecuta } // FALSY - THRUTLY
            // FALSY -> undefined, cadena vacía, Null, 0, false
            // THRUTLY -> Cadena con algún valor
            label && // Pregunta si label es verdadero
                <div className="button-link-label">
                    {label}
                </div>
        }
        { // if (condicion) { se ejecuta } else { cae aquí }
            iconAfter ? // Pregunta si iconAfter es verdadero
            // TRhutly -> es algo
            iconAfter() : // <- Si es verdadero muestra iconAfter
            <FaArrowRightLong /> // <- Sino muestra la flecha
        }
    </a>;
}

export default ButtonLink;
