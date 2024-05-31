import React from 'react';
import './ItemsList.css';
import IconButton from './IconButton';
import {Category} from '../types/types'
import { pointer } from 'd3';
import { Link } from 'react-router-dom';


const server_address= "http://localhost:3000"
const ItemsList = ({noteInfo, openEdit, items, category,categories, setNotes }) => {

  let categoryItems: Category[] = []; 

  if(category === null)
    {
        categoryItems = items;
    }
    else {
      
      if(category>=0)
    {
        items.forEach((c) => {
          if(c.categoryId===category)
            {
                categoryItems.push(c);
            }
         });
    }
    else if (category==-2)
      {
        items.forEach((c) => {
          if(c.isread==1)
            {
                categoryItems.push(c);
            }
         });
      }
      else if (category==-3)
        {
          items.forEach((c) => {
            if(c.isread==0)
              {
                  categoryItems.push(c);
              }
           });
        }


      }
        console.log(categoryItems);
      console.log(category);

  const handleDelete = (index) => {
    console.log('Удалить элемент с индексом:', index);
    fetch(server_address + "/notes/delete/" + index, {
      method: 'DELETE',
      body: JSON.stringify({
        id: parseInt(index), 
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Request failed.");
    })
    .then(() => {
      setNotes?.((prevNotes) => {
        const newNotes = prevNotes.filter(note => note.id !== index);
        return newNotes;
      });
    })
    .catch((error) => {
      console.log(error);
    });

    // fetch(server_address + "/notifs/delete/" + index, {
    //   method: 'DELETE',
    //   body: JSON.stringify({
    //     noteId: parseInt(index), 
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: "include"
    // })
    // .then((response) => {
    //   if (response.ok) {
    //     return response.json();
    //   }
    //   throw new Error("Request failed.");
    // })
    // .then(() => {
    //   setNotifs?.((prevNotifs) => {
    //     const newNotifs = prevNotifs.filter(notif => notif.noteId !== index);
    //     return newNotifs;
    //   });
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

  };

const readornot = ({item}) =>{
  
  if(item.isread ==1)
    {
      return (<IconButton icon={'./src/icons/read_white.png'} onClick={{}} style={{marginLeft: '30px', cursor: 'default'}}/>);
    }
       return (<IconButton icon={'./src/icons/trasparent_ico.png'} onClick={{}} style={{marginLeft: '30px', cursor: 'default'}}/>);
  }

    return (
        
      <div className="list-container">
        <ul className="item-list">
        
        {categoryItems.map((item, index) => (
            <li key={index} className="list-item">
              <div className="card">
                <span className="title" style={{cursor:"pointer"}} onClick={()=>noteInfo({item, categories})}>{item.name}</span>
                <div className="icons">
                  {readornot({item})}
                    <IconButton icon={'./src/icons/edit_white.png'} onClick={()=>openEdit({item})} style={{marginLeft: '30px'}}/>
                    <IconButton icon={'./src/icons/delete_white.png'} onClick={()=>handleDelete(item.id)} style={{marginLeft: '30px', marginRight: '30px'}}/>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };


  export default ItemsList;