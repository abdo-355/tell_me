import { Link } from "react-router-dom";

// for future nav links
const links = [
  { url: "/geturl", name: "url" },
  { url: "/messages", name: "messages" },
];

const NavLinks = () => {
  return (
    <div className="hidden sm:flex flex-initial items-center h-full">
      {links.map((link) => (
        <Link
          key={link.url}
          to={link.url}
          className="text-gray-100 drop-shadow-lg hover:drop-shadow-2xl textsh text-2xl relative p-1 uppercase mx-2  after:absolute after:inset-y-0 after:-inset-x-1 after:translate-x-full hover:after:-translate-x-3/4 after:transition-all after:duration-500 after:border-b-4 after:border-white overflow-hidden"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};
export default NavLinks;
