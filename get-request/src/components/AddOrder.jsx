import { useRef } from "react";
import classes from "./styles/AddOrder.module.css";

/*
 * useRef memorizza una reference al mio input nella form, è come fosse un puntatore.
 * Alternativa è utilizzare input controllati.
 *
 * ureRef non è una stringa in questo caso ma rappresenta l'oggetto della input. Il
 * .value è per accedere al valore della <input>
 */

const AddOrder = (props) => {
    const idRef = useRef('');
    const nameRef = useRef('');
    const priceRef = useRef('');

    function submitHandler(event){
        event.preventDefault();

        console.log('Dati in invio...');

        //Validazione dati

        const order = {
            id: idRef.current.value,
            name: nameRef.current.value,
            price: priceRef.current.value,
          };
      

        props.onAddOrder(order);
    }

    return (
        <form onSubmit = {submitHandler}>
            <div className={classes.control}>
                <label htmlFor="id">Id</label>
                <input type="text" id='id' ref={idRef} />
            </div>
            <div className = {classes.control}>
                <label htmlFor="name">Name</label>
                <input type="text" id= 'name' ref={nameRef} />
            </div>
            <div className = {classes.control}>
                <label htmlFor="price">Price</label>
                <input type="text" id='price' ref={priceRef} />
            </div>
            <button>Add order</button>
        </form>
    );
};

export default AddOrder;