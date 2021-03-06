import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";
import "../styles/NavBar.module.css";

export default function mainLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
