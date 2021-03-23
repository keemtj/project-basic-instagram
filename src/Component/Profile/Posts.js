import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import EmptyPosts from '../EmptyPosts';

const Posts = () => {
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // eslint-disable-next-line no-undef
          `https://graph.instagram.com/me/media?fields=id,caption,media_url,username&access_token=${process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN}`,
        );
        const { data } = await response.data;
        setDatas(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (!datas) return <EmptyPosts />;
  return (
    <StPostsWrapper>
      {datas.map(({ id, media_url, caption }) => (
        <StPost src={media_url} alt={caption} key={id} />
      ))}
    </StPostsWrapper>
  );
};

const StPostsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 2.5rem;
  margin-bottom: 3rem;
`;

const StPost = styled.img`
  width: 100%;
  height: 30rem;
  object-fit: cover;
`;

export default Posts;
