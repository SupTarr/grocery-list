const Footer = () => {
    const now = new Date()
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>Copyright ©{now.getFullYear()} - All right reserved by SupTarr</p>
      </aside>
    </footer>
  );
};

export default Footer;
