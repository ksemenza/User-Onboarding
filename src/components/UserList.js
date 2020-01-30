import React from 'react';
import UserCard from './UserCard';
import styled from 'styled-components';

const UserBox = styled.div`
    height: 75vh;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: center;
    margin: 20px;
`

const UserList = (props) => {
    return (
        <UserBox>
            {props.users.map((user, index) => {
                return <UserCard user={user}
                    key={user.username}
                />
            })}
        </UserBox>
    )
}

export default UserList;