import { NavLink } from "react-router-dom";

import { routes } from "../../routes";

type Props = {
    to: string;
    children: string
}

const WaNavLink = ({ to, children }: Props) => {
    return (
        <NavLink
        to={to}
        className={({ isActive, isPending }) => 
            isActive ? "text-red-700": isPending ? "text-yellow-600" : ""
        }
    >
        {children}
    </NavLink>
    )
}

export const Menu = () => {
    return (
        <div>
            <nav>
                <ul className="flex">
                    <li className="mx-2">
                        <WaNavLink to={routes.HOME.path}>Urzytkownicy</WaNavLink>
                    </li>
                    <li>
                        <WaNavLink to={routes.FORMULARZ.path}>Formularz</WaNavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}