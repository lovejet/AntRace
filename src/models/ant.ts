export interface Ant {
  name: string;
  color: string;
  length: number;
  weight: number;
}

export interface AntExpand {
  id: number;
  name: string;
  color: string;
  length: number;
  weight: number;
  state: string;
  odds: number;
}
