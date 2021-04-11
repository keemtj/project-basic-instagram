import React from 'react';
import styled from 'styled-components';
import { Location } from '@styled-icons/entypo/Location';
import { Close } from '@styled-icons/evaicons-solid/Close';

const PlaceSearch = ({ location, removeLocation, addLocation }) => {
  return (
    <>
      <div>위치 추가</div>
      {location ? (
        <StLocation>
          <div>{location}</div>
          <StRemoveLocation type="button" onClick={removeLocation}>
            <Close />
          </StRemoveLocation>
        </StLocation>
      ) : (
        <StAddLocation type="button" onClick={addLocation}>
          <StLocationIcon />
        </StAddLocation>
      )}
    </>
  );
};

const StLocationIcon = styled(Location)`
  width: 1.6rem;
  height: 1.6rem;
`;

const StLocation = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 400;
`;

const StAddLocation = styled.button`
  cursor: pointer;
  outline: none;
`;

const StRemoveLocation = styled.button`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  outline: none;
`;

export default PlaceSearch;
