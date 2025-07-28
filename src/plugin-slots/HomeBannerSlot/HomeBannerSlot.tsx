import { PluginSlot } from '@openedx/frontend-plugin-framework';

import HomeBanner from '@src/home/components/home-banner/HomeBanner';
import { HomeBannerProps } from '@src/home/components/home-banner/types';

const HomeBannerSlot = ({
  homepageOverlayHtml,
  showHomepagePromoVideo,
  homepagePromoVideoYoutubeId,
  enableCourseDiscovery,
}: HomeBannerProps) => (
  <PluginSlot
    id="org.openedx.frontend.catalog.home_page.home_banner"
    idAliases={['home_banner']}
    slotOptions={{
      mergeProps: true,
    }}
    pluginProps={{
      homepageOverlayHtml,
      showHomepagePromoVideo,
      homepagePromoVideoYoutubeId,
      enableCourseDiscovery,
    }}
  >
    <HomeBanner
      homepageOverlayHtml={homepageOverlayHtml}
      showHomepagePromoVideo={showHomepagePromoVideo}
      homepagePromoVideoYoutubeId={homepagePromoVideoYoutubeId}
      enableCourseDiscovery={enableCourseDiscovery}
    />
  </PluginSlot>
);

export default HomeBannerSlot;
