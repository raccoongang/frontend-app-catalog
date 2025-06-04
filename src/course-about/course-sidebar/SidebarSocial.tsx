import {
  Icon, Stack, Hyperlink, Tooltip, OverlayTrigger,
} from '@openedx/paragon';
import {
  Email as EmailIcon,
  BsFacebook as BsFacebookIcon,
  BsTwitterX as BsTwitterXIcon,
} from '@openedx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';

const PLATFORM_TWITTER_ACCOUNT = '@YourPlatformTwitterAccount'; // MFE Conf

const getTwitterShareUrl = (data) => {
  const tweetText = `I just enrolled in ${data.displayNumberWithDefault} ${data.name} through ${PLATFORM_TWITTER_ACCOUNT} ${window.location.href}`;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
};

const getEmailShareUrl = (courseData) => {
  const subject = `Take a course with ${getConfig().SITE_NAME} online`;
  const body = `I just enrolled in ${courseData.displayNumberWithDefault} ${courseData.name} through ${getConfig().SITE_NAME} ${window.location.href}`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const getFacebookShareUrl = () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;

const SOCIAL_LINKS = [
  {
    destination: (courseAboutData: any) => getTwitterShareUrl(courseAboutData),
    icon: BsTwitterXIcon,
    screenReaderText: "Tweet that you've enrolled in this course",
  },
  {
    destination: () => getFacebookShareUrl(),
    icon: BsFacebookIcon,
    screenReaderText: "Post a Facebook message to say you've enrolled in this course",
  },
  {
    destination: (courseData) => getEmailShareUrl(courseData),
    icon: EmailIcon,
    screenReaderText: "Email someone to say you've enrolled in this course",
  },
];

const SidebarSocial = ({ courseAboutData }: { courseAboutData: any }) => (
  <OverlayTrigger
    key=""
    placement="top"
    overlay={(
      <Tooltip id="tooltip-top">
        Share with friends and family!
      </Tooltip>
    )}
  >
    <header>
      <Stack
        className="course-sidebar-social-icons justify-content-center"
        direction="horizontal"
        gap={4}
      >
        {SOCIAL_LINKS.map((link) => (
          <Hyperlink destination={typeof link.destination === 'function' ? link.destination(courseAboutData) : link.destination}>
            <Icon
              className="course-sidebar-social-icon"
              src={link.icon}
              screenReaderText={link.screenReaderText}
            />
          </Hyperlink>
        ))}
      </Stack>
    </header>
  </OverlayTrigger>
);

export default SidebarSocial;
