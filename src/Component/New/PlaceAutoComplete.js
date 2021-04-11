import React from 'react';
import styled from 'styled-components';
import PlacesAutocomplete, {
  geocodeByAddress,
  // getLatLng,
  geocodeByPlaceId,
} from 'react-places-autocomplete';

const PlaceAutoComplete = () => {
  // google places autocomplete
  const [address, setAddress] = React.useState('');
  const [location, setLocation] = React.useState('');
  console.log('내가 선택한 location of value:', location);

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => geocodeByPlaceId(results[0].place_id))
      .then(result => console.log('---------------', result));
  };

  const onClickSuggestion = suggestion => {
    console.log(
      '내가 선택한 location of terms:',
      suggestion.terms,
      '| mainText:',
      suggestion.formattedSuggestion.mainText,
      '| secondaryText:',
      suggestion.formattedSuggestion.secondaryText,
    );
    setLocation(suggestion.terms[0].value);
    setAddress('');
  };

  return (
    <StSearchPlaceWrapper>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <StSearchInput
              {...getInputProps({
                placeholder: '장소를 검색하세요',
              })}
            />
            {address && (
              <StSuggestions>
                {suggestions.map((suggestion, index) => {
                  return (
                    <StSuggestionItem
                      key={index}
                      {...getSuggestionItemProps(suggestion)}
                      onClick={() => onClickSuggestion(suggestion)}
                    >
                      <span>{suggestion.formattedSuggestion.mainText}</span>
                    </StSuggestionItem>
                  );
                })}
              </StSuggestions>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    </StSearchPlaceWrapper>
  );
};

const StSearchPlaceWrapper = styled.div`
  width: 100%;
`;

const StSearchInput = styled.input`
  border: none;
  padding: 2rem;
`;

const StSuggestions = styled.ul`
  display: flex;
  padding: 0rem 2rem;
  overflow-x: auto;
  border: 1px solid red;
`;

const StSuggestionItem = styled.li`
  width: fit-content;
  border: 1px solid gray;
  border-radius: 4px;
  & + & {
    margin-left: 1rem;
  }
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background: yellow;
  }
`;

export default React.memo(PlaceAutoComplete);
