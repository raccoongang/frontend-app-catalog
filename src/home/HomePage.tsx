import { Alert, Container } from '@openedx/paragon';
import { ErrorPage } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';

import HomeBannerSlot from '../plugin-slots/HomeBannerSlot/HomeBannerSlot';
import HomeCoursesListSlot from '../plugin-slots/HomeCoursesListSlot/HomeCoursesListSlot';
import { useFrontendParams } from '../data/frontend-params';
import { Loading } from '../generic';
import messages from './messages';

const HomePage = () => {
  const intl = useIntl();
  const {
    data: {
      homepageOverlayHtml,
      showHomepagePromoVideo,
      homepagePromoVideoYoutubeId,
      enableCourseDiscovery,
    } = {}, isLoading, isError,
  } = useFrontendParams();

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
    <>
      <HomeBannerSlot
        homepageOverlayHtml={homepageOverlayHtml || ''}
        showHomepagePromoVideo={showHomepagePromoVideo}
        homepagePromoVideoYoutubeId={homepagePromoVideoYoutubeId}
        enableCourseDiscovery={enableCourseDiscovery}
      />
      <HomeCoursesListSlot />
    </>
  );
};

export default HomePage;
