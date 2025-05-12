import {
  Card, useMediaQuery, breakpoints, Hyperlink,
} from '@openedx/paragon';

export const CourseCard = () => {
  const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.small.maxWidth });

  return (
    <Card
      as={Hyperlink}
      destination="https://www.edx.org"
      style={{ width: isExtraSmall ? '100%' : '396px' }}
      isClickable
    >
      <Card.ImageCap
        src="https://picsum.photos/360/200/"
        fallbackSrc="https://picsum.photos/360/200/"
        srcAlt="Card image"
        logoSrc="https://via.placeholder.com/150"
        fallbackLogoSrc="https://www.edx.org/images/logos/edx-logo-elm.svg"
        logoAlt="Card logo"
      />
      <Card.Header
        title="Open edX Demo Course"
        subtitle="OpenedX"
      />
      <Card.Footer>
        Starts: Jan 1, 2020
      </Card.Footer>
    </Card>
  );
};
