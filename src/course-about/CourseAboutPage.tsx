import { useLocation } from 'react-router';
import {
  Container, Layout, Alert, Button,
} from '@openedx/paragon';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { ErrorPage } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Loading } from '../generic';
import CourseMedia from './course-intro/course-media/CourseMedia';
import { CourseIntro } from './course-intro/CourseIntro';
import { useCourseAboutData } from './data/hooks';
import { GRID_LAYOUT } from './constants';
import CourseSidebar from './course-sidebar/CourseSidebar';
import messages from './messages';

// function getStudioUrl() {
//   const urlBase = getConfig().STUDIO_BASE_URL;
//   if (urlBase) {
//     return `${urlBase}/container/`;
//   }
//   return null;
// }

const overviewText = `
<div><section class="about">
<h2><span style="font-size: 1.2em;">About This Course&nbsp;</span><span style="font-size: 1.2em;">About This Course&nbsp;</span><span style="font-size: 1.2em;">About This Course&nbsp;</span><span style="font-size: 1.2em;">About This Course&nbsp;</span><span style="font-size: 1.2em;">About This Course</span></h2>
<p>Include your long course description here. The long course description should contain 150-400 words.</p>
<p>This is paragraph 2 of the long course description. Add more paragraphs as needed. Make sure to enclose them in paragraph tags.</p>
</section>
<section class="prerequisites">
<h2>Requirements</h2>
<p>Add information about the skills and knowledge students need to take this course.</p>
</section>
<section class="course-staff">
<h2>Course Staff</h2>
<article class="teacher">
<div class="teacher-image"><img src="/asset-v1:openedx+123+2024+type@asset+block@images/placeholder-faculty.png" align="left" alt="Course Staff Image #1"></div>
<h3>Staff Member #1</h3>
<p>Biography of instructor/staff member #1</p>
</article>
<article class="teacher">
<div class="teacher-image"><img src="/asset-v1:openedx+123+2024+type@asset+block@images/placeholder-faculty.png" align="left" alt="Course Staff Image #2"></div>
<h3>Staff Member #2</h3>
<p>Biography of instructor/staff member #2</p>
</article>
</section>
<section class="faq">
<section class="responses">
<h2>Frequently Asked Questions</h2>
<article class="response">
<h3>What web browser should I use?</h3>
<p>The Open edX platform works best with current versions of Chrome, Edge, Firefox, or Safari.</p>
<p>See our <a href="https://docs.openedx.org/en/latest/developers/references/developer_guide/testing/browsers.html">list of supported browsers</a> for the most up-to-date information.</p>
</article>
<article class="response">
<h3>Question #2</h3>
<p>Your answer would be displayed here.</p>
</article>
</section>
</section>
</div>
`;

const CourseAboutPage = () => {
  const intl = useIntl();
  const courseId = useLocation().pathname.split('/')[2];
  const { administrator: isGlobalStaff } = getAuthenticatedUser();

  const {
    data: courseAboutData,
    isLoading,
    isError,
  } = useCourseAboutData(courseId);

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
            <CourseIntro courseAboutData={courseAboutData} />
          </Layout.Element>
          <Layout.Element className="course-media-wrapper">
            <CourseMedia courseAboutData={courseAboutData} />
          </Layout.Element>
        </Layout>
      </div>
      <Layout {...GRID_LAYOUT}>
        <Layout.Element>
          <Container className="course-about-overview mb-4">
            {isGlobalStaff && (
              <Button as="a" size="sm" variant="outline-primary" href={getConfig().STUDIO_BASE_URL} className="float-right m-1">
                View About Page in studio
              </Button>
            )}
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: overviewText }} />
          </Container>
        </Layout.Element>
        <Layout.Element>
          <aside>
            <CourseSidebar courseAboutData={courseAboutData} />
          </aside>
        </Layout.Element>
      </Layout>
    </Container>
  );
};

export default CourseAboutPage;
