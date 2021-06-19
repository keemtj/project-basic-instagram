import React from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';

const groupNames = {
  smileys_people: '스마일리 및 사람',
  animals_nature: '동물 및 자연',
  food_drink: '식음료',
  travel_places: '여행 및 장소',
  activities: '활동',
  objects: '개체',
  symbols: '기호',
  flags: '깃발',
  recently_used: '최근에 사용한 항목',
};

const Emoji = ({ onEmojiClick }) => {
  return (
    <StEmoji>
      <StPicker
        onEmojiClick={onEmojiClick}
        disableSearchBar
        groupNames={groupNames}
      />
      <StTriangle />
    </StEmoji>
  );
};

const StEmoji = styled.div`
  position: absolute;
  bottom: 6rem;
  left: 0.5rem;
  z-index: 1;
`;

const StTriangle = styled.div`
  z-index: 1;
  position: absolute;
  bottom: -6px;
  left: 18px;
  border: 7.5px solid black;
  border-color: ${({ theme }) => theme.white} ${({ theme }) => theme.white}
    transparent transparent;
  box-shadow: 2px -2px 5px -2px ${({ theme }) => theme.gray8};
  transform: rotate(135deg);
`;

const StPicker = styled(Picker)`
  position: absolute;
`;

export default Emoji;
