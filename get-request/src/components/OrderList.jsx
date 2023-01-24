import Order from "./Order";
import classes from "./styles/OrderList.module.css";

const OrderList = (props) => { //Dichiarazione del componente
    return (
      <ul className={classes["order-list"]}> {/*Siccome ho chiamato la classe css order-list, quì devo metterla nelle parentesi quadre con i doppi apici*/}
        {props.orders.map((order) => ( //quì lavoriamo in javascript puro perchè siamo nelle parentesi graffe, possiamo quindi usare .map
          <Order id={order.id} price={order.price} name={order.name} />
        ))}
      </ul>
    );
  };

export default OrderList;