import { useState} from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const myStyle = {
    backgroundColor: "#434343", 
   };
   const  [cartIsShown, setCartIsShown]=useState(false);

   const showCartHandler=()=>{
    setCartIsShown(true);
   }

   const hideCartHandler=()=>{
    setCartIsShown(false);
   }
   //since all the components here need access to the cart
   //we'll wrap all in a cartprovider context
  return (
    <div style={myStyle}>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler}/>}
        <Header onShowCart={showCartHandler}/>
        <main>
          <Meals/>
        </main>
      </CartProvider>
    </ div>
      
  
  );
}

export default App;
