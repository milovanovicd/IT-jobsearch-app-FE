export const mapToArray = (map: Map<number, string>) => {
  const result = [];
  map.forEach((label, value) => result.push({value, label}));
  return result;
};

export const mapToOptionsArray = (map: Map<number, string>) => {
  const result = [];
  map.forEach((label, value) => result.push({value: label, label}));
  return result;
};

export const mapMetadataValues = (array: any[]) => array.map(({id, description}) => ({value: description, label: description}));

export const arrayToOptions = (array: string[]) => array.map((value) => ({value, label: value}));
