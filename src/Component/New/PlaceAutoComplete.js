import React from 'react';
import styled from 'styled-components';
import { Search } from '@styled-icons/ionicons-outline/Search';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  // getLatLng,
} from 'react-places-autocomplete';

const PlaceAutoComplete = ({
  setLocation,
  setSubLocation,
  setAutoCompleteState,
}) => {
  const [value, setValue] = React.useState('');
  const handleChange = value => {
    setValue(value);
  };

  const handleSelect = value => {
    geocodeByAddress(value)
      .then(results => geocodeByPlaceId(results[0].place_id))
      .catch(error => console.error('Error', error));
  };

  const onClickSuggestion = suggestion => {
    setLocation(suggestion.formattedSuggestion.mainText);
    setSubLocation(suggestion.formattedSuggestion.secondaryText);
    setAutoCompleteState(false);
    setValue('');
  };

  return (
    <StSearchPlaceWrapper>
      <PlacesAutocomplete
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
        shouldFetchSuggestions={value.length >= 1}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <StSearchInputWrapper>
              <StSearchInput
                {...getInputProps({
                  placeholder: '검색',
                  type: 'text',
                })}
              />
              <StSearchIcon />
            </StSearchInputWrapper>
            <StSuggestions>
              {loading ? (
                <div>검색중...</div>
              ) : (
                suggestions.map((suggestion, index) => {
                  return (
                    <StSuggestionItem
                      key={index}
                      {...getSuggestionItemProps(suggestion)}
                      onClick={() => onClickSuggestion(suggestion)}
                    >
                      <StMainText>
                        {suggestion.formattedSuggestion.mainText}
                      </StMainText>
                      <StSecondaryText>
                        {suggestion.formattedSuggestion.secondaryText}
                      </StSecondaryText>
                    </StSuggestionItem>
                  );
                })
              )}
            </StSuggestions>
          </>
        )}
      </PlacesAutocomplete>
    </StSearchPlaceWrapper>
  );
};

const StSearchPlaceWrapper = styled.div`
  width: 100%;
`;

const StSearchInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 2rem;
  margin-top: 1rem;
  position: relative;
`;

const StSearchInput = styled.input`
  width: 100%;
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.gray5};
  caret-color: ${({ theme }) => theme.darkGray};
  text-indent: 1.5rem;
  s &::placeholder {
    color: ${({ theme }) => theme.darkGray};
  }
  outline: none;
`;

const StSearchIcon = styled(Search)`
  position: absolute;
  width: 1.5rem;
  left: 2.5rem;
  color: ${({ theme }) => theme.darkGray};
`;

const StSuggestions = styled.ul`
  display: flex;
  flex-flow: column nowrap;
`;

const StSuggestionItem = styled.li`
  width: 100%;
  margin-top: 1rem;
  padding: 2.5rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.gray2};
  }
`;

const StMainText = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
`;

const StSecondaryText = styled.div`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.darkGray};
  font-size: 1.2rem;
`;

export default React.memo(PlaceAutoComplete);
