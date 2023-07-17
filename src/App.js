import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users,setUsers]=useState([]);
  const [isLoading,setLoading]=useState(true);
  const [searchValue,setSearchValue]=useState('');
  const [invites,setInvites]=useState([3,1]);
  const [success,setSuccess]=useState(false);


  useEffect(()=>{
    fetch('https://reqres.in/api/users')
    .then((response)=>{
      return response.json();
    })
    .then((json)=>{
      setUsers(json.data);
      console.log(json.data)
    }).catch((err)=>{ 
      console.warn(err);
      alert('mistaken'); 
    }).finally(()=> setLoading(false))
  },[]);

  const onChangeSearchValue=(event)=>{
    setSearchValue(event.target.value);
  };

  const onClickInvite=(id)=>{
    if(invites.includes(id)){
      setInvites(prev=> prev.filter(idd=>
        idd !== id  
      )) // если есть в списке приглш-х, убираем
    }
    else {
      setInvites(prev=> [...prev, id])
      // если нет в списке, добавляем 
    }
  }

  const onClickSuccess=()=>{
    setSuccess(true);
  }

  return (
    <div className="App">
      {
        success ? <Success count={invites.length}/> : 
        <Users
          onChangeSearchValue={onChangeSearchValue} 
          searchValue={searchValue} 
          items={users} 
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSuccess={onClickSuccess}/>
      }
      
    </div>
  );
}

export default App;
