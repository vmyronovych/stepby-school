export const projectFilenames = [
  'index.html',
  'style.css',
  'world.html',
  'world.css',
] as const;
export type ProjectFilename = (typeof projectFilenames)[number];
export type ProjectFiles = Record<ProjectFilename, string>;

export interface WebProject {
  starterFiles: ProjectFiles;
  mapReferenceHeight: number;
}
