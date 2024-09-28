import { Outlet, Link } from "react-router-dom";
import "./Layout.css"
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <main className="main" dir="rtl">
      <Toaster />

        <nav>
          <ul className="navbar">
            <li>
              <Link to="/">صفحه اصلی</Link>
            </li>

            <li>
              <Link to="/cars">لیست خودرو ها</Link>
            </li>

            <li>
              <Link to="/fines">انواع جریمه</Link>
            </li>

            {/* <li>
              <Link to="/car-fines">جریمه‌های خودرو</Link>
            </li> */}
          </ul>
        </nav>

        <Outlet />

      </main>

    </>
  )
};

export default Layout;