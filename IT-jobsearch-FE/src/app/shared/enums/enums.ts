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
