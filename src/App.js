import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency]=useState('USD');
  const [toCurrency, setToCurrency]=useState('USD');
  const [rates,setRates]=useState({});
  const [fromPrice,setFromPrice]=useState(0);
  const [toPrice,setToPrice]=useState(0);


  useEffect(()=>{
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json`)
      .then((res)=>res.json())
      .then((json)=>{
        setRates(json.rates)
        console.log(json.rates)
      })
      .catch((err)=>{
        console.warn(err);
        alert('mistake to get info');
      });
  },[])

  const onChangeFromPrice=(value)=>{
    const price=value/rates[fromCurrency];  
    const result=price*rates[toCurrency];
    setToPrice(result);
    setFromPrice(value);
  }

  const onChangeToPrice=(value)=>{
    setToPrice(value);
  }




  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice} />
      <Block 
        value={toPrice} 
        currency={toCurrency}  
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
