export interface MoodboardCard {
  id: string;
  title: string;
  tags: string[];
  imageUrl: string;
  x?: number; // For canvas positioning
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
  date: string;
}

export enum ViewMode {
  CANVAS = 'CANVAS',
  GRID = 'GRID',
}

export enum Tab {
  HOME = 'HOME',
  DISCOVER = 'DISCOVER',
  IMPORT = 'IMPORT',
  DASHBOARD = 'DASHBOARD',
}

export interface UserStats {
  totalCollections: number;
  imagesCount: number;
  textCount: number;
  storageUsed: string;
}