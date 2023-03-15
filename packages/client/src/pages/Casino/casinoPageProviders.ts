export interface Option {
  value: string;
  label: string;
  games?: number;
}

export const optionsSportBetResult: Option[] = [
  { label: 'All', value: 'All' },
  { label: 'Netent', value: 'Netent' },
  { label: 'Playson', value: 'PLAYSON' },
  { label: 'Booongo', value: 'Booongo' },
  { label: 'Hacksaw', value: 'Hacksaw' },
  { label: 'Push Gaming', value: 'Push Gaming' },
  { label: 'EGT', value: 'EGT' },
  { label: 'Relax Gaming', value: 'Relax Gaming' },
  { label: 'no limit city', value: 'NolimitCity' },
  { label: 'Pragmatic play', value: 'PRAGMATIC PLAY' },
];

export const requestParams = optionsSportBetResult.slice(1).map((option) => option.value).join(',');
