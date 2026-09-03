const Footer = () => {
  return (
    <footer className="space-y-3">
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
        {["About", "Help", "Press", "API", "Jobs", "Privacy", "Terms", "Locations"].map((link) => (
          <span
            key={link}
            className="hover:text-gray-400 cursor-pointer transition-colors"
          >
            {link}
          </span>
        ))}
      </div>
      <p className="text-xs text-gray-700">
        &copy; 2024 Postly &middot; Gardening Community
      </p>
    </footer>
  );
};

export default Footer;
