import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import { Home, Category, About, User, ProductDetail, InComing } from "./Page";
import { useEffect, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import UnknowPage from "./Page/UnknowPage.js";
import { useSelector } from "react-redux";
import { toogleStateSelector } from "./App/Selectors.js";

function App() {
  let currentLocation = useLocation();
  const toogleState = useSelector(toogleStateSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentLocation.pathname]);

  const exception = useMemo(() => {
    return [
      "review",
      "productDetail",
      "cart",
      "addAddress",
      "updateAddress",
      "editAddress",
      "order",
    ];
  }, []);

  useEffect(() => {
    let scrollState = "";
    {
      !exception.includes(toogleState)
        ? (scrollState = "auto")
        : (scrollState = "hidden");
    }
    {
      toogleState == "productDetail" && window.scrollTo(0, 0);
    }
    document.querySelector("body").style.overflowY = scrollState;
  }, [toogleState]);

  return (
    <>
      <Navbar path={currentLocation.pathname} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:catalogName" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/productdetail/:catalogName/:productId/:typeId"
            element={<ProductDetail />}
          />
          <Route
            path="/login"
            element={<User path={currentLocation.pathname} />}
          />
          <Route
            path="/register"
            element={<User path={currentLocation.pathname} />}
          />
          <Route path="/incoming/:productId" element={<InComing />} />
          <Route path="*" element={<UnknowPage />} />
        </Routes>
      </main>
      <Footer path={currentLocation.pathname} />
    </>
  );
}

export default App;
