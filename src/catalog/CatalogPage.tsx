import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import {
  DataTable, Container, SearchField, Alert, breakpoints,
  useMediaQuery, TextFilter, CardView,
} from '@openedx/paragon';
import { ErrorPage } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import debounce from 'lodash.debounce';

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from '@src/data/course-list-search/constants';
import { useCourseListSearch } from '@src/data/course-list-search/hooks';
import {
  AlertNotification, CourseCard, Loading, SubHeader,
} from '../generic';
import { useCatalog } from './hooks/useCatalog';
import messages from './messages';
import { transformAggregationsToFilterChoices, getPageTitle } from './utils';

const CatalogPage = () => {
  const intl = useIntl();
  const {
    data: courseData,
    isLoading,
    isError,
    fetchData,
    isFetching,
  } = useCourseListSearch();
  const isMedium = useMediaQuery({ maxWidth: breakpoints.large.maxWidth });

  const {
    pageIndex,
    filterState,
    lastSearchQuery,
    searchString,
    previousCourseData,
    handleSearch,
    handleClearSearch,
    handleFetchData,
    resetFilterProgress,
  } = useCatalog({ fetchData, courseData, isFetching });

  const [inputValue, setInputValue] = useState(searchString);
  const isUserInputRef = useRef(false);
  const lastSearchedValueRef = useRef<string>('');
  const debouncedSearchRef = useRef<ReturnType<typeof debounce> | null>(null);
  const searchStringRef = useRef(searchString);
  const lastSearchQueryRef = useRef(lastSearchQuery);

  /**
   * Determines which data to display in the catalog based on search state and results.
   * Shows previous course data when:
   * - User has an active search but no results were found, OR
   * - User previously searched, cleared the search, but no results exist
   * This provides better UX by showing cached data instead of empty state.
   */
  const displayData = useMemo(() => {
    const hasSearchResults = (courseData?.results?.length ?? 0) > 0;
    const hasActiveSearch = Boolean(searchString);
    const hadPreviousSearch = Boolean(lastSearchQuery);

    const shouldShowPreviousData = (hasActiveSearch && !hasSearchResults && previousCourseData)
          || (hadPreviousSearch && !hasActiveSearch && !hasSearchResults && previousCourseData);

    return shouldShowPreviousData ? previousCourseData : courseData;
  }, [courseData, searchString, lastSearchQuery, previousCourseData]);

  useEffect(() => {
    fetchData({ pageIndex: DEFAULT_PAGE_INDEX, pageSize: DEFAULT_PAGE_SIZE });
  }, [fetchData]);

  useEffect(() => {
    if (!isFetching && filterState.isFilterChangeInProgress) {
      resetFilterProgress();
    }
  }, [isFetching, filterState.isFilterChangeInProgress, resetFilterProgress]);

  useEffect(() => {
    if (!lastSearchQuery && lastSearchedValueRef.current) {
      lastSearchedValueRef.current = '';
    }
  }, [lastSearchQuery]);

  useEffect(() => {
    searchStringRef.current = searchString;
    lastSearchQueryRef.current = lastSearchQuery;
  }, [searchString, lastSearchQuery]);

  useEffect(() => {
    if (!isUserInputRef.current && !lastSearchQuery) {
      setInputValue(searchString);
    }
    isUserInputRef.current = false;
  }, [searchString, lastSearchQuery]);

  useEffect(() => {
    const performSearch = (value: string) => {
      const currentSearchString = searchStringRef.current;
      const currentLastSearchQuery = lastSearchQueryRef.current;

      if (!value) {
        lastSearchedValueRef.current = '';
        handleClearSearch();
        return;
      }

      if (value === lastSearchedValueRef.current && !currentSearchString && currentLastSearchQuery) {
        return;
      }

      lastSearchedValueRef.current = value;
      handleSearch(value);
    };

    debouncedSearchRef.current?.cancel();

    debouncedSearchRef.current = debounce(performSearch, 500);

    return () => {
      debouncedSearchRef.current?.cancel();
    };
  }, [handleSearch, handleClearSearch]);

  useEffect(() => {
    if (!isUserInputRef.current && inputValue === searchString) {
      return;
    }

    if (inputValue === searchString) {
      return;
    }

    debouncedSearchRef.current?.(inputValue);
  }, [inputValue, searchString]);

  const handleInputChange = (value: string) => {
    isUserInputRef.current = true;
    setInputValue(value);
  };

  const handleInputSubmit = useCallback((value: string) => {
    debouncedSearchRef.current?.cancel();
    isUserInputRef.current = true;
    lastSearchedValueRef.current = value;
    setInputValue(value);
    handleSearch(value);
  }, [handleSearch]);

  const handleInputClear = useCallback(() => {
    debouncedSearchRef.current?.cancel();
    isUserInputRef.current = true;
    lastSearchedValueRef.current = '';
    setInputValue('');
    handleClearSearch();
  }, [handleClearSearch]);

  const tableColumns = useMemo(
    () => transformAggregationsToFilterChoices(displayData?.aggs, intl),
    [displayData?.aggs, intl],
  );

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (isError) {
    return (
      <Container className="py-5.5">
        <Alert variant="danger">
          <ErrorPage
            message={intl.formatMessage(messages.errorMessage, {
              supportEmail: getConfig().INFO_EMAIL,
            })}
          />
        </Alert>
      </Container>
    );
  }

  const totalCourses = displayData?.results?.length ?? 0;
  const pageCount = Math.ceil((displayData?.total || totalCourses) / DEFAULT_PAGE_SIZE);

  return (
    <Container fluid={false} size="xl" className="pt-5.5 mb-6">
      <SubHeader
        title={getPageTitle({
          intl,
          lastSearchQuery,
          searchString,
          courseData,
        })}
        className={classNames({ 'mx-2.5': isMedium })}
      />
      {totalCourses > 0 ? (
        <>
          {getConfig().ENABLE_COURSE_DISCOVERY && (
            <SearchField
              key="search-field"
              className={classNames({
                'w-auto mx-2.5 mb-0': isMedium,
                'mb-4 w-25': !isMedium,
              })}
              placeholder={intl.formatMessage(messages.searchPlaceholder)}
              value={inputValue}
              onChange={handleInputChange}
              onSubmit={handleInputSubmit}
              onClear={handleInputClear}
              submitButtonLocation="external"
            />
          )}
          <DataTable
            isLoading={isFetching}
            showFiltersInSidebar={!isMedium}
            isFilterable={getConfig().ENABLE_COURSE_DISCOVERY}
            isSortable
            isPaginated
            manualFilters
            manualPagination
            defaultColumnValues={{ Filter: TextFilter }}
            itemCount={displayData?.total || totalCourses}
            pageSize={DEFAULT_PAGE_SIZE}
            pageCount={pageCount}
            initialState={{ pageSize: DEFAULT_PAGE_SIZE, pageIndex }}
            data={displayData?.results}
            columns={tableColumns}
            fetchData={handleFetchData}
          >
            <DataTable.TableControlBar />
            <CardView CardComponent={CourseCard} skeletonCardCount={3} />
            <DataTable.EmptyTable content={intl.formatMessage(messages.noResultsFound)} />
            <DataTable.TableFooter />
          </DataTable>
        </>
      ) : (
        <AlertNotification
          title={intl.formatMessage(messages.noCoursesAvailable)}
          message={intl.formatMessage(messages.noCoursesAvailableMessage)}
        />
      )}
    </Container>
  );
};

export default CatalogPage;
