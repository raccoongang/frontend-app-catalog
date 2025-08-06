import { useMemo } from 'react';
import {
  Container, Alert, SearchField, DataTable, TextFilter,
  CardView, useMediaQuery, breakpoints,
} from '@openedx/paragon';
import { ErrorPage } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';

import { useFrontendParams } from '@src/data/frontend-params/FrontendParamsContext';
import { useCourseDiscovery } from '@src/data/course-discovery/hooks';
import { DEFAULT_PAGE_SIZE } from '@src/data/course-discovery/constants';
import {
  AlertNotification,
  CourseCard,
  Loading,
  SubHeader,
} from '@src/generic';
import {
  transformResultsForTable,
  transformAggregationsToFilterChoices,
  getPageTitle,
} from './utils';
import { useCatalogState } from './hooks/useCatalogState';
import messages from './messages';

const SKELETON_CARD_COUNT = 3;

const CatalogPage = () => {
  const intl = useIntl();
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
    searchString,
    lastSearchQuery,
    previousCourseData,
    handleFetchData,
    handleSearch,
    handleClearSearch,
  } = useCatalogState(fetchData, courseData, isFetching);

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

  const tableData = useMemo(
    () => transformResultsForTable(displayData?.results),
    [displayData?.results],
  );

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
    <Container className="container-xl pt-5.5">
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
            itemCount={displayData?.total || totalCourses}
            pageSize={DEFAULT_PAGE_SIZE}
            pageCount={pageCount}
            initialState={{ pageSize: DEFAULT_PAGE_SIZE, pageIndex }}
            data={tableData}
            columns={tableColumns}
            fetchData={handleFetchData}
          >
            <DataTable.TableControlBar />
            <CardView CardComponent={CourseCard} skeletonCardCount={SKELETON_CARD_COUNT} />
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
