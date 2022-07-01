import React, { useEffect, useState } from 'react';
import axios from 'axios';

const List = ({ contentList, setContentList }) => {

  const [text, setText] = useState('');

  // useEffect(() => {

  //   let body = {
  //     text: 'Hello',
  //   };
    
  //   (async () => {
  //     try {
  //       const response = await axios.post('/api/test', body);
  //       console.log(response);
  //       setText(response.data);
  
  //     } catch(e) {
  //       console.error(e);
  //     }
  //   })();
  // }, []);

  return (
    <div>
      <h3>{text}</h3>
      {contentList.map((v,i) => {
        return (
          <div 
            key={i}
            style={{
              width: '100%',
              marginLeft: '1rem',
            }}  
          >
            내용: {v}
            <hr  />
          </div>
        );
      })}
    </div>
  );
};

export default List;