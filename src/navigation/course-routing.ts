/** Course-owned URL choices; the router provides generic parsing and resolution. */
export interface CourseRouting {
  subject: string;
  topicUrls?: 'course' | 'class';
  home?: string;
  tools?: string;
  legacyDocumentPrefixes?: readonly string[];
}
