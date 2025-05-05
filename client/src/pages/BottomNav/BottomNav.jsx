import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Globe2, Tv, TrendingUp, Newspaper } from "lucide-react";
import { useSidebar } from "@/SidebarProvider/SidebarProvider";

const navItems = [
  { id: "home", title: "Home", icon: Home, path: "/" },
  { id: "country", title: "Country", icon: Globe2, path: "/CountryNews" },
  { id: "livetv", title: "Live TV", icon: Tv, path: "/LiveVideoNews" },
  { id: "stocks", title: "Stocks", icon: TrendingUp, path: "/StocksNews" },
  { id: "global-news", title: "Global News", icon: Newspaper, path: "/GlobalNews" },
];

export default function BottomNav() {
  const { setOpen } = useSidebar();
  const location = useLocation();
  
  const getActiveId = () => {
    const match = navItems.find((item) => location.pathname === item.path);
    return match ? match.id : "";
  };

  const [active, setActive] = useState(getActiveId());

  const handleClick = (id) => {
    if (id === "menu") setOpen(true);
    setActive(id);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md py-2 z-20">
      <ul className="flex justify-around items-center text-gray-800">
        {navItems.map(({ id, title, icon, path }) => (
          <NavItem
            key={id}
            id={id}
            title={title}
            Icon={icon}
            path={path}
            active={active === id}
            onClick={handleClick}
          />
        ))}
      </ul>
    </nav>
  );
}

function NavItem({ id, title, Icon, path, active, onClick }) {
  return (
    <li className="flex flex-col items-center gap-y-1">
      <Link
        to={path}
        className="flex flex-col items-center"
        onClick={() => onClick(id)}
      >
        <Icon
          className={`w-6 h-6 transition-colors duration-200 ${
            active ? "stroke-red-500" : "stroke-gray-600 hover:stroke-red-400"
          }`}
        />
        <p
          className={`text-xs font-medium transition-colors duration-200 ${
            active ? "text-red-500" : "text-gray-700 hover:text-red-400"
          }`}
        >
          {title}
        </p>
      </Link>
    </li>
  );
}
