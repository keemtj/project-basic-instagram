import React from 'react';
// import axios from 'axios';
import PlacesAutocomplete, {
  geocodeByAddress,
  // getLatLng,
  geocodeByPlaceId,
} from 'react-places-autocomplete';

const SearchPlace = () => {
  // google places autocomplete
  const [address, setAddress] = React.useState('');
  const [location, setLocation] = React.useState('');
  console.log('내가 선택한 location of value:', location);
  const handleChange = address => {
    console.log(address);
    setAddress(address);
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => geocodeByPlaceId(results[0].place_id))
      .then(result => console.log(result));
    // .then(latLng => console.log('Success', latLng))
    // .catch(error => console.error('Error', error));
  };

  // React.useEffect(() => {
  //   axios.get(
  //     `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
  //   );
  // }, []);

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>검색중...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    onClick={() => {
                      console.log(
                        '내가 선택한 location of terms:',
                        suggestion.terms,
                        '| mainText:',
                        suggestion.formattedSuggestion.mainText,
                        '| secondaryText:',
                        suggestion.formattedSuggestion.secondaryText,
                      );
                      return setLocation(suggestion.terms[0].value);
                    }}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default SearchPlace;
