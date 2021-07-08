export const calcTimeElapsed = date => {
  const start = new Date(date);
  const end = Date.now();
  const sec = Math.floor((end - start) / 1000); // 경과시간, 초
  const min = Math.floor((end - start) / 1000 / 60); // 경과시간, 분
  const hour = Math.floor((end - start) / 1000 / 60 / 60); // 경과시간, 시간
  const day = Math.floor((end - start) / 1000 / 60 / 60 / 24); // 경과시간, 일
  const elapsed =
    sec >= 60
      ? min >= 60
        ? hour >= 24
          ? day + '일 전'
          : hour + '시간 전'
        : min + '분 전'
      : '방금 전';
  return elapsed;
};

/**
 * 날짜가 바뀔 경우 return값을 수정해야함
 * @param {number} timeStamp
 * @return {string} timeStamp(AM, PM, hours, minutes)
 */

export const calcRecentTime = timeStamp => {
  const date = new Date(timeStamp);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const time = date.toLocaleTimeString('ko-KR', options);
  return time;
};

export const calcTimeStamp = timeStamp => {
  const date = new Date(timeStamp);
  const options1 = {
    // year: 'numeric',
    // month: 'numeric',
    // day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const time1 = date.toLocaleTimeString('ko-KR', options1);
  console.log('time1:', time1);
  return time1;
};
