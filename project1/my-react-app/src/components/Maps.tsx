import React, { useState } from 'react';
import './NotesPage.css';
import MapsList from './MapsList.tsx';
import IconButton from './IconButton.tsx'
import './Maps.css'
import MapEdit from './MapEdit.tsx';


const handleAddMap = () => {
    console.log('Кнопка добавления записи нажата');
  };


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


export const MapPageState = ({maps}) => {

  // Открывает поле редактирования
  const editMap = ({item}) => {
    console.log('Редактировать элемент');
    SetMapPageState(< MapEdit listMaps={listMaps} item={item} /> );
  };
  // Открывает список карт
  const listMaps = () => {
    console.log('Назад');
    SetMapPageState(<MapsList openMapEdit={editMap} items={maps}/> );
  };

  const [MapsBlock,SetMapPageState] = useState(<MapsList openMapEdit={editMap} items={maps}/>);
  
  return {
    MapsBlock: MapsBlock,
    ItemsList: <MapsList openMapEdit={editMap} items={maps}/>
  };
};
  
const Maps = ({maps,isAuth}) => {
  if (!isAuth)
    {
      console.log("not logged");
      return(<p style={{color:'black', fontFamily: 'Inika', fontSize:'xx-large', marginLeft:'15%', marginTop:'2%'}}>Please login.</p>);
    }
  const {MapsBlock} = MapPageState({maps});

    return (
      <div>
        <div className='map-title-container'>
            <div className="map-title1">Maps</div>
            <IconButton icon={'./src/icons/Plus.png'} onClick={()=>{}} style={ {marginLeft: '20px',  marginTop: '10px'}}/>
        </div>

        <div className="map-container">
          <div className="map-left-panel">

  
          {MapsBlock}

          </div>
        </div>
      </div>

      );
    };
    

export default Maps;