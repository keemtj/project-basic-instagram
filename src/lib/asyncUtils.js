export const fetchDataThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return param => async dispatch => {
    console.log('param~~~~~~>', param);
    dispatch({ type });
    try {
      const payload = await promiseCreator(param);
      console.log('payload~~~~~~~~>', payload);
      dispatch({ type: SUCCESS, payload }); // 호출 성공
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true }); // 호출 실패
    }
  };
};

export const reducerUtils = {
  initial: (data = null) => ({
    loading: false,
    data,
    error: null,
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  success: data => ({
    data,
    loading: false,
    error: null,
  }),
  error: error => ({
    loading: false,
    data: null,
    error,
  }),
};

//test2
export const fetchData2Thunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return param => async dispatch => {
    console.log('uid~~~~~~>', param);
    dispatch({ type });
    try {
      const payload = await promiseCreator(param);
      console.log('test~~~~~~~~>', payload);
      dispatch({ type: SUCCESS, payload }); // 호출 성공
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true }); // 호출 실패
    }
  };
};
