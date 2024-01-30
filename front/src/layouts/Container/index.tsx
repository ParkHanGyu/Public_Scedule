import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const Container = () => {
  // useLocation() : 현재 경로를 가져옴
  //const {pathname} = useLocation();

  //    render: 레이아웃 렌더링           //
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* {pathname !== AUTH_PATH() &&<Footer/>} */}
    </>
  );
};

export default Container;
