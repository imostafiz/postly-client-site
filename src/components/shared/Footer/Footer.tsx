const Footer = () => {
  return (
    <footer className="space-y-3">
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#1C2430]/40">
        {["About", "Help", "Press", "API", "Jobs", "Privacy", "Terms", "Locations"].map((link) => (
          <span
            key={link}
            className="hover:text-[#1C2430]/60 cursor-pointer transition-colors"
          >
            {link}
          </span>
        ))}
      </div>
      <p className="text-xs text-[#1C2430]/30">
        &copy; 2024 Postly &middot; Social Platform
      </p>
    </footer>
  );
};

export default Footer;
