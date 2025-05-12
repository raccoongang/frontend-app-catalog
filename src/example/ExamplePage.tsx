import {
  Container, CardGrid, Layout,
} from '@openedx/paragon';
import {
  CourseCard, SubHeader, Loading, AlertNotification,
} from '../generic';

const ExamplePage = () => {
  const isLoading = false;

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <main>
      <Container size="xl" className="py-5">
        <AlertNotification />
        <SubHeader title="Viewing 10 courses" />
        <Layout
          lg={[{ span: 'auto', offset: 0 }, { span: 'auto', offset: 0 }]}
          md={[{ span: 'auto', offset: 0 }, { span: 'auto', offset: 0 }]}
          sm={[{ span: 'auto', offset: 0 }, { span: 'auto', offset: 0 }]}
          xs={[{ span: 9, offset: 0 }, { span: 3, offset: 0 }]}
          xl={[{ span: 9 }, { span: 3 }]}
        >
          <Layout.Element>
            <CardGrid
              columnSizes={{
                xs: 12,
                lg: 6,
                xl: 4,
              }}
              hasEqualColumnHeights
            >
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
            </CardGrid>
          </Layout.Element>
          <Layout.Element>
            <aside aria-label="Refine Your Search">
              <h2>Sidebar</h2>
            </aside>
          </Layout.Element>
        </Layout>
      </Container>
    </main>
  );
};

export default ExamplePage;
