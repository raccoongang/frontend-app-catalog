import { useState, useCallback } from 'react';

import { DEFAULT_PAGE_INDEX } from '@src/data/course-discovery/constants';

const INITIAL_FILTER_STATE = {
  previousFilters: null,
  isFilterChangeInProgress: false,
};

export const useFilterState = (fetchData) => {
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);

  const handleFetchData = useCallback((params) => {
    const { pageIndex: newPageIndex, filters: newFilters } = params;

    const hasFilters = newFilters && Object.keys(newFilters).length > 0;
    const hadFilters = filterState.previousFilters && Object.keys(filterState.previousFilters).length > 0;
    const filtersChanged = filterState.previousFilters !== null
      && JSON.stringify(newFilters) !== JSON.stringify(filterState.previousFilters);
    const isFirstFilterApplied = !hadFilters && hasFilters;

    if (filterState.isFilterChangeInProgress) {
      return;
    }

    if (filtersChanged || isFirstFilterApplied) {
      setFilterState(prev => ({
        ...prev,
        isFilterChangeInProgress: true,
        previousFilters: newFilters || {},
      }));
      setPageIndex(0);
      fetchData({ ...params, pageIndex: 0 });
      return;
    }

    setPageIndex(newPageIndex);
    fetchData(params);
  }, [fetchData, filterState.previousFilters, filterState.isFilterChangeInProgress]);

  const resetFilterProgress = useCallback(() => {
    setFilterState(prev => ({
      ...prev,
      isFilterChangeInProgress: false,
    }));
  }, []);

  return {
    pageIndex,
    filterState,
    handleFetchData,
    resetFilterProgress,
  };
};
