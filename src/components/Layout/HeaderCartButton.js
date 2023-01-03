import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCart.module.css';

const HeaderCartButton=props=>{
    //console.log(props)
    const [btnHighlighted, setBtnHighlighted]=useState(false);
    const cartCtx =useContext(CartContext);

    const {items} =cartCtx;

    //instead of items.length items.reduce method is used on items
    //so we can keep tract of not just the number of items but the amount
    //of each item associated to each individual item.
    const numberOfCartItems = items.reduce((curNumber, item)=>{
        return curNumber+item.amount;
    }, 0);
    const btnClasses =`${classes.button} ${btnHighlighted ? classes.bump : ""}`;

    useEffect(()=>{
        if(items.length===0){
            return
        }
        setBtnHighlighted(true);
        const timer =setTimeout(()=>{
            setBtnHighlighted(false);
        return ()=>{
            clearTimeout(timer)
        }
        },300);

    }, [items]);

    return<button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
}
export default HeaderCartButton;