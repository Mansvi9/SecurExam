import Navbar from "../components/Navbar";
import AdminNavbar from "../components/AdminNavbar";

function MainLayout({ children }) {

  const role = localStorage.getItem("role");

  console.log("ROLE =", role);

  return (

    <div>

      {role === "company" ? (
        <AdminNavbar />
      ) : (
        <Navbar />
      )}

      {children}

    </div>

  );

}

export default MainLayout;