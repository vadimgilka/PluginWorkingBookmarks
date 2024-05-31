import React from 'react';
import './MapsList.css';
import IconButton from './IconButton';

const ItemsList = ({ openMapEdit, items }) => {
    return (
        
      <div className="list-container">
        <ul className="item-list">
        
        {items.map((item, index) => (
            <li key={index} className="list-item">
              <div className="card">
                <div className="title">{item.name}</div>
                <div className="icons">
                    <IconButton icon={'./src/icons/edit_white.png'} onClick={()=>openMapEdit({item})} style={{marginLeft: '30px'}}/>
                    <IconButton icon={'./src/icons/delete_white.png'} onClick={()=>handleDelete(index)} style={{marginLeft: '30px', marginRight: '30px'}}/>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  const handleDelete = (index) => {
    console.log('Удалить элемент с индексом:', index);
  };
  
  const handleEdit = (index) => {
    console.log('Редактировать элемент с индексом:', index);
  };
  
  export default ItemsList;