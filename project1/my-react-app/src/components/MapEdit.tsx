import React, { useState } from 'react';
import './MapEdit.css';


const MapEdit = ({listMaps,  item}) => {

    const [name, setName] = useState('');

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
            value={item.name} 
            className="input-field"
            onChange={(e) => setName(e.target.value)} 
          />
       
      </div>

      <div className="button-row">
        <button className="back-button" onClick={listMaps}>Back</button>
        <button className="save-button">Save</button>
      </div>
    </div>
  );
};

export default MapEdit;