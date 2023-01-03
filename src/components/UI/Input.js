import React from 'react';
import classes from './Input.module.css';

const Input= React.forwardRef((props, ref) =>{
    //how to pass configurable data using spread operator
    //passind it to <input for example
    //{...props.input} this ensure all configurable object is added to input
  return <div className={classes.input}>
    <label htmlFor={props.input.id}>{props.label}</label>
    <input ref={ref} {...props.input}/>
  </div>
});
export default Input;