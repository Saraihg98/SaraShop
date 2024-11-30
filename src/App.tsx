import NavBar from './components/NavBar/NavBar';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/root';

import './App.css';
import { Footer } from './components/Footer/Footer';
import { ShoppingCartContext } from './providers/ShoppingCartContext';
import { useEffect, useState } from 'react';
import { getFromLocalStorage } from './utils/localStorage';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { FavoritesContext } from './providers/FavoritesContext';


const PRODUCT_LIST_KEY = "PRODUCT_LIST_KEY";
const FAVORITES_LIST_KEY = "FAVORITES_LIST_KEY";
const ppInitialOptions = {
  clientId: "test",
  currency: "MXN",
  intent: "capture",
};

function App() {
  const [productList, setProductList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);

  // Obtiene el carrito de compras SI existe en la bodega
  useEffect(() => {
    const result = getFromLocalStorage(PRODUCT_LIST_KEY);
    if (result) {
      setProductList(result);
    }
    const favorites = getFromLocalStorage(FAVORITES_LIST_KEY);
    if (favorites) {
      setFavoritesList(favorites);
    }
  }, []);

  return (
    <PayPalScriptProvider options={ppInitialOptions}>
      <ShoppingCartContext.Provider value={{
        productList,
        setProductList
      }}>
                <FavoritesContext.Provider value={{
          favoritesList,
          setFavoritesList
        }}
        >
          <div className="app">
            <NavBar />
            <RouterProvider router={router} />
            <Footer />
          </div>
        </FavoritesContext.Provider>
      </ShoppingCartContext.Provider>
    </PayPalScriptProvider>
  );
 }
export default App;
