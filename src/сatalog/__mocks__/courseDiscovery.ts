export const mockCourseDiscoveryResponse = {
  took: 1,
  total: 3,
  results: [
    {
      _id: 'course-v1:OpenEdx+123+2023',
      _index: 'course_info',
      _type: '_doc',
      data: {
        id: 'course-v1:OpenEdx+123+2023',
        course: 'course-v1:OpenEdx+123+2023',
        content: {
          display_name: 'Test course 1',
          overview: 'About This Course Include your long course description here. The long course description should contain 150-400 words. This is paragraph 2 of the long course description. Add more paragraphs as needed. Make sure to enclose them in paragraph tags. Requirements Add information about the skills and knowledge students need to take this course. Course Staff Staff Member #1 Biography of instructor/staff member #1 Staff Member #2 Biography of instructor/staff member #2 Frequently Asked Questions What web browser should I use? The Open edX platform works best with current versions of Chrome, Edge, Firefox, or Safari. See our list of supported browsers for the most up-to-date information. Question #2 Your answer would be displayed here. ',
          number: '123',
        },
        image_url: '/asset-v1:OpenEdx+123+2023+type@asset+block@images_course_image.jpg',
        start: '2030-01-01T00:00:00',
        number: '123',
        org: 'OpenEdx',
        modes: [
          'audit',
        ],
        language: 'en',
        catalog_visibility: 'both',
      },
    },
    {
      _id: 'course-v1:OpenEdx+123+2024',
      _index: 'course_info',
      _type: '_doc',
      data: {
        id: 'course-v1:OpenEdx+123+2024',
        course: 'course-v1:OpenEdx+123+2024',
        content: {
          display_name: 'Course test 2',
          overview: 'About This Course Include your long course description here. The long course description should contain 150-400 words. This is paragraph 2 of the long course description. Add more paragraphs as needed. Make sure to enclose them in paragraph tags. Requirements Add information about the skills and knowledge students need to take this course. Course Staff Staff Member #1 Biography of instructor/staff member #1 Staff Member #2 Biography of instructor/staff member #2 Frequently Asked Questions What web browser should I use? The Open edX platform works best with current versions of Chrome, Edge, Firefox, or Safari. See our list of supported browsers for the most up-to-date information. Question #2 Your answer would be displayed here. ',
          number: '312',
        },
        image_url: '/asset-v1:OpenEdx+123+2024+type@asset+block@images_course_image.jpg',
        start: '2030-01-01T00:00:00',
        number: '312',
        org: 'OpenEdx',
        modes: [
          'audit',
        ],
        language: 'en',
        catalog_visibility: 'both',
      },
    },
    {
      _id: 'course-v1:dev+654+2024',
      _index: 'course_info',
      _type: '_doc',
      data: {
        id: 'course-v1:dev+654+2024',
        course: 'course-v1:dev+654+2024',
        content: {
          display_name: 'Course test 3',
          overview: 'About This Course Include your long course description here. The long course description should contain 150-400 words. This is paragraph 2 of the long course description. Add more paragraphs as needed. Make sure to enclose them in paragraph tags. Requirements Add information about the skills and knowledge students need to take this course. Course Staff Staff Member #1 Biography of instructor/staff member #1 Staff Member #2 Biography of instructor/staff member #2 Frequently Asked Questions What web browser should I use? The Open edX platform works best with current versions of Chrome, Edge, Firefox, or Safari. See our list of supported browsers for the most up-to-date information. Question #2 Your answer would be displayed here. ',
          number: '654',
        },
        image_url: '/asset-v1:dev+654+2024+type@asset+block@images_course_image.jpg',
        start: '2030-01-01T00:00:00',
        number: '654',
        org: 'dev',
        modes: [
          'audit',
        ],
        language: 'en',
        catalog_visibility: 'both',
      },
    },
  ],
  aggs: {
    language: {
      terms: {
        en: 3,
      },
      total: 3,
      other: 0,
    },
    modes: {
      terms: {
        audit: 3,
      },
      total: 3,
      other: 0,
    },
    org: {
      terms: {
        dev: 1,
        openedx: 1,
      },
      total: 3,
      other: 0,
    },
  },
  max_score: 1.0,
};
