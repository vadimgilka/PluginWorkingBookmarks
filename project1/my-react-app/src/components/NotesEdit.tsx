import React, { useState } from 'react';
import './NotesEdit.css';

const NotesEdit = () => {

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDesc] = useState('');
  
    const handleSave = () => {
      // Действия при сохранении
      console.log('Saved!');
    }; 
  return (
    <div className="form-container">
      <div className="form-row">
        <span className="label">Name:</span>
        <input 
            type="text" 
            value={name} 
            className="input-field"
            onChange={(e) => setName(e.target.value)} 
          />
       
      </div>
      <div className="form-row">
        <span className="label">Url:</span>
        <input 
            type="text" 
            className="input-field"
            style={{border: 'none', outline: 'none'}}
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
          />
      </div>

      <div className="form-row">
        <span className="label">Category:</span>
        <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="select-field">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
      </div>

      <div className="form-row">
          <span className="label">Description:</span>
          <textarea 
            value={description} 
            className="desc-field"

            onChange={(e) => setDesc(e.target.value)} 
          />
        </div>

      <div className="button-row">
        <button className="back-button">Back</button>
        <button className="save-button">Save</button>
      </div>
    </div>
  );
};

export default NotesEdit;