import { TestBed } from '@angular/core/testing';
import { MOVEMENTS_DATA_SOURCE } from './movements.data-source';
import { MOVEMENTS_MOCK_ITEMS } from './movements.mock';
import { MovementsFacade } from './movements.facade';

describe('MovementsFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovementsFacade,
        {
          provide: MOVEMENTS_DATA_SOURCE,
          useValue: {
            load: () => MOVEMENTS_MOCK_ITEMS,
          },
        },
      ],
    });
  });

  it('filters, sorts and paginates movements', () => {
    const facade = TestBed.inject(MovementsFacade);

    facade.applyFilters({
      search: 'transferencia',
      dateFrom: '',
      dateTo: '',
      type: 'transfer',
      currency: 'all',
      account: 'all',
      category: 'all',
    });

    expect(facade.filteredMovements().every((item) => item.kind === 'transfer')).toBe(true);
    expect(facade.totalCount()).toBeGreaterThan(0);
    expect(facade.pageRangeLabel()).toContain('de');
  });

  it('keeps historical missing fields visible and summarises currencies separately', () => {
    const facade = TestBed.inject(MovementsFacade);

    facade.applyFilters({
      search: '',
      dateFrom: '',
      dateTo: '',
      type: 'all',
      currency: 'all',
      account: 'missing',
      category: 'all',
    });

    expect(
      facade.filteredMovements().some((item) => item.kind === 'expense' && 'accountLabel' in item && !item.accountLabel),
    ).toBe(true);

    facade.applyFilters({
      search: '',
      dateFrom: '',
      dateTo: '',
      type: 'all',
      currency: 'all',
      account: 'all',
      category: 'missing',
    });

    const items = facade.filteredMovements();
    expect(items.some((item) => item.kind === 'income' && 'categoryLabel' in item && !item.categoryLabel)).toBe(true);
    expect(facade.summary().currencies.length).toBe(2);
    expect(facade.summary().currencies[0].currency).toBe('ARS');
    expect(facade.summary().currencies[1].currency).toBe('USD');
  });
});
