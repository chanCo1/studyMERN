import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';

const PostDiv = styled.div`
  padding: 1rem 0;
  max-width: 756px;
  margin: auto;

  @media (max-width: 756px) {
    width: 90%;
  }
`;

const Post = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 30px 20px;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03), 0px 15px 12px rgba(0, 0, 0, 0.1);
  
  h1 {
    font-weight: bold;
  }

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
    margin-bottom: 0;
  }
`;

const BtnDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;

  button {
    border-radius: 150px;
    padding: 5px 20px;
    font-weight: bold;

    &.edit {
      background-color: #fff;
      color: #000;
      border: 1px solid #000;

      &:hover {
        background-color: #000;
        color: #fff;
        border: 1px solid #000;
      }
    }

    &.delete {
      margin-left: 10px;
      background-color: red;
      color: #fff;
      border: 1px solid red;

      &:hover {
        background-color: #fff;
        color: red;
        border: 1px solid red;
      }
    }
  }
`;

const Detail = ({ postInfo }) => {
  // console.log(postInfo.repleNum);

  const params = useParams();
  const navigate = useNavigate();

  const { uid } = useSelector(state => state.user);

  const DeleteHandler = useCallback(() => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      let body = {
        postNum: params.postNum,
      };

      if(postInfo.repleNum) {
        alert("댓글있으면 삭제 안됨");
        return;
      } else {
        console.log('ㅋㅋㅋㅋ');
      }

      (async () => {
        try {

          const response = await axios.post('/api/post/delete', body);

          if(response.data.success) {
            alert('게시글이 삭제되었습니다.');
            navigate('/');
          } else {
            alert("게시글 삭제에 실패하였습니다.");
          }
        } catch (e) {
          console.error(e);
          alert('삭제에 실패하였습니다.');
        }
      })();
    }
  }, [params.postNum, navigate]);

  return (
    <PostDiv>
        <>
          <Post>
            <h1>{postInfo.title}</h1>
            <div className='user'>
              <Avatar className='avatar' size='40' round={true} src={postInfo.author.photoURL} />
              <p>{postInfo.author.displayName}</p>
            </div>
            {postInfo.image ? 
              <img 
                src={`http://localhost:5000/${postInfo.image}`} 
                alt="" 
                style={{width: '100%', heigjt: 'auto'}}
              /> : null}
            <p>{postInfo.content}</p>
          </Post>

          {uid === postInfo.author.uid && 
            <BtnDiv>
              <Link to={`/edit/${postInfo.postNum}`}>
                <button className="edit">
                  수정
                </button>
              </Link>
              <button className="delete" onClick={DeleteHandler}>
                삭제
              </button>
            </BtnDiv>
          }
        </>
    </PostDiv>
  );
};

export default Detail;
