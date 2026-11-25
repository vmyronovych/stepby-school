import type { Course } from '../../types';
import { mathematics } from '../../courses/mathematics';
import { algebra } from '../../courses/algebra';
import { geometry } from '../../courses/geometry';
import { informatics } from '../../courses/informatics';
import { robotics } from '../../courses/robotics';
import { mediaLiteracy } from '../../courses/media-literacy';
import { webDevelopment } from '../../courses/web-development';

export const courses: readonly Course[] = [
  mathematics,
  algebra,
  geometry,
  informatics,
  robotics,
  mediaLiteracy,
  webDevelopment,
];
