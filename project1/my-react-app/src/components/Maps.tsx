import React from 'react';
import './NotesPage.css';
import MapsList from './MapsList.tsx';
import IconButton from './IconButton.tsx'
import './Maps.css'


const handleAddMap = () => {
    console.log('Кнопка добавления записи нажата');
  };



const Maps = () => {

    const maps_list = [
        'Map1',
        'Map2',
        'Map3',
        'Map4',
        'Map5',
        'Map6',
        'Map7',
        'Map8',
        'Map9',
      ];


    return (
      <div>
        <div className='map-title-container'>
            <div className="map-title1">Maps</div>
            <IconButton icon={'./src/icons/Plus.png'} onClick={{}} style={ {marginLeft: '20px',  marginTop: '10px'}}/>
        </div>

        <div className="map-container">
          <div className="map-left-panel">

      
          < MapsList  items={maps_list} /> 


          </div>
        </div>
      </div>

      );
    };
    

export default Maps;