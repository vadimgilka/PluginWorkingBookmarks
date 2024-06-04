import React from 'react';
import MindMap from '../MindMap/MindMap.jsx';
import './MapPage.css'
import IconButton from './IconButton.js';


const nodes = [
    { text: 'Node 1', x:0, y:0, nodes:[{text: 'https://pypi.pyth...', url:"https://pypi.python.org/pypi/pip"}] },
    { text: 'Node 2',x:0, y:0, nodes:[{text: 'https://edu.vstu....', url:"https://edu.vstu.ru/"}]  },
    { text: 'Node 3',x:0, y:0, nodes:[{text: 'https://www.googl...', url:"https://www.google.com/maps"}] },
  ];
  
  const connections = [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[1], target: nodes[2] },
  ];

const MapPage = ({notes,isAuth}) => {


  const transformNotesToNodes = (notes) => {
    return notes.map(note => ({
      text: note.name,
      nodes: [{
        text: note.url.length > 17 ? note.url.substring(0, 17) + '...' : note.url,
        url: note.url

      }]
    }));
  };

  const allnodes = transformNotesToNodes(notes);
  const connections = [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[1], target: nodes[2] },
  ];

  const mapname = "Usermap";


return (
  <div>
  <div className='map-title-container'>
      <div className="map-title1">{mapname}</div>
  </div>

  <div className="map-container">
    <div className="map-bg">


    <MindMap nodes={nodes} connections={connections} editable={true}/>

    </div>
  </div>
</div>
    
  );
};


export default MapPage;