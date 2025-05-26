import {
  Icon, Stack, Hyperlink, Tooltip, OverlayTrigger,
} from '@openedx/paragon';
import {
  Email as EmailIcon,
  BsFacebook as BsFacebookIcon,
  BsTwitterX as BsTwitterXIcon,
} from '@openedx/paragon/icons';

const SOCIAL_LINKS = [
  {
    destination: 'https://x.com/edx',
    icon: BsTwitterXIcon,
  },
  {
    destination: 'https://www.facebook.com/edx',
    icon: BsFacebookIcon,
  },
  {
    destination: 'mailto:info@edx.org',
    icon: EmailIcon,
  },
];

const SidebarSocial = () => (
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
          <Hyperlink destination={link.destination}>
            <Icon className="course-sidebar-social-icon" src={link.icon} />
          </Hyperlink>
        ))}
      </Stack>
    </header>
  </OverlayTrigger>
);

export default SidebarSocial;
