import {
  Container, SearchField, Alert, DataTable, TextFilter, CheckboxFilter,
  CardView, Card, useMediaQuery, breakpoints,
} from '@openedx/paragon';
import { ErrorPage } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Loading, SubHeader,
} from '../generic';
import { useCourseDiscovery } from './data/hooks';
import messages from './messages';

interface AggregationTerms {
  terms: Record<string, number>;
  total: number;
  other: number;
}

interface Aggregations {
  [key: string]: AggregationTerms;
}

const transformAggsToFilterChoices = (aggs: Aggregations | undefined) => {
  if (!aggs) { return []; }

  return Object.entries(aggs).map(([key, aggValue]) => {
    const terms = aggValue.terms || {};
    const filterChoices = Object.entries(terms).map(([termKey, count]) => ({
      name: termKey.charAt(0).toUpperCase() + termKey.slice(1),
      number: count,
      value: termKey,
    }));

    return {
      Header: key.charAt(0).toUpperCase() + key.slice(1),
      accessor: key,
      Filter: CheckboxFilter,
      filter: 'includesValue',
      filterChoices,
      filterMethod: (rows: any[], id: string | number, filterValue: string | any[]) => rows.filter(row => {
        const rowValue = row.values[id];
        if (Array.isArray(rowValue)) {
          return rowValue.some(v => filterValue.includes(v));
        }
        return filterValue.includes(rowValue);
      }),
    };
  });
};

const transformResultsForTable = (results: any[] | undefined) => {
  if (!results) { return []; }

  return results.map(item => ({
    id: item.id,
    famous_for: item.data.content.displayName,
    language: item.data.language,
    modes: item.data.modes,
    org: item.data.org,
    original: item,
  }));
};

export const getFullImageUrl = (path: string | undefined) => `${getConfig().LMS_BASE_URL}${path}`;

interface CourseCardProps {
  original: {
    famous_for: string;
    org: string;
  };
}

export const CourseCard = ({ original }: CourseCardProps) => {
  const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.small.maxWidth });

  return (
    <Card
      as={Link}
      className={`course-card ${isExtraSmall ? 'w-100' : 'course-card-desktop'}`}
      isClickable
    >
      <Card.Header
        title={original?.famous_for}
        subtitle={original?.org}
      />
    </Card>
  );
};

const CatalogPage = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search_query') || '';

  const {
    data: courseData,
    isLoading,
    isError,
  } = useCourseDiscovery();

  const handleSearch = (value: string) => {
    navigate(`/courses?search_query=${value}`);
  };

  const handleClearFilters = () => {
    navigate('/courses');
  };

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

  return (
    <Container className="container-xl pt-5.5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <SubHeader title="Explore courses" />
      </div>
      <SearchField
        key={searchQuery}
        className="w-25 mb-4"
        value={searchQuery}
        onSubmit={handleSearch}
        onClear={handleClearFilters}
        placeholder="Search courses..."
      />
      <DataTable
        showFiltersInSidebar
        isFilterable
        isSortable
        isPaginated
        defaultColumnValues={{ Filter: TextFilter }}
        itemCount={courseData?.results?.length}
        initialState={{
          pageSize: 3,
          pageIndex: 0,
        }}
        data={transformResultsForTable(courseData?.results)}
        columns={transformAggsToFilterChoices(courseData?.aggs)}
      >
        <DataTable.TableControlBar />
        <CardView CardComponent={CourseCard} />
        <DataTable.EmptyTable content="No results found" />
        <DataTable.TableFooter />
      </DataTable>
    </Container>
  );
};

export default CatalogPage;
