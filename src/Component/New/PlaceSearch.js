import React from 'react';
import styled from 'styled-components';
import { Location } from '@styled-icons/entypo/Location';
import { Close } from '@styled-icons/evaicons-solid/Close';
// import { ArrowIosForward} from '@styled-icons/evaicons-solid/ArrowIosForward';

const PlaceSearch = ({
  location,
  subLocation,
  removeLocation,
  addLocation,
}) => {
  return (
    <>
      <div>위치 추가</div>
      {location ? (
        <StLocation>
          <StLocationTextBox>
            <StMainText subLocation={subLocation}>{location}</StMainText>
            {subLocation && <StSecondaryText>{subLocation}</StSecondaryText>}
          </StLocationTextBox>
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

const StLocationTextBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
`;

const StMainText = styled.div`
  font-size: ${({ subLocation }) => (subLocation ? 1.2 : 1.5)}rem;
  font-weight: 500;
`;

const StSecondaryText = styled.div`
  margin-top: 0.2rem;
  color: ${({ theme }) => theme.darkGray};
  font-size: 1rem;
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
