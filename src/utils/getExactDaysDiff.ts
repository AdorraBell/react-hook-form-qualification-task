export const getExactDaysDiff = (startDate: Date, endDate: Date) => {
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return diffDays;
};
