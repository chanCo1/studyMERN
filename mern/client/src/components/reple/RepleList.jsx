import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';

const RepleList = memo(({ postId }) => {

  const [repleList, setRepleList] = useState([]);

  useEffect(() => {

    let body = {
      postId: postId,
    };

    (async () => {
      try {
        const response = await axios.post('/api/reple/getReple', body);

        if(response.data.success) {
          setRepleList([...response.data.repleList]);
        }
      } catch(err) {
        console.error(err);
      }
    })();
  }, [postId, repleList])
  
 
  return (
    <div>
      {repleList.map((v,i) => {
        return (
          <div key={i}>
            {v.reple}
          </div>
        );
      })}
    </div>
  );
});

export default RepleList;