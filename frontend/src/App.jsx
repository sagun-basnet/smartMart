import { RouterProvider } from "react-router-dom";
import AppRoutes from "./router/routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const App = () => {
  return (

    <div className="min-h-screen bg-gray-100">
      
      <RouterProvider router={AppRoutes} />
      <Footer />
    </div>
  );
};

export default App;
