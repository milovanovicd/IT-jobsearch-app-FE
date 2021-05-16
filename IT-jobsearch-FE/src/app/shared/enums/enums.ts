export enum SeniorityType {
  Junior = 1,
  Medior = 2,
  Senior = 3,
  Lead = 4
}

export const SeniorityTypeLabel = new Map<number, string>([
  [SeniorityType.Junior, 'Junior'],
  [SeniorityType.Medior, 'Medior'],
  [SeniorityType.Senior, 'Senior'],
  [SeniorityType.Lead, 'Lead'],
]);

export const SeniorityTypeReverseLabel = new Map<string, number>([
  [ 'Junior', SeniorityType.Junior],
  [ 'Medior', SeniorityType.Medior],
  [ 'Senior', SeniorityType.Senior],
  [ 'Lead', SeniorityType.Lead],
]);

export enum StatusType {
  Active = 1,
  Inactive = 2,
  Expired = 3
}

export const StatusTypeLabel = new Map<number, string>([
  [StatusType.Active, 'Active'],
  [StatusType.Inactive, 'Inactive'],
  [StatusType.Expired, 'Expired']
]);

export const StatusTypeReverseLabel = new Map<string, number>([
  [ 'Active', StatusType.Active],
  [ 'Inactive', StatusType.Inactive],
  [ 'Expired', StatusType.Expired]
]);
