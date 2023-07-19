import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency]=useState('rub');
  const [toCurrency, setToCurrency]=useState('usd');
  const [rates,setRates]=useState({});
  const [fromPrice,setFromPrice]=useState(0);
  const [toPrice,setToPrice]=useState(0);


  useEffect(()=>{
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}.json`)
      .then((response)=> response.json())
      .then((json)=>{
        setRates(json[fromCurrency][toCurrency])
        console.log(json[fromCurrency][toCurrency])
      })
      .catch((err)=>{
        console.warn(err);
        alert('mistake to get info');
      });
  },[])

  const onChangeFromPrice=(value)=>{
    // const price=value/rates[fromCurrency];  
    // const result=price*rates[toCurrency];
    const result=value*rates;
    setToPrice(result);
    setFromPrice(value);
  }

  const onChangeToPrice=(value)=>{
    const result=value/rates;
    setFromPrice(result)
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
