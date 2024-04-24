import React from 'react';
import './NotesPage.css';
import ItemsList from './ItemsList.tsx';
import IconButton from './IconButton.tsx'
import NotesEdit from './NotesEdit.tsx'

const handleAddNote = () => {
    console.log('Кнопка добавления записи нажата');
  };

  const handleAddCategory = () => {
    console.log('Кнопка добавления категории нажата');
  };

const NotesPage = () => {

    const items = [
        'Home',
        'Sec el',
        'Third el',
        'first el',
        'Sec el',
        'Third el',
        'first el',
        'Sec el',
        'Third el',
      ];

    const categories = [
        'Aergerg',
        'eergeger',
        'htkrltkhlrtkh'
    ]

    return (
        <div>
        <div className="title1">Archive</div>

        <div className="container">
          <div className="left-panel">
          <div className="header">
            <h1>Notes</h1>
            <IconButton icon={'./src/icons/Plus.png'} onClick={handleAddNote} style={ {marginLeft: '20px',  marginTop: '10px'}}/>
            </div>
           
            < ItemsList  items={items} /> 
            
             {/* < NotesEdit />  */}
        
          </div>
          <div className="right-panel">
            <div className="header">
              <h1>Categories</h1>
              <IconButton icon={'./src/icons/Plus.png'} onClick={handleAddCategory} style={ {marginLeft: '20px',  marginTop: '10px'}}/>
            </div>
            <div className="links">
                        <div className="list-container">
                            <ul className="item-list">
                            {items.map((item, index) => (
                                <li key={index} className="list-item">
                                    <a className="title">{item}</a>
                                </li>
                            ))}
                            </ul>
                        </div>
            </div>
          </div>
        </div>
        </div>
      );
    };
    

export default NotesPage;