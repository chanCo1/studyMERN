import React, { memo, useState, useRef, useEffect } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Avatar from 'react-avatar';

const RepleContentDiv = styled.div`
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.03), 0px 7.5px 6px rgba(0, 0, 0, 0.03);
  padding: 20px 10px;
  margin: 0 auto 10px;
  width: 756px;

  @media (max-width: 756px) {
    width: 90%;
  }

  .author {
    display: flex;
    margin-bottom: 5px;
    justify-content: space-between;
    align-items: center;

    .user {
    display: flex;
    color: #c6c6c6;

    p {
      position: relative;
      top: 5px;
    }

    .avatar {
      border: 1px solid #c6c6c6;
      margin-right: 10px;
    }
  }

    p {
      font-size: 12px;
      font-weight: bold;
      color: darkgrey;
    }

    .modalControl {
      position: relative;
      cursor: pointer;

      span {
        user-select: none;
      }

      .modalDiv {
        position: absolute;
        display: flex;
        top: 15px;
        right: 10px;
        width: 80px;
        height: 60px;
        overflow: hidden;
        padding: 10px;
        cursor: auto;
        flex-direction: column;
        align-content: center;
        justify-content: space-between;
        align-items: center;
        background-color: whitesmoke;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.03), 0 7.5px 6px rgba(0, 0, 0, 0.01);
        border-radius: 10px;

        p {
          color: #000;
          margin-bottom: 0;
          cursor: pointer;

          &.delete {
            color: red;
          }
        }
      }
    }
  }
  p {
    margin-bottom: 0;
    font-size: 14px;
  }
`;

const RepleUploadDiv = styled.div`
  width: 100%;
  /* margin: auto; */

  form {
    width: 100%;
    display: grid;
    grid-template-columns: 7fr 1fr;
    grid-template-rows: 50px;

    @media (max-width: 756px) {
      grid-template-columns: 4fr 1fr;
      grid-template-rows: 40px;
      width: 90%;
    }

    input {
      /* width: 90%; */
      padding: 10px;
      height: 100%;
      border-radius: 10px 0 0 10px;
      border: .5px solid #c6c6c6;

      &:active,
      &focus {
        outline: none;
      }
    }

    button {
      height: 100%;
      border-radius: 0 10px 10px 0;
      border: .5px solid #c6c6c6;
      font-weight: bold;
      background-color: #c6c6c6;

      &:hover,
      &:active {
        border: .5px solid darkgrey;
        background-color: darkgrey;
      }
    }
  }

  .cancel {
    display: flex;
    justify-content: flex-end;

    button {
      margin-top: 5px;
      font-size: 12px;
      border-radius: 10px;
      padding: 5px;
      border: 1px solid #c6c6c6;
    }
  }
`;

const RepleContent = memo((props) => {
  const [modalFlag, setModalFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [reple, setReple] = useState(props.reple.reple);

  const ref = useRef();
  useOnClickOutSide(ref, () => setModalFlag(false));

  // 리덕스 상태값 가져오기
  const { uid } = useSelector(state => state.user);

  const onRepleChange = useCallback((e) => {
    setReple(e.currentTarget.value);
  }, []);

  // modal 창 on/off
  const onModalClick = useCallback(() => {
    setModalFlag(true);
  }, []);

  // 수정 submit
  const submitHandler = useCallback((e) => {
    e.preventDefault();

    let body = {
      uid: uid,
      reple: reple,
      postId: props.reple.posId,
      repleId: props.reple._id
    };

    (async () => {
      try {
        const response = await axios.post('/api/reple/edit', body);

        if(!response.data.success) {
          alert('댓글 수정 실패');
        }

      } catch(err) {
        console.error(err);
      }
    })();

    setEditFlag(false);

  }, [reple, props.reple.posId, uid, props.reple._id]);

  const onEditClick = useCallback(() => {
    setEditFlag(true);
    setModalFlag(false);
  }, []);

  // 삭제
  const deleteHandler = useCallback((e) => {
    e.preventDefault();

    if (window.confirm('정말로 삭제하시겠습니까?')) {
      let body = {
        postId: props.reple.posId,
        repleId: props.reple._id
      };

      (async () => {
        try {
          const response = await axios.post('/api/reple/delete', body);
          console.log(response);

          if (response.data.success) {
            alert('댓글이 삭제되었습니다.');
          }
        } catch (e) {
          console.error(e);
          alert('삭제에 실패하였습니다.');
        }
      })();
    }
  }, [props.reple.posId, props.reple._id]);

  return (
    <div>
      <RepleContentDiv>
        <div className="author">
          <div className='user'>
            <Avatar className='avatar' size='30' round={true} src={props.reple.author.photoURL} />
            <p>{props.reple.author.displayName}</p>
          </div>

          {props.reple.author.uid === uid && 
            <div className="modalControl">
             <span onClick={onModalClick}>...</span>
             {modalFlag && (
               <div className="modalDiv" ref={ref}>
                 <p onClick={onEditClick}>수정</p>
                 <p className="delete" onClick={deleteHandler}>삭제</p>
               </div>
             )}
           </div>
          }
        </div>
        {editFlag ? (
          <RepleUploadDiv>
          <form>
            <input 
              type="text" 
              value={reple} 
              onChange={onRepleChange} 
              placeholder={'댓글을 입력해주세요'} />
            <button onClick={submitHandler}>수정</button>
          </form>

          <div className='cancel'>
            <button onClick={(e) => {
              e.preventDefault();
              setEditFlag(false);
            }}>취소</button>
          </div>

        </RepleUploadDiv>
        ) : (
          <p>{props.reple.reple}</p>
        )}
      </RepleContentDiv>
    </div>
  );
});

const useOnClickOutSide = (ref, handler) => {
  useEffect(
    () => {
      const listner = (e) => {
        if (!ref.current || ref.current.contains(e.target)) {
          return;
        }
        handler(e);
      };

      document.addEventListener('mousedown', listner);
      document.addEventListener('touchStart', listner);

      return () => {
          document.removeEventListener('mousedown', listner);
          document.removeEventListener('touchStart', listner);
      };
    },
    [ref, handler]
  );
};

export default RepleContent;
