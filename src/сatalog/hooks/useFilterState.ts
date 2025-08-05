import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@src/data/course-discovery/constants';

const INITIAL_FILTER_STATE = {
  previousFilters: null as any[] | Record<string, any> | null,
  isFilterChangeInProgress: false,
};

export const useFilterState = (fetchData) => {
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
  const [searchString, setSearchString] = useState('');
  const [, setSearchParams] = useSearchParams();

  const handleFetchData = useCallback((params) => {
    const { pageIndex: newPageIndex, filters: newFilters } = params;

    const hasFilters = newFilters && Array.isArray(newFilters) && newFilters.length > 0;
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
        previousFilters: newFilters || [],
      }));
      setPageIndex(0);
      fetchData({ ...params, pageIndex: 0, searchString });
      return;
    }

    setPageIndex(newPageIndex);
    fetchData({ ...params, searchString });
  }, [fetchData, filterState.previousFilters, filterState.isFilterChangeInProgress, searchString]);

  const resetFilterProgress = useCallback(() => {
    setFilterState(prev => ({
      ...prev,
      isFilterChangeInProgress: false,
    }));
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchString(query);
    setPageIndex(0);
    setFilterState(prev => ({
      ...prev,
      isFilterChangeInProgress: true,
      previousFilters: [],
    }));

    if (query) {
      setSearchParams({ search_query: query });
    } else {
      setSearchParams({});
    }

    fetchData({
      pageIndex: 0,
      pageSize: DEFAULT_PAGE_SIZE,
      filters: [],
      searchString: query,
    });
  }, [fetchData, setSearchParams]);

  const handleClearSearch = useCallback(() => {
    setSearchString('');
    setPageIndex(0);
    setFilterState(prev => ({
      ...prev,
      isFilterChangeInProgress: true,
      previousFilters: [],
    }));

    setSearchParams({});

    fetchData({
      pageIndex: 0,
      pageSize: DEFAULT_PAGE_SIZE,
      filters: [],
    });
  }, [fetchData, setSearchParams]);

  return {
    pageIndex,
    filterState,
    searchString,
    handleFetchData,
    resetFilterProgress,
    handleSearch,
    handleClearSearch,
  };
};
