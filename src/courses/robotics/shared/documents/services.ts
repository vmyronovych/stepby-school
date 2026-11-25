import type { DocumentServices } from '../../../../components/document';
import { roboticsLessonState } from './state';
import { handleRoboticsDocumentAction } from './printing';
export function createRoboticsDocumentServices(
  platform: Pick<DocumentServices, 'notify' | 'reducedMotion'>,
): DocumentServices {
  return {
    ...platform,
    handleAction: (action, body) =>
      handleRoboticsDocumentAction(action, body, platform.notify, () => {
        roboticsLessonState.ktp = {};
      }),
    editableFields: () => roboticsLessonState.ktp,
  };
}
