import React, { useEffect } from 'react';
import {useState} from 'react'
import './NotesPage.css';
import ItemsList from './ItemsList.tsx';
import IconButton from './IconButton.tsx'
import NotesEdit from './NotesEdit.tsx'
import Note from './Note.tsx';
import NotesNew from './NotesNew.tsx'


const server_address= "http://localhost:3000"






export const PageState = ( notes, categs, categoryId, setNotes) => {
  
  // Открывает поле редактирования
  const editNote = ({item}) => {
    console.log('Редактировать элемент');
    SetPageState(< NotesEdit listNotes={listNotes} item={item} categories = {categs} setNotes= {setNotes}/> );
  };
  // Открывает список записей
  const listNotes = (categoryId) => {
    console.log('Назад');
    SetPageState(<ItemsList  noteInfo={noteInfo} openEdit={editNote} items={notes} category = {categoryId} categories={categs} setNotes={setNotes}/> );
  };

  const noteInfo = ({item, categories}) => {
    console.log('Открыть инфо записи');
    SetPageState(<Note listNotes={listNotes} item={item} categories = {categories}/> );
  };

  const newNote = () => {
    SetPageState (<NotesNew listNotes={listNotes} categories = {categs} setNotes= {setNotes}/>);
  }


  const [NotesBlock,SetPageState] = useState(<ItemsList noteInfo={noteInfo} openEdit={editNote} items={notes} category = {categoryId} categories={categs} setNotes={setNotes} />);
  
  
  return {
    NotesBlock: NotesBlock,

    ItemsList: <ItemsList noteInfo={noteInfo} openEdit={editNote} items={notes} category = {categoryId} categories={categs} setNotes={setNotes}/>,
    listNotes: listNotes,
    noteInfo: noteInfo,
    newNote:newNote
  };
};



const NotesPage = ({notes,categs,setCategs,setNotes,isAuth}) => {
 
  if (!isAuth)
    {
      console.log("not logged");
      return(<p style={{color:'black', fontFamily: 'Inika', fontSize:'xx-large', marginLeft:'15%', marginTop:'2%'}}>Please login.</p>);
    }

const {NotesBlock,listNotes, newNote} = PageState( notes, categs, null, setNotes);

const handleAddNote = () => {
  console.log('Кнопка добавления записи нажата');
  newNote();
};

const CategInput = ({isShowInput}) => {
  
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  
  useEffect(() => {
    setShowInput(isShowInput);
  }, [isShowInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };



  const handleAddCategory = () => {

    // Здесь можно выполнить другие действия перед отправкой запроса
    console.log('Кнопка добавления категории нажата');
    if(inputValue=='')
      {

      }else{

   
if(inputValue.length <=60)
  {


    // Ваш код для отправки запроса fetch
    fetch(server_address + "/addcateg", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inputValue, // Используем значение из input
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
      // Обновляем состояние categs
      setCategs?.((prevCategs) => {
        const newCategs = [
          ...prevCategs,
          {
            userId: data.userId,
            id: data.id,
            name: data.name,
          },
        ];
        return newCategs;
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  else{
    alert("The name is too long. It must be up to 60 characters.");
    return;
  }
  console.log("categs",categs);
}
    // Сбрасываем значение ввода и скрываем input после отправки
    setInputValue('');
    setShowInput(false);

  };

  return (
    <div style={{display:'flex'}}>
      {showInput && (
        <>
          <input
          className='categinput'
          style={{border:'none'}}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Название категории"
          />
          <IconButton icon={'./src/icons/read_white.png'} onClick={handleAddCategory} style={ {marginLeft: '20px'}}/>
        </>
      )}
    </div>
  );
};




const [inputcateg, setInputCateg] = useState(<></>);

const showInputCateg = () => {
  setInputCateg(< CategInput isShowInput={true} /> );
};

    return (
        <div>
        <div className="title1">Archive</div>

        <div className="container">
          <div className="left-panel">
          <div className="header">
            <h1>Notes</h1>
            <IconButton icon={'./src/icons/Plus.png'} onClick={handleAddNote} style={ {marginLeft: '20px',  marginTop: '10px'}}/>
            </div>

          
          {NotesBlock}
        
  
          </div>
          <div className="right-panel">
            <div className="header">
              <h1>Categories</h1>
              <IconButton icon={'./src/icons/Plus.png'} onClick={showInputCateg} style={ {marginLeft: '20px',  marginTop: '10px'}}/>
            </div>
            <div className="links">
                        <div className="list-container">
                            <ul className="item-list">
                            <a onClick={()=>listNotes(null)} className="cattitle">All</a>
                            <a onClick={()=>listNotes(-2)} className="cattitle">Read</a>
                            <a onClick={()=>listNotes(-3)} className="cattitle">Not read</a>
                        
                            {inputcateg}
                            
                            {categs.map((cat, index) => (
                                <li key={index} className="list-item1">
                                    <a onClick={()=>listNotes(cat.id)} className="cattitle">{cat.name}</a>
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