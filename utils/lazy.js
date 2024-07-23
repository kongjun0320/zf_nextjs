export const getMoment = async () => {
  const moment = await import('moment');
  return moment.default;
};
