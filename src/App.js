import React, { useEffect, useState } from 'react';
import './index.scss';
import Collection from './Collection';

// mockapi.io -  photoCollections

function App() {
  const cats=[
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ];


  const [categoryId,setCategoryId]=useState(0);
  const [searchValue,setSearchValue]=useState('');
  const [collections,setCollections]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [page, setPage]=useState(1);


  useEffect(()=>{
    setIsLoading(true);

    const category=categoryId ? `category=${categoryId}` : '';
    fetch(`https://64ba5e815e0670a501d60f0f.mockapi.io/collections?page=${page}&limit=3&?${categoryId}`
    )
      .then(response=>response.json())
      .then(json=>{
        setCollections(json);
      })
      .catch((err)=>{
        console.warn(err);
        alert('Mistake to connect server');
      })
      .finally(()=> setIsLoading(false))
  },[categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i)=> (
              //console.log(i);
              <li 
                onClick={()=> setCategoryId(i)}
                className={categoryId===i ? 'active': '' } 
                key={obj.name}>
              {obj.name}
              </li>
            ))
          }
        </ul>
        <input 
          value={searchValue} 
          onChange={(e)=>{setSearchValue(e.target.value)}}
          className="search-input"    
          placeholder="Поиск по названию" />
      </div>
      <div className="content">
      {isLoading ? <h2>Page is loading...</h2> :
        
          collections
          .filter(obj=>{
            return obj.name.toLowerCase().includes(searchValue.toLowerCase());
          })
          .map((obj, index)=> (
            <Collection  
              key={index} 
              name={obj.name}
              images={obj.photos}
            />
          ))
        
      }
       
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_,i)=>(
            <li 
              onClick={()=>setPage(i+1)}
              className={page=== (i+1) ? 'active' : ''}>{i+1}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
