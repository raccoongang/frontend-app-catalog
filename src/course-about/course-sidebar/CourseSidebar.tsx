import {
  Card, Icon, Stack, OverlayTrigger, Tooltip,
} from '@openedx/paragon';
import {
  Email as EmailIcon,
  BsFacebook as BsFacebookIcon,
  BsTwitterX as BsTwitterXIcon,
} from '@openedx/paragon/icons';

const CourseSidebar = () => (
  <Card>
    <Card.Section>
      <OverlayTrigger
        key=""
        placement="top"
        overlay={(
          <Tooltip id="tooltip-top">
            Share with friends and family!
          </Tooltip>
          )}
      >
        <Stack direction="horizontal" gap={3}>
          <Icon src={BsTwitterXIcon} />
          <Icon src={BsFacebookIcon} />
          <Icon src={EmailIcon} />
        </Stack>
      </OverlayTrigger>
      <Stack direction="vertical" gap={3}>
        <div className="d-flex align-items-center">
          <Icon src={EmailIcon} />
          <div className="d-flex align-items-center">
            Course Number
            <span className="text-muted">12345</span>
          </div>
        </div>
      </Stack>
    </Card.Section>
  </Card>
);

export default CourseSidebar;
