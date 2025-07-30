import type { ReactNode } from 'react';

export interface FrontendParamsResponse {
  courseAboutShowSocialLinks: boolean,
  courseAboutTwitterAccount: string,
  coursesAreBrowsable: boolean,
  enableCourseDiscovery: boolean,
  enableCourseSortingByStartDate: boolean,
  homepageCourseMax: number,
  homepageOverlayHtml: string | null,
  homepagePromoVideoYoutubeId: string,
  isCosmeticPriceEnabled: boolean,
  showHomepagePromoVideo: boolean,
  showPartners: boolean,
  sidebarHtmlEnabled: boolean,
}

export interface FrontendParamsContextType {
  data: FrontendParamsResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
}

export interface FrontendParamsProviderProps {
  children: ReactNode;
}
