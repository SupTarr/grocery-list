type PropsType = {
  length: number;
};

const Footer = ({ length }: PropsType) => {
  const now = new Date();
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>
          {length} List {length <= 1 ? "item" : "items"}
        </p>
        <p>Copyright ©{now.getFullYear()} - All right reserved by SupTarr</p>
      </aside>
    </footer>
  );
};

export default Footer;
