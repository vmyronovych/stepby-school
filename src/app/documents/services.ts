import { roboticsSubject } from '../../courses/robotics';
import { createRoboticsDocumentServices } from '../../courses/robotics/shared/documents';
import type { DocumentServices } from '../../components/document';
import { prefersReducedMotion } from '../../components/motion';
import { notify } from '../notifications';
const platform: DocumentServices = {
  notify,
  reducedMotion: prefersReducedMotion,
  handleAction: () => false,
};
const courseServices: Record<string, DocumentServices> = {
  [roboticsSubject.id]: createRoboticsDocumentServices(platform),
};
export function documentServicesFor(subject: string) {
  return courseServices[subject] ?? platform;
}
