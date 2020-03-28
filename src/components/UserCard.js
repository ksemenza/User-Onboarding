import React from 'react';
import styled from 'styled-components';


const StyledCard = styled.div`
    width: 20vw;
    max-height: 32vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 32px;
    border-radius: 4px;
    padding-bottom: 15px;
    border: 2px dashed #1E90FF;
`

const UserCard = ({ user, customColor }) => {

    return (
        <StyledCard style={{ background: customColor }}>
            <h2>{user.username}</h2>
            <h3>{user.role}</h3>
            <p>{user.email}</p>
        </StyledCard>
    )
}

export default UserCard;