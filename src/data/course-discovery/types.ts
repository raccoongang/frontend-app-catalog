export interface CourseDiscoveryResponse {
  count: number;
  total: number;
  results: {
    id: string;
    index: string;
    type: string;
    title: string;
    data: {
      id: string;
      course: string;
      start: string;
      imageUrl: string;
      org: string;
      orgImageUrl?: string;
      content: {
        displayName: string;
        overview?: string;
        number?: string;
      };
      number: string;
      modes: string[];
      language: string;
      catalogVisibility: string;
    };
  }[];
}
