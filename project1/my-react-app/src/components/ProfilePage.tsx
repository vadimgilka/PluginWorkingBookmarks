import React, { useEffect, useState } from 'react';
import IconButton from './IconButton.tsx'
import './ProfilePage.css'
import {Notif} from '../types/types.ts'
import { Link, useNavigate  } from 'react-router-dom';
import useSetIsAuth from '../hooks/useIsAuth.tsx';



  const server_address= "http://localhost:3000";


const ProfilePage = ({notes,isAuth, setMaps, setNotes, setCategs}) => {
    
  
  const setIsAuth = useSetIsAuth();
    if (!isAuth)
      {
        console.log("not logged");
        return(<p style={{color:'black', fontFamily: 'Inika', fontSize:'xx-large', marginLeft:'15%', marginTop:'2%'}}>Please login.</p>);
      }

  const [namememe, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const getName = async () => {
      try {
        const response = await fetch(server_address + "/user", { credentials: "include" });
        if (response.ok) {
          const json = await response.json();
          setName(json.name);
        } else {
          throw new Error("Request failed.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getName();
  }, []);

  const EditableButton = ({ isEditing}) => {
    // const [buttonConfig, setButtonConfig] = useState({
    //   icon: './src/icons/edit_red.png',
    //   onClick: handleEditClick,
    // });

    // let buttonConfig = isEditing
    // ? { icon: './src/icons/ok_red.png', onClick: handleSaveClick }
    // : { icon: './src/icons/edit_red.png', onClick: handleEditClick };
  
   // useEffect(() => {
      // if (isEditing) {
      //   buttonConfig = ({
      //     icon: './src/icons/ok_red.png',
      //     onClick: handleSaveClick,
      //   });
      // } else {
      //   buttonConfig = ({
      //     icon: './src/icons/edit_red.png',
      //     onClick: handleEditClick,
      //   });
      // }
 //   }, [isEditing, handleEditClick, handleSaveClick]);
  
let profName;
if(isEditing)
  {
      profName = <IconButton
        icon={'./src/icons/ok_red.png'}
        onClick={handleSaveClick}
        style={{ marginLeft: '20px', marginTop: '10px' }}
      />
  }
  else{
    profName = <IconButton
    icon={'./src/icons/edit_red.png'}
    onClick={handleEditClick}
    style={{ marginLeft: '20px', marginTop: '10px' }}
  />
  }

    return (
      // <IconButtonW
      //   icon={buttonConfig.icon}
      //   onClick={buttonConfig.onClick}
      //   style={{ marginLeft: '20px', marginTop: '10px' }}
      // />

      <> {profName} </>
    );
  };



  useEffect(() => {
    if (isEditing) {
      setInputValue(namememe);
    }
  }, [isEditing]);


  const handleEditClick = async () => {
    setIsEditing(true);
    console.log("is ", isEditing, "input: ", inputValue);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setName (event.target.value);

    console.log("input val: ", inputValue,"namememe: ",namememe, "isediting", isEditing);
  };

  

  const handleSaveClick = async () => {

    debugger
    
    console.log("save name: ", inputValue);
    
    try {
      const response = await fetch(server_address + "/user/edit", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: namememe,
        }),
        credentials: "include"
      });

      if (response.ok) {
        setName(inputValue);
        setIsEditing(false);
      } else {
        throw new Error("Request failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputBlur = () => {
    setInputValue(namememe);
    setIsEditing(false);
    
  };




  const profiletext = "Profile";

  const notif_tmp: Notif[] = [];
  const [notifs, setNotifs] = useState<Notif[]>(notif_tmp);

  const checkAndAddNotifications = async () => {
  

  if(notes!=null)
    {
       const processNote = (note) => {
        if(note.isread == false)
          {
            const oneMonthInMillis  = 30 * 24 * 60 * 60 * 1000; 
          const addDateMillis = new Date(note.adddate).getTime();
          const now = new Date().getTime();
          const difference = now - addDateMillis;
  
          if (difference >= oneMonthInMillis ) {
               
           let found_added = false;
           found_added = notifs.some(notif => notif.noteId === note.id && notif.type == 1);
            if(!found_added)
              {

                setNotifs?.((prevNotifs) => {
                const newItem = {
                  userId: 1,
                  id: Number(prevNotifs.length),
                  text: "You added " + note.name + " over a month ago. Don't forget to read!",
                  noteId: note.id,
                  type: 1
                };

                return [...prevNotifs, newItem]; 
              });
              }
          }
          }
          if(note.isread == true)
            {          
              const oneWeakInMillis  = 7 * 24 * 60 * 60 * 1000; 
              const readdateMillis = new Date(note.readdate).getTime();
              const difference1 = new Date().getTime() -  readdateMillis;
            
              if (difference1 >= oneWeakInMillis ) {
                  let found_reread = false;
                  found_reread = notifs.some(notif => notif.noteId === note.id && notif.type == 2);

                  if(!found_reread)
                  {
                    setNotifs?.((prevNotifs) => {
                    const newItem = {
                      userId: 1,
                      id: Number(prevNotifs.length),
                      text: "You read " + note.name + " over a weak ago. Read it again!",
                      noteId: note.id,
                      type: 2
                    };

                    return [...prevNotifs, newItem]; 
                  });
                  }
                }
            }
        }
        const processNotes = async () => {
            for (const note of notes) {
                  processNote(note);
                }
            };  
          await processNotes();
    } 
};


checkAndAddNotifications();

const navigate = useNavigate();

const handleLogout = () => {
  fetch(server_address + "/logout", {
    method: "POST",
    credentials: "include",
  })
  .then(() => { setIsAuth?.(false);  setMaps?.([]); setNotifs?.([]); setNotes?.([]); setCategs?.([]);})
  console.log('User logged out');
  navigate('/');
};





    return (
      <div>
        
        <div className='map-title-container'>
            <div className="prof-title1">{profiletext}</div>
        </div>

        <div className='map-title-container1'>

                  <div className='nameAndIcon'>
                    {isEditing ? (
 
                       <input
                         type="text"
                         value={inputValue}
                         onChange={handleInputChange}
                         onBlur={handleInputBlur}
                         autoFocus
                       />
                    
                
                    ) : (
                      <div className="profileName">{namememe}</div>
                    )}
                    {/* {<EditableButton isEditing={isEditing} />} */}
        
                    {/* <EditableButton
                      isEditing={isEditing}
                      handleEditClick={handleEditClick}
                      handleSaveClick={handleSaveClick}
                    /> */}
                      {/* {isEditing ? (
                     <IconButton
                     icon={'./src/icons/ok_red.png'}
                     onClick={handleSaveClick()}
                     style={{ marginLeft: '20px', marginTop: '10px' }}
                   />
                    ) : (
                       <IconButton
                      icon={'./src/icons/edit_red.png'}
                      onClick={handleEditClick}
                      style={{ marginLeft: '20px', marginTop: '10px' }}
                    />
                    )}       */}

                    <IconButton
                     onClick={handleSaveClick}
                     icon={'./src/icons/ok_red.png'}
                     style={{ marginLeft: '20px', marginTop: '10px' }}
                     />
             
                    <IconButton
                      icon={'./src/icons/edit_red.png'}
                      onClick={handleEditClick}
                      style={{ marginLeft: '20px', marginTop: '10px' }}
                    /> 
                  

                  </div>

            <Link className='linkStyleProfile'  to="/" onClick={handleLogout}>Log out</Link>
        </div>


        <div className="notif-container">
          <div className="notif-panel">

          <h1 className='notif-title'>Notifications</h1>

          <div className='notif-cont'>
              {notifs.map((not, index) => (
                <li key={index}>
                  <div className="list-notif">
                    <span className="not">{not.text}</span>
                  </div>
                </li>
                ))}
          </div>

          </div>
        </div>
      </div>

      );
    };
    

export default ProfilePage;