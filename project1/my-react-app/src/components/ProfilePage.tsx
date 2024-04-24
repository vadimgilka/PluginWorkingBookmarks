import React from 'react';
import IconButton from './IconButton.tsx'
import './ProfilePage.css'


const handleChangeName = () => {
    console.log('Кнопка добавления записи нажата');
  };


const ProfilePage = () => {

    const notif_list = [
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

const name = "wekrthkwerht";
    return (
      <div>
        
        <div className='map-title-container'>
            <div className="prof-title1">Profile</div>
        </div>

        <div className='map-title-container1'>
            <div className='nameAndIcon'>
                <div className="profileName">{name}</div>
                <IconButton icon={'./src/icons/edit_red.png'} onClick={{}} style={ {marginLeft: '20px',  marginTop: '10px'}}/>
            </div>
            <div className='logout'>LogOut</div>
        </div>


        <div className="notif-container">
          <div className="notif-panel">

          <h1 className='notif-title'>Notifications</h1>
         

          </div>
        </div>
      </div>

      );
    };
    

export default ProfilePage;