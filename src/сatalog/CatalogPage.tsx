import {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import {
  Container, Alert, SearchField, DataTable, TextFilter,
  CardView, useMediaQuery, breakpoints,
} from '@openedx/paragon';
import { ErrorPage } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';

import { useFrontendParams } from '@src/data/frontend-params/FrontendParamsContext';
import {
  AlertNotification,
  CourseCard,
  Loading,
  SubHeader,
} from '../generic';
import { useCourseDiscovery } from '../data/course-discovery/hooks';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../data/course-discovery/constants';
import { transformResultsForTable, transformAggregationsToFilterChoices } from './utils';
import messages from './messages';

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
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);

  useEffect(() => {
    fetchData({ pageIndex, pageSize: DEFAULT_PAGE_SIZE });
  }, [pageIndex, fetchData]);

  const handleFetchData = useCallback((params) => {
    if (params.pageIndex !== pageIndex) {
      setPageIndex(params.pageIndex);
    }
    fetchData(params);
  }, [pageIndex, fetchData]);

  const tableData = useMemo(
    () => transformResultsForTable(courseData?.results),
    [courseData],
  );

  const tableColumns = useMemo(
    () => transformAggregationsToFilterChoices(courseData?.aggs),
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
        title={intl.formatMessage(messages.exploreCourses)}
        className={classNames({ 'mx-2.5': isMedium })}
      />
      {totalCourses > 0 ? (
        <>
          <SearchField
            key=""
            className={classNames({
              'w-auto mx-2.5 mb-0': isMedium,
              'mb-4': !isMedium,
            })}
            value=""
            onSubmit={() => {}}
            onClear={() => {}}
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
