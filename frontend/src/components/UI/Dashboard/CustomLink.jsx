import { NavLink } from "react-router-dom";

export default function CustomLink({ toPath, Icon, end, innerText }) {
  return (
    <NavLink
      to={toPath}
      end={end}
      className={({ isActive }) =>
        `flex items-center px-3 py-3  transition-colors duration-100 ${isActive ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-gray-100"}`
      }
    >
      {Icon && <Icon size={20} />}
      <span className="px-4 w-full h-full">{innerText}</span>
    </NavLink>
  );
}
