import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

// 시간 설정
import moment from 'moment';
import "moment/locale/ko";  // 나라 설정

const ListDiv = styled.div`
  padding: 1rem 0;
  max-width: 756px;
  margin: 0 auto;

  @media (max-width: 756px) {
    width: 90%;
  }
`;

const ListItem = styled.div`
  width: 100%;
  height: auto;
  min-height: 120px;
  background-color: #fff;
  margin: 5vh 0;
  padding: 20px;
  box-shadow: 0px 19px 39px rgba(0,0,0,.03),
  0px 15px 12px rgba(0,0,0,.1);

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    text-decoration: none;
  }

  .title {
    font-weight: bold;
    font-size: 30px;
  }

  .user {
    display: flex;
    color: #949494;
    margin-bottom: 20px;

    p {
      position: relative;
      top: 5px;
    }

    .avatar {
      border: 1px solid #c6c6c6;
      margin-right: 10px;
    }
  }

  .time {
    color: #99999996;
  }
`;

const List = ({ postList }) => {

  const SetTime = (a, b) => {
    if(a !== b) {
      return moment(b).format('YYYY년 MMMM Do, hh:mm:ss') + ' 수정됨';
    } else {
      return moment(a).format('YYYY년 MMMM Do, hh:mm:ss');
    }
  };

  return (
    <ListDiv>
      {postList.map((v,i) => {
        return (
          <ListItem key={i}>
            <Link to={`/post/${v.postNum}`}>
              <div className='content'>
                <h3 className='title'>{v.title}</h3>

                <div className='user'>
                  <Avatar className='avatar' size='40' round={true} src={v.author.photoURL} />
                  <p>{v.author.displayName}</p>
                </div>

                <p>{v.content}</p>
              </div>
              <p className='time'>{SetTime(v.createdAt, v.updatedAt)}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
};

export default List;