import {
  Container, Layout, Alert,
} from '@openedx/paragon';
import { ErrorPage } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Loading } from '../generic';
import CourseIntro from './course-intro/CourseIntro';
import CourseMedia from './course-intro/course-media/CourseMedia';
import messages from './messages';

const GRID_LAYOUT = {
  xl: [{ span: 9 }, { span: 3 }],
};

const CourseAboutPage = () => {
  const intl = useIntl();
  const isLoading = false;
  const isError = false;

  // TODO: Replace with actual course data from API
  const courseData = {
    imageUrl: 'http://local.openedx.io:8000/asset-v1:OpenedX+DemoX+DemoCourse+type@asset+block@Fire_Bans_Edmonton.jpg',
    introVideoId: 'IUN664s7N-c',
    // introVideoId: undefined,
    title: 'Open edX Demo Course',
  };

  if (isLoading) {
    return <Loading />;
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
    <Container className="container-xl py-5.5">
      <div className="course-about-intro-wrapper">
        <Layout {...GRID_LAYOUT}>
          <Layout.Element>
            <CourseIntro />
          </Layout.Element>
          <Layout.Element>
            <CourseMedia
              imageUrl={courseData.imageUrl}
              videoId={courseData.introVideoId}
              altText={courseData.title}
            />
          </Layout.Element>
        </Layout>
      </div>
      <Layout {...GRID_LAYOUT}>
        <Layout.Element>
          <h2 className="bg-info">About This Course</h2>
        </Layout.Element>
        <Layout.Element>
          <aside>
            <h2 className="bg-info">Course Summary</h2>
          </aside>
        </Layout.Element>
      </Layout>
    </Container>
  );
};

export default CourseAboutPage;
