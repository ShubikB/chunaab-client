export const to12HourFormat = (time) => {
  if (!time) return;

  if (time.toLowerCase().includes('am') || time.toLowerCase().includes('pm')) {
    return time;
  }
  const [hour, minute] = time.split(':');

  const hoursInt = parseInt(hour);

  const period = hoursInt >= 12 ? 'PM' : 'AM';
  const hours12 = hoursInt % 12 || 12;

  return `${hours12}:${minute} ${period}`;
};

export const to24HourFormat = (time) => {
  if (!time) return;

  const [timeStr, period] = time.split(' ');
  if (!timeStr || !period) return time;
  const [hour, minute] = timeStr.split(':');
  let hoursInt = parseInt(hour, 10);

  if (period === 'PM' && hoursInt < 12) hoursInt += 12;
  if (period === 'AM' && hoursInt === 12) hoursInt = 0;

  return `${hoursInt.toString().padStart(2, '0')}:${minute}`;
};
