const sleep = n => new Promise(resolve => setTimeout(resolve, n));

export const fetchDataThunk = (type, promiseCreator, n) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return param => async dispatch => {
    dispatch({ type }); // loading
    n && (await sleep(n));
    try {
      const payload = await promiseCreator(param);
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
