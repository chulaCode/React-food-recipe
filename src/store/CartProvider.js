import { useReducer } from "react";
import CartContext from "./cart-context";
//useReducer is appropriate since we'll be managing complex logic
 // and multiple state

 const defaultCartState={
    items:[],
    totalAmount:0
 }
 const cartReducer=(state, action)=>{
   if(action.type==='ADD'){
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
      //checking if the item added is already in the array
      const existingCartItemIndex =state.items.findIndex((item)=>
          item.id===action.item.id
      );
      //storing the index retrieved from existing cartIndex
      const existingCartItem= state.items[existingCartItemIndex];
      let updatedItems;
      //logic to update the price of item the cart
      if(existingCartItem){
         const updatedItem ={
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount,   
            
         };
         //console.log(existingCartItem.amount+action.item.amount)
        
         updatedItems=[...state.items];
         updatedItems[existingCartItemIndex]=updatedItem;
      }else{
         updatedItems= state.items.concat(action.item);
      }

      return{
         items:updatedItems,
         totalAmount:updatedTotalAmount
      };
   }
   if (action.type === 'REMOVE') {
      //console.log(action)
      const existingCartItemIndex = state.items.findIndex(
         (item) => item.id === action.id
       );
       
       const existingItem = state.items[existingCartItemIndex];
       
       const updatedTotalAmount = state.totalAmount -  existingItem.price;
       let updatedItems;
       //if the item is the last in the cart code slippet to remove the entire item
       if (existingItem.amount === 1) {
         updatedItems = state.items.filter(item => item.id !== action.id);
       } else {
         const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
         updatedItems = [...state.items];
         updatedItems[existingCartItemIndex] = updatedItem;
       
      }
       return {
          items: updatedItems,
          totalAmount: updatedTotalAmount
        };
   }
   //code snippet to clear all items in cart after submission
   if(action.type==='CLEAR'){
      return defaultCartState
   }
   return defaultCartState;
 };

const CartProvider =(props)=>{
   
   const  [cartState, dispatchCartAction]=useReducer
   (cartReducer, defaultCartState);

    const addItemToCartHandler=item=>{
       dispatchCartAction({type:'ADD',item:item});
    }
    const removeItemFromoCartHandler= id=>{
        dispatchCartAction({type:'REMOVE', id:id});
    }
    const clearCartHandler=()=>{
      dispatchCartAction({type:'CLEAR'});
    }
    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromoCartHandler,
        clearCart:clearCartHandler
    };
   return <CartContext.Provider value={cartContext}>
      {props.children}
   </CartContext.Provider>
}
export default CartProvider;