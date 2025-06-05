import { IntlShape } from '@edx/frontend-platform/i18n';
import {
  AccessTimeFilled as AccessTimeFilledIcon,
  CalendarMonth as CalendarMonthIcon,
  Info as InfoIcon,
  MoneyFilled as MoneyFilledIcon,
} from '@openedx/paragon/icons';

import { formatDate } from '../../../utils';
import { CourseAboutData } from './types';
import messages from './messages';

const ENABLE_COSMETIC_DISPLAY_PRICE = true;

export const getSidebarDetails = (intl: IntlShape, courseAboutData: CourseAboutData) => [
  {
    key: 'effort',
    icon: AccessTimeFilledIcon,
    label: intl.formatMessage(messages.courseNumber),
    value: courseAboutData.displayNumberWithDefault,
    show: true,
  },
  {
    key: 'start-date',
    icon: CalendarMonthIcon,
    label: intl.formatMessage(messages.classesStart),
    value: formatDate((courseAboutData.advertisedStart || courseAboutData.start) ?? ''),
    show: !courseAboutData.startDateIsStillDefault,
  },
  {
    key: 'end-date',
    icon: CalendarMonthIcon,
    label: intl.formatMessage(messages.classesEnd),
    value: formatDate(courseAboutData.end ?? ''),
    show: !!courseAboutData.end,
  },
  {
    key: 'effort',
    icon: AccessTimeFilledIcon,
    label: intl.formatMessage(messages.estimatedEffort),
    value: courseAboutData.effort,
    show: !!courseAboutData.effort,
  },
  {
    key: 'price',
    icon: MoneyFilledIcon,
    label: intl.formatMessage(messages.price),
    value: courseAboutData.coursePrice,
    show: !!courseAboutData.coursePrice && ENABLE_COSMETIC_DISPLAY_PRICE,
  },
  {
    key: 'requirements',
    icon: InfoIcon,
    label: intl.formatMessage(messages.requirements),
    value: courseAboutData.requirements,
    show: !!courseAboutData?.requirements,
  },
];
