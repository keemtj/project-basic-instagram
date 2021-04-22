import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Main from '../../Component/Main/Main';

const MainContainer = () => {
  // ! redux
  const { data, loading, error } = useSelector(state => state.main);
  console.log(data, loading, error);
  // const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Instagram';
    // get post by me and following
  }, []);

  return <Main posts={data} />;
};

export default MainContainer;
