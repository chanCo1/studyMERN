import React from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const ImageUpload = ({ setImg }) => {
  const FileUpload = (e) => {
    console.log(e.target.files);

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    /*
    // formData는 XMLHttpRequest라는 전송할 키랑 밸류의 집합을 컴파일한 특수한 객체이기 때문에 문자열로 표현할 수 없다.
    console.log(formData); // {} 출력

    // for~of 문으로 확인가능
    for(const key of formData) console.log(key);
    */
    (async () => {
      try {
        const response = await axios.post('/api/post/image/upload', formData);
        setImg(response.data.filePath);
      } catch (e) {
        console.error(e);
      }
    })();
   };

  return (
    <div>
      {/* accept는 업로드할 파일 유형을 제한할 수 있다. */}
      <Form.Control type="file" className="shadow-none" accept="image/*" onChange={FileUpload} />
    </div>
  );
};

export default ImageUpload;
