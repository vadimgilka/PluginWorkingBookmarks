import React from 'react';
import IconButton from './IconButton';
import './Note.css'

const Note = ({listNotes,item,categories}) => {
  const categoryNames = () => {
    if(item.categoryId!=null)
      {
    const foundCategory = categories.find((c) => item.categoryId === c.id);
    if (foundCategory) {
      return foundCategory.name;
    } 
    else {
      return ""; // возвращаем пустую строку, если категория не найдена
    }
  }
  else return "All";
  };
  
  let categoryName = categoryNames();

  return (
    <div className="form-container-note">
      <div className="form-row-note">
        <span className="labelnote1">Name:</span>
        <span className="labelnote2">{item.name}</span>
      </div>

      <div className="form-row-note">
        <span className="labelnote1">Url:</span>
        <span className="labelnote2">{item.url}</span>
      </div>

      <div className="form-row-note">
        <span className="labelnote1">Category:</span>
        <span className="labelnote2">{categoryName}</span>
      </div>

      <div className="form-row-note ">
          <span className="labelnote1">Description:</span>
          <span className="labelnote2">{item.description}</span>
        </div>

        <div className="form-row-note">
        <span className="labelnote1">Read:</span>
         <input
         className='labelnote2'
            type="checkbox"
            disabled={true}
            style={{width:'20px',height:'20px'}}
            checked={item.isread}
            onChange={(e) => {console.log('wlekf')}} 
        />
  
      </div>


      <div className="button-row-note">
        <button className="back-button-note" onClick={()=>listNotes (null)}>Back</button>
      </div>
   
    </div>
  );
};

export default Note;