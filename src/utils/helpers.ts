export const getSeverityColor = (severityLevel: number): string => {
  let color;
  switch(severityLevel) {
    case 1:
      color = '#CBF599';
      break;
    case 2:
      color = '#04E762';
      break;
    case 3:
      color = '#F5E900';
      break;
    case 4:
      color = '#F12121';
      break;
    default:
      color = '#fff';
  }
  return color;
}