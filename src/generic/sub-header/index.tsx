import { Button, Form, Stack } from '@openedx/paragon';

// eslint-disable-next-line react/prop-types
export const SubHeader = ({ title }) => (
  <header className="my-4 d-flex justify-content-between">
    <h1>{title}</h1>
    <Stack direction="horizontal">
      <Form.Group className="mb-0">
        <Form.Control floatingLabel="Search for a course" />
      </Form.Group>
      <Button>
        Search
      </Button>
    </Stack>
  </header>
);
