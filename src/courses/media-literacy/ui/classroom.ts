import { robuxConsequences, topicConsequences } from './consequences';
import { journeys } from './stories';
import { robuxSteps } from '../lessons/robux/robux';
import { robuxStories } from '../lessons/robux/robux-stories';

import type { ClassroomScene } from '../shared/content/classroom';
export function classroomScenes(
  topicId: string,
  robux: boolean,
): ClassroomScene[] {
  if (robux)
    return robuxSteps.map((step, index) => ({
      title: step.title,
      context: robuxStories[index].context,
      chat: robuxStories[index].chat,
      question: step.question,
      options: step.options.map((option) => option.text),
      explanation:
        step.options
          .filter((option) => step.correct.includes(option.id))
          .map((option) => option.text)
          .join(' ') +
        ' ' +
        step.explanation,
      discussion: robuxStories[index].questions,
      consequence: robuxConsequences[index],
      takeaway: robuxStories[index].point,
      source:
        index === 1
          ? 'Офіційна довідка Roblox: пароль і коди не передають іншим. Обіцянки Robux за дані профілю — спосіб обману. Спрощений переказ для уроку.'
          : undefined,
    }));
  return journeys[topicId].scenes.map((scene, index) => ({
    title: scene.title,
    context: scene.lead,
    chat: scene.chat,
    question: scene.question,
    options: scene.choices.map((choice) => choice.text),
    explanation: scene.choices
      .filter((choice) => choice.safe)
      .map((choice) => choice.text + ' ' + choice.explanation)
      .join(' '),
    discussion: scene.discuss,
    consequence: topicConsequences[topicId][index],
    takeaway: scene.takeaway,
  }));
}
