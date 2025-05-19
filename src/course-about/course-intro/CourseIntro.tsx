import { Button, Card } from '@openedx/paragon';

import StatusAlert from './StatusAlert';

const CourseIntro = () => {
  const courseId = 'course-v1:rg+312+2024';

  const alertStatuses = {
    enrolled: 'You are enrolled in this course',
    courseIsFull: 'Course is full',
    invitationOnly: 'Enrollment in this course is by invitation only',
    enrolledClosed: 'Enrollment is closed',
  };

  return (
    <section className="course-about-intro">
      <Card>
        <Card.Header
          title={<h1 className="course-about-intro-heading m-0">Open edX Demo Course</h1>}
          subtitle="OpenedX"
        />
        <Card.Section>
          Explore Open edX® capabilities in this demo course, covering platform tools, content creation,
          assessments, social learning, and community stories. Ideal for course developers,
          online learning newcomers, and community members.
        </Card.Section>
        <Card.Footer className="justify-content-start">
          <StatusAlert
            variant="success"
            heading={alertStatuses.enrolled}
          />
          <Button as="a" href={`http://apps.local.openedx.io:2000/learning/course/${courseId}/home`}>
            Enrol now
          </Button>
        </Card.Footer>
      </Card>
    </section>
  );
};

export default CourseIntro;
