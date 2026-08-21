import { InjectionToken } from '@angular/core';
import type { MovementListItem } from './movements.models';

export interface MovementsDataSource {
  load(): readonly MovementListItem[];
}

export const MOVEMENTS_DATA_SOURCE = new InjectionToken<MovementsDataSource>(
  'MOVEMENTS_DATA_SOURCE',
);

