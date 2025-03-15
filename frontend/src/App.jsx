import { RouterProvider } from "react-router-dom";
import AppRoutes from "./router/routes";

import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <div className="min-h-screen ">
        <RouterProvider router={AppRoutes} />
      
      </div>
    </CartProvider>
  );
};

export default App;
