import NavBar from "./NavBar/NavBar";
import "../styles/NavBar.module.css";

export default function mainLayout({ children }) {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
}
