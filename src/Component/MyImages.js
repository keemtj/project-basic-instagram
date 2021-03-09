import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MyImages = () => {
  const [datas, setDatas] = useState(null);
  console.log(datas);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        // eslint-disable-next-line no-undef
        `https://graph.instagram.com/me/media?fields=id,caption,media_url,username&access_token=${process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN}`,
      );
      const { data } = await response.data;
      setDatas(data);
    };
    fetchData();
  }, []);

  if (!datas) return <div>loading...</div>;
  return (
    <StMyImagesWrapper>
      {datas?.map(({ id, media_url, caption }) => (
        <StImage src={media_url} alt={caption} key={id} />
      ))}
    </StMyImagesWrapper>
  );
};

const StMyImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 2.5rem;
  margin-bottom: 3rem;
`;

const StImage = styled.img`
  width: 100%;
  height: 30rem;
  object-fit: cover;
`;

export default MyImages;
