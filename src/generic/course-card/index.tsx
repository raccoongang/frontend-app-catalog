import { Link } from 'react-router-dom';
import { Card, useMediaQuery, breakpoints } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import noCourseImg from '@src/assets/images/no-course-image.svg';
import noOrgImg from '@src/assets/images/no-org-image.svg';

import { CourseCardProps } from './types';
import messages from './messages';
import { getFullImageUrl } from './utils';
import { DATE_FORMAT_OPTIONS } from './constants';

// TODO: Determine the final design for the course Card component.
// Issue: https://github.com/openedx/frontend-app-catalog/issues/10
export const CourseCard = ({ original: courseData }: CourseCardProps) => {
  const intl = useIntl();
  const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.small.maxWidth });

  const formattedDate = courseData?.data?.start
    ? intl.formatDate(new Date(courseData.data.start), DATE_FORMAT_OPTIONS)
    : '';

  return (
    <Card
      as={Link}
      to={`/courses/${courseData.id}/about`}
      className={`course-card ${isExtraSmall ? 'w-100' : 'course-card-desktop'}`}
      isClickable
    >
      <Card.ImageCap
        src={getFullImageUrl(courseData.data.imageUrl)}
        fallbackSrc={noCourseImg}
        srcAlt={`${courseData.data.content.displayName} ${courseData.data.number}`}
        // TODO: Check orgImageUrl field (and add orgImageUrl for course discovery API)
        logoSrc={courseData.data.orgImageUrl ? getFullImageUrl(courseData.data.orgImageUrl) : undefined}
        fallbackLogoSrc={!courseData.data.orgImageUrl && noOrgImg}
        logoAlt={courseData.data.org}
      />
      <Card.Section>
        <h3 className="m-0">{courseData.data.content.displayName}</h3>
        <p className="m-0">{courseData.data.org}</p>
        <p className="m-0">{courseData.data.number}</p>
        {/* TODO: Add advertised_start field */}
        {formattedDate && (
          <span>
            {intl.formatMessage(messages.startDate, {
              startDate: formattedDate,
            })}
          </span>
        )}
      </Card.Section>
    </Card>
  );
};
