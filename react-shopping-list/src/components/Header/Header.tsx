import classNames from "classnames";
import { ReactElement } from "react"
import { NavLink } from "react-router";

interface HeaderProps {
  children: ReactElement;
}

const navItems: {
  to: string;
  label: string;
}[] = [
  {
    to: "/shopping-lists",
    label: "Shopping Lists"
  },
  {
    to: "/",
    label: "Home"
  }
]

export function Header({ children }: HeaderProps) {
    return (
      <div className="bg-base-300">
        <div className="navbar container mx-auto flex justify-between">
          <h1 className="text-xl">
            {children}
          </h1>

          <ul className="menu menu-horizontal px-1">
            {
              navItems.map(({ to, label }) => (<li key={to}>
                <NavLink className={({ isActive }) => classNames(isActive && "underline")} to={to}>{label}</NavLink>
              </li>))
            }
          </ul>
        </div>
      </div>
    )
}