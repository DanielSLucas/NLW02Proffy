export default function convertMinutesToHour(timeInMinutes: number) {
  const minutes = timeInMinutes % 60;
  const hour = (timeInMinutes - minutes) / 60;
  
  let stringMinutes = minutes.toString();
  let stringHour = hour.toString();

  if (minutes < 10) {
    stringMinutes = "0" + minutes;
  }

  if (hour < 10) {
    stringHour = "0" + hour;
  }

  const formattedHour = stringHour + ":" + stringMinutes

  return formattedHour;
}