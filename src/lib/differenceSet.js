// following, followers 차집합
export const differenceSet = (value1, value2) => {
  const setA = new Set([...value1]);
  const setB = new Set([...value2]);
  const differenceSet = [...new Set([...setA].filter(v => !setB.has(v)))];
  return differenceSet;
};
