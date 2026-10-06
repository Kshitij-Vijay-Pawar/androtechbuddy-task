const navbarLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        {navbarLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-white hover:text-gray-300"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}   