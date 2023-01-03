import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart= props=>{
    const cartCtx=useContext(CartContext); 
    const [isCheckout, setIsCheckout]=useState(false);
    const [isSubmitting, setIsSubmitting]=useState(false)
    const [didSubmit, setDidSubmit]=useState(false)
   
    const [error, setError] = useState(null);
 
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems= cartCtx.items.length > 0;
   
     const cartItemRemoveHandler =id=>{
        cartCtx.removeItem(id);
        //console.log('id',id)
     };

     const cartItemAddHandler =item=>{
        cartCtx.addItem({...item, amount: 1});
     };

     const  orderHandler=()=>{
       setIsCheckout(true);
     }
     const submitOrderHandler=async (userData)=>{
      setIsSubmitting(true);
     
      try{
        const response=await fetch("https://httprequest-react-default-rtdb.firebaseio.com/order.json",{
          method:"POST",
          body:JSON.stringify({
            user:userData,
            orderedItems:cartCtx.items
          })

        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
       
      }catch(error){
        setIsSubmitting(false);
        setDidSubmit(false);
        setError(error.message);
      }
       

     }
      //console.log(cartCtx.totalAmount)
    const cartItems=(
      <ul className={classes['cart-items']}>
         {cartCtx.items.map((item)=>(
         <CartItem key={item.id}
         name={item.name}
         price={item.price}
         amount={item.amount}
         onRemove={cartItemRemoveHandler.bind(null, item.id)}
         onAdd={cartItemAddHandler.bind(null, item)}
         //bind is used so the function with the an argument can receive
         //the argument
         />
         
        ))}
        
       </ul>);
       //{error}
       const modalActions = 
         <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}

        </div>
         const cartModalContent = (
          <React.Fragment>
            {cartItems}
            <div className={classes.total}>
              <span>Total Amount</span>
              <span>{totalAmount}</span>
            </div>
            {isCheckout && (
              <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
            )}
            {!isCheckout && modalActions}
          </React.Fragment>
        );
      
   
   const isSubmittingModalContent = <p>Sending order data...</p>;

   const didSubmitModalContent = (
     <React.Fragment>
       <p>Successfully sent the order!</p>
       <div className={classes.actions}>
       <button className={classes.button} onClick={props.onClose}>
         Close
       </button>
     </div>
     </React.Fragment>
   );
 
   return (
     <Modal onClose={props.onClose}>
       {!isSubmitting && !didSubmit && cartModalContent}
       {isSubmitting && isSubmittingModalContent}
       {!isSubmitting && didSubmit && didSubmitModalContent}
     </Modal>
   );
 };

export default Cart;