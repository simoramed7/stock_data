import React,{useState,useEffect} from "react";
import "./index.css";

export default function StockData() {
  const [data,setData]=useState([]);
  const [input,setInput]=useState("");
  const [dateRequest, setDateRequest] = useState("");
  

const handleChange = event =>{
    setInput(event.target.value);
}

const handleSubmit = event =>{
  event.preventDefault();
  const dateLength = input.length;
  input.indexOf(0) === 0 ? setDateRequest(input.slice(1,dateLength)) : setDateRequest(input);
  
}
 useEffect(() => {
    const fetchFunc = async () => {
      const response = await fetch(
        `https://jsonmock.hackerrank.com/api/stocks?date=${dateRequest}`
      );
      const result = await response.json();
      setData(result.data[0]);
    };

    if(dateRequest != ""){fetchFunc()}
  }, [dateRequest]);

  return (
    
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="text" className="large" placeholder="5-January-2000" onChange ={handleChange} id="app-input" data-testid="app-input"/>
        <button className="" id="submit-button" onClick={handleSubmit} data-testid="submit-button">Search</button>
      </section>

    { dateRequest ?
    data !== undefined ? 
       <ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data">
       <li className="py-10">Open: {data.open} </li> 
       <li className="py-10">Close: {data.close} </li> 
       <li className="py-10">High: {data.high} </li> 
       <li className="py-10">Low: {data.low} </li> 
     </ul>
    : 
    <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result">No Results Found !!</div> : null
    }

</div>


  );
}
