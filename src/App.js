import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';
import axios from 'axios';

function App() {
  const [fromCurrency, setFromCurrency]=useState('rub');
  const [toCurrency, setToCurrency]=useState('usd');
  const [rates,setRates]=useState({});
  const [fromPrice,setFromPrice]=useState(0);
  const [toPrice,setToPrice]=useState(0);


  // useEffect(()=>{
  //   const fetchData=async()=>{
  //       const response=await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json')
  //       const data = await response.json();
  //       setRates(data[fromCurrency][toCurrency]);
  //       console.log(data);
  //   };
  //   fetchData();
  // },[fromCurrency])

  useEffect(()=>{
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}.json`)
      .then((response)=> response.json())
      .then((json)=>{
        setRates(json[fromCurrency][toCurrency])
        // onChangeToPrice(1);
        console.log(json[fromCurrency][toCurrency])
      })
      .catch((err)=>{
        console.warn(err);
        alert('mistake to get info');
      });
  },[fromCurrency])

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

  //  const onChangeFromCurrency=(cur)=>{ // когда меняем валюту
  //   setFromCurrency(cur); // сохр валюту
  //   onChangeFromPrice(fromPrice); // и паралл сумму от валюты вносим в др часть
  // }

  React.useEffect(()=>{
    onChangeFromPrice(fromPrice);
    
  },[fromCurrency ,fromPrice])

  React.useEffect(()=>{
    onChangeToPrice(toPrice);
    
  },[toCurrency ,toPrice])

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
