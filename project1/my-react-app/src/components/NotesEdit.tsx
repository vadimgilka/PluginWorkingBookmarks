import React, { useEffect, useState } from 'react';
import './NotesEdit.css';


const NotesEdit = ({listNotes,  item, categories, setNotes}) => {
    const server_address= "http://localhost:3000"



    const [name, setName] = useState(item.name !== null ? item.name  : '');
    const [url, setUrl] = useState(item.url !== null ? item.url : '');
    const [category, setCategory] = useState<number | null>(item.categoryId);
    const [description, setDesc] = useState(item.description !== null ? item.description : '');
    const [read, setRead] = useState<number>(item.isread !== null ? item.isread : 0);
    const [categName,setcategName] = useState('');

    useEffect(() => {
      const foundCategory = categories.find(c => c.id === item.categoryId);
      if (foundCategory) {
          setcategName(foundCategory.name);
      
      }
      }, [categories, item.categoryId]);


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
      if(item.readdate == null && read == 1)
        {
          const toMysqlFormat = (date) => {let str = date.toISOString().slice(0, 19); str+=".000Z"; return(str);}
          readdate = toMysqlFormat(new Date());
        }
        else if (item.readdate != null && read == 1) {
          readdate = item.readdate;
        }
        

      fetch(server_address + "/notes/edit/" + parseInt(item.id), {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: parseInt(item.id),
          name: name, 
          url: url,
          categoryId:  category !== null ? Number(category) : null,
          description: description,
          isread: Number(read),
          readdate: readdate
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
        setNotes?.((prevNotes) => {
          console.log(data.updatedItem.isread);
          const updatedNotes = prevNotes.map((note0) => {
              if (note0.id === data.updatedItem.id) {
                  return {
                    ...note0,
                    name: data.updatedItem.name,
                    url: data.updatedItem.url,
                    categoryId: data.updatedItem.categoryId !== null ?  Number(data.updatedItem.categoryId): null ,
                    description: data.updatedItem.description,
                    isread: data.updatedItem.isread,
                    readdate: data.updatedItem.readdate !== null ? new Date(data.updatedItem.readdate) : null
                  };
  
                }
                return note0;
              });

              return updatedNotes;
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
            defaultValue={item.name} 
            className="input-field"
            onChange={(e) => {setName(e.target.value)}} 
          />
       
      </div>
      <div className="form-row">
        <span className="label">Url:</span>
        <input 
            className="input-field"
            defaultValue={item.url} 
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
            defaultValue={item.description} 
            className="desc-field"

            onChange={(e) => {setDesc(e.target.value)}} 
          />
        </div>

        <div className="form-row">
        <span className="label">Read:</span>
         <input
            type="checkbox"
            style={{width:'20px',height:'20px'}}
            defaultChecked={item.isread}
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


export default NotesEdit;