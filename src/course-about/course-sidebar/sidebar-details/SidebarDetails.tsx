import { Stack } from '@openedx/paragon';
import {
  CalendarMonth as CalendarMonthIcon,
  Info as InfoIcon,
  AccessTimeFilled as AccessTimeFilledIcon,
  MoneyFilled as MoneyFilledIcon,
} from '@openedx/paragon/icons';

import SidebarDetailsItem from './SidebarDetailsItem';

const SidebarDetails = () => (
  <Stack direction="vertical" gap={3}>
    <SidebarDetailsItem icon={InfoIcon} label="Course Number" value="12345" />
    <SidebarDetailsItem icon={CalendarMonthIcon} label="Classes Start" value="Jan 1, 2020" />
    <SidebarDetailsItem icon={CalendarMonthIcon} label="Classes End" value="Jan 1, 2020" />
    <SidebarDetailsItem icon={AccessTimeFilledIcon} label="Estimated Effort" value="20:30" />
    <SidebarDetailsItem icon={MoneyFilledIcon} label="Price" value="Free" />
  </Stack>
);

export default SidebarDetails;
