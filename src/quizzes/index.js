// Quiz registry — import and add new quizzes here
import frenchPronouns from './french-pronouns.json';

const quizzes = [
  frenchPronouns,
];

export function getAllQuizzes() {
  return quizzes.map(({ slug, title, description, questionCount }) => ({
    slug,
    title,
    description,
    questionCount,
  }));
}

export function getQuizBySlug(slug) {
  return quizzes.find(q => q.slug === slug) || null;
}
