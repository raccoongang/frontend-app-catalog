import { Stack } from '@openedx/paragon';
import { Info as InfoIcon } from '@openedx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';

import SidebarDetailsItem from './SidebarDetailsItem';
import { SidebarDetailsProps } from './types';
import { getSidebarDetails } from './utils';
import messages from './messages';

const SidebarDetails = ({ courseAboutData }: SidebarDetailsProps) => {
  const intl = useIntl();

  const renderPrerequisites = () => {
    if (!courseAboutData.preRequisiteCourses.length) { return null; }

    const prerequisite = courseAboutData.preRequisiteCourses[0];
    const prerequisiteUrl = `${getConfig().LMS_BASE_URL}/courses/${prerequisite.key}/about`;

    return (
      <>
        <SidebarDetailsItem
          key="prerequisites"
          icon={InfoIcon}
          label={intl.formatMessage(messages.prerequisites)}
          value={<a href={prerequisiteUrl}>{prerequisite.display}</a>}
        />
        <p>
          You must successfully complete{' '}
          <a href={prerequisiteUrl}>{prerequisite.display}</a>
          {' '}before you begin this course.
        </p>
      </>
    );
  };

  return (
    <Stack direction="vertical" gap={3}>
      {getSidebarDetails(intl, courseAboutData)
        .filter(detail => detail.show)
        .map(detail => (
          <SidebarDetailsItem
            key={detail.key}
            icon={detail.icon}
            label={detail.label}
            value={detail.value}
          />
        ))}
      {renderPrerequisites()}
    </Stack>
  );
};

export default SidebarDetails;
