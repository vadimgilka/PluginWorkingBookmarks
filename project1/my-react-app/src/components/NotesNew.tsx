import React, { useEffect, useState } from 'react';
import './NotesNew.css';
import {Note} from '../types/types'

const NotesNew = ({listNotes, categories, setNotes}) => {
    const server_address= "http://localhost:3000"

    console.log(categories);

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState<number | null>(null);
    const [description, setDesc] = useState('');
    const [read, setRead] = useState<number>(0);



    const handleSave = () => {
        
      if(name.length > 60 || name == '')
        {
          alert("The name is incorrect. It must be up to 60 characters and not empty.");
          return;
        }
      if(description.length > 2000)
        {
          alert("The description is too long. It must be up to 2000 characters.");
          return;
        }
      if(url.length > 2048)
        {
          alert("The url is too long. It must be up to 2048 characters.");
          return;
        }




      let readdate = null;
      if(read == 1)
        {
          const toMysqlFormat = (date) => {let str = date.toISOString().slice(0, 19); str+=".000Z"; return(str);}
          readdate = toMysqlFormat(new Date());
        }
        

        fetch(server_address + "/notes/add", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name, 
                url: url,
                categoryId:  category !== null ? Number(category) : null,
                description: description,
                isread: Number(read),
                readdate: readdate,
                userId: 1
            }),
            credentials: "include"
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Request failed.");
        })
        .then((data) => {
            // Обновляем состояние notes
            console.log(data);
            setNotes?.((prevNotes) => {
                const newItem = {
                    id: data.newItem.id, // Получаем новый id из ответа сервера
                    name: name,
                    url: url,
                    categoryId: category,
                    description: description,
                    isread: read,
                    readdate: readdate !== null ? new Date(readdate) : null,
                    userId: 1
                };
        
                return [...prevNotes, newItem]; // Добавляем новую запись к существующим заметкам
            });
        })
        .catch((error) => {
            console.log(error);
        });
        


    }; 


  return (
    <div className="form-container">
      <div className="form-row">
        <span className="label">Name:</span>
        <input 
            type="text" 
            defaultValue={''} 
            className="input-field"
            onChange={(e) => {setName(e.target.value)}} 
          />
       
      </div>
      <div className="form-row">
        <span className="label">Url:</span>
        <input 
            className="input-field"
            defaultValue={''} 
            onChange={(e) => {setUrl(e.target.value)}} 
          />
      </div>

      <div className="form-row">
        <span className="label">Category:</span>
        <select 
            onChange={(e) => {setCategory(e.target.value == 'null' ? null : parseInt(e.target.value) as number);}}
            className="select-field">
            <option value={'null'}>{"All"}</option>
            {categories.map((categ) => (
              <option key={categ.id} value={categ.id}>{categ.name}</option>
            ))}
          </select>
      </div>

      <div className="form-row ">
          <span className="label">Description:</span>
          <textarea 
            defaultValue={''} 
            className="desc-field"

            onChange={(e) => {setDesc(e.target.value)}} 
          />
        </div>

        <div className="form-row">
        <span className="label">Read:</span>
         <input
            type="checkbox"
            style={{width:'20px',height:'20px'}}
            defaultChecked={false}
            onChange={(e) => {setRead(Number(e.target.checked))}} 
        />
        <div className='place'></div>
      </div>
      <div className="button-row">
        <button className="back-button" onClick={()=>listNotes(null)}>Back</button>
        <button type="button" className="save-button" onClick={handleSave}>Save</button>
   
      </div>
   
    </div>
  );
};


export default NotesNew;