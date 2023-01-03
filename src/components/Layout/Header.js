import {Fragment} from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header =props=>{
   //console.log(props)
    return <Fragment>
        <header className={classes.header}>
           <h1>TrevorMeal App</h1>
           <HeaderCartButton  onClick={props.onShowCart}/>
          
        </header>
        <div className={classes['main-image']}>
          <img src={mealsImage} alt="header image"/>
        </div>
    </Fragment>

};
export default Header;
