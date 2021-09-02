/* eslint-disable no-undef */
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useInfiniteScroll = ({
  threshold = 0.5,
  fetchNextPosts,
  lastDocs,
  nextPosts,
  updateLastDocs,
  uids,
  uid,
}) => {
  const dom = useRef();
  const dispatch = useDispatch();

  const handleScroll = async ([entry]) => {
    if (entry.isIntersecting) {
      // TODO: need to loading state
      console.log(`entry: ${threshold}`);
      try {
        const response = await fetchNextPosts({
          lastDocs,
          dispatch,
          updateLastDocs,
          uids,
          uid,
        });
        const next = await Promise.all(response);
        console.log('next', next);
        next.length > 0 ? dispatch(nextPosts(next)) : dispatch(nextPosts([]));
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    let observer;
    const { current } = dom;
    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold });
      observer.observe(current);
      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return {
    ref: dom,
  };
};

export default useInfiniteScroll;
