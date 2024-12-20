export const metersToKilometers = (visibilityInMeters: number) => {
  const visibilityInKilometers = visibilityInMeters / 100;
  return `${visibilityInKilometers.toFixed(0)}km`;
};
