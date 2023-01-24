import classes from "./styles/Order.module.css"

const Order = (props) => {  //Dichiarazione del componente

    return ( //Le parentesi tonde mi permettono di andare a capo con il return
            <li className={classes.order}> {/*li perchè è una lista di item. nelle graffe importo la classe css .order*/}
                <h2>{props.id}</h2> {/*è l'id del mio ordine*/} 
                <p><span>Name: {props.name}</span></p> {/*è il nome del mio ordine*/} 
                <p><span>Price: {props.price}</span></p> {/*è il prezzo del mio ordine*/}  
            </li>
            ); 
}

export default Order; 