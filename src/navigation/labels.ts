import type { SchoolClass } from '../types';
export function clsTitle(schoolClass: SchoolClass) {
  return schoolClass.label || schoolClass.name + ' клас';
}
export function clsCrumb(schoolClass: SchoolClass) {
  return schoolClass.label ? schoolClass.name : schoolClass.name + ' клас';
}
