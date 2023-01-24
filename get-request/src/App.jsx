import { useState } from 'react'
import './App.css'
import OrderList from "./components/OrderList";
import AddOrder from "./components/AddOrder"; 

/**SU POSTMAN
 * Dobbiamo creare un server di Mocking --> che simula la presenza di un backend
 * 1) new --> mock server
 * 2) in request chiede a quale indirizzo devo fare riferimento --> qual è il mio end point
 * response body è il json di ritorno che voglio dare a chi usufruisce del mio servizio, in questo caso --> {"orders": [ {"id":1, "name":"Order 1", "price":9.99},{"id":2, "name":"Order 2", "price":5.99} ]}
 * New --> Metto il nome del mock server (solo il primo campo) --> Create mock server
 * Click su collections, apro la GET che ho appena creato, apro default e vedo il mio json di risposta
 * Vado su Tab principale e faccio copy url
 */

/**SU VSCODE
 * Parto da Order.jsx, compilo tutto e poi faccio OrderList.jsx
 * Faccio cartella styles con all'interno i file css corrispondenti ai file dei components
 * i nomi dei file saranno .module.css perchè import delle classi css come se fossero oggetti js --> import classes from './styles/Order.module.css'
 * 
 */
function App() {
  const [orders, setOrders] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //Come fare il fetching significa come leggere i dati da React, dati presi da un servizio esterno (in questo caso da Postman) poi da Spring
  
  async function fetchOrderHandler(){ /**Funzione che gestisce la chiamata, è oggetto che sa fetchare i dati */
    setIsLoading(true);
    setError(null);

    try {
      //AWAIT aspetta il risultato della promise, resta in attesa dei dati
      const response = await fetch(
        'https://d696644e-8718-4e5e-afbb-187864a3dc6a.mock.pstmn.io/myorders'
      );

      //se lo stato della richiesta non è 200-OK c'è errore
      if(!response.ok){
        throw new Error('Something went wrong');
      }

      const data = await response.json(); //Riconverto la risposta in un json
      const transformedOrders = data.orders.map((order) => { //order è ogni item della mia lista. Prendo il parametro orders dentro data entrandoci con il .map
        return { id: order.id, name: order.name, price: order.price} //ritorna un oggetto. Questi order.x è order scritto sopra
      });

      setOrders(transformedOrders);

    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
    setIsLoading(false);
  }

  async function addOrderHandler(order) {
    const response = await fetch ('https://d696644e-8718-4e5e-afbb-187864a3dc6a.mock.pstmn.io/myorders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-type' : 'application/json'}
    });

    const data = await response.json();
    /* 
    * Sto aggiugendo il nuovo ordine in RAM, cioè Postman non mantiene la collezione aggiornata se eseguo refresh pagina 
    * oppure faccio di nuovo fetch mi perdo i dati perché la collezione di ritorno è statica!
    */

    setOrders(orders => [...orders, order]); //Questo è lista di orders(riga 23) e la variabile order
    console.log(data);
  }

  let content = <p>Found no orders!</p>;

  if(orders.length > 0){ //Questo orders è la variabile a riga 23
    content = <OrderList orders = {orders} />;
  }

  if (isLoading){
    content = <p>Loading...</p>;
  }

  if (error){
    content = <p>{error}</p>
  }

  return (
    <>
    <section> {/*Come div ma più parlante*/}
      <AddOrder onAddOrder = {addOrderHandler}/>
    </section>
    <section>
      <button onClick = {fetchOrderHandler}> Fetch Orders </button> {/*pulsante che fa fetch (legge) dei dati*/}
    </section>
    <section>{content}</section>
      </>
      
  )
}

export default App;
