import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container, Alert, SearchField, DataTable, TextFilter,
  CardView, useMediaQuery, breakpoints,
} from '@openedx/paragon';
import { ErrorPage } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';

import { useFrontendParams } from '../data/frontend-params/FrontendParamsContext';
import { useCourseDiscovery } from '../data/course-discovery/hooks';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../data/course-discovery/constants';
import {
  AlertNotification,
  CourseCard,
  Loading,
  SubHeader,
} from '../generic';
import { transformResultsForTable, transformAggregationsToFilterChoices } from './utils';
import { useFilterState } from './hooks/useFilterState';
import messages from './messages';

const CatalogPage = () => {
  const intl = useIntl();
  const [searchParams] = useSearchParams();
  const {
    data: courseData,
    isLoading,
    isError,
    fetchData,
    isFetching,
  } = useCourseDiscovery();
  const { data: frontendParams } = useFrontendParams();
  const isMedium = useMediaQuery({ maxWidth: breakpoints.large.maxWidth });

  const {
    pageIndex,
    filterState,
    searchString,
    handleFetchData,
    resetFilterProgress,
    handleSearch,
    handleClearSearch,
  } = useFilterState(fetchData);

  useEffect(() => {
    const urlSearchQuery = searchParams.get('search_query');
    if (urlSearchQuery && !searchString) {
      handleSearch(urlSearchQuery);
    } else if (!urlSearchQuery && !searchString) {
      fetchData({ pageIndex: DEFAULT_PAGE_INDEX, pageSize: DEFAULT_PAGE_SIZE, filters: [] });
    }
  }, [searchParams, searchString, handleSearch, fetchData]);

  useEffect(() => {
    if (!isFetching && filterState.isFilterChangeInProgress) {
      resetFilterProgress();
    }
  }, [isFetching, filterState.isFilterChangeInProgress, resetFilterProgress]);

  const tableData = useMemo(
    () => transformResultsForTable(courseData?.results),
    [courseData],
  );

  const tableColumns = useMemo(
    () => transformAggregationsToFilterChoices(courseData?.aggs, intl),
    [courseData],
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

  const totalCourses = courseData?.results?.length ?? 0;
  const pageCount = Math.ceil((courseData?.total || totalCourses) / DEFAULT_PAGE_SIZE);

  return (
    <Container className="container-xl pt-5.5">
      <SubHeader
        title={searchString
          ? intl.formatMessage(messages.searchResults, { query: searchString })
          : intl.formatMessage(messages.exploreCourses)}
        className={classNames({ 'mx-2.5': isMedium })}
      />
      {totalCourses > 0 ? (
        <>
          <SearchField
            key="search-field"
            className={classNames({
              'w-auto mx-2.5 mb-0': isMedium,
              'mb-4': !isMedium,
            })}
            value={searchString}
            onSubmit={handleSearch}
            onClear={handleClearSearch}
            placeholder={intl.formatMessage(messages.searchPlaceholder)}
          />
          <DataTable
            isLoading={isFetching}
            showFiltersInSidebar={!isMedium}
            isFilterable={frontendParams?.enableCourseDiscovery}
            isSortable
            isPaginated
            manualFilters
            manualPagination
            defaultColumnValues={{ Filter: TextFilter }}
            itemCount={courseData?.total || totalCourses}
            pageSize={DEFAULT_PAGE_SIZE}
            pageCount={pageCount}
            initialState={{ pageSize: DEFAULT_PAGE_SIZE, pageIndex }}
            data={tableData}
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
