// Quiz registry — import and add new quizzes here
import frenchPronouns from './french-pronouns.json';
import frenchGenderAgreement from './french-gender-agreement.json';
import tcfWritingToolkit from './tcf-writing-toolkit.json';
import frenchConnectors from './french-connectors.json';
import frenchArticles from './french-articles.json';
import frenchCoiYPronouns from './french-coi-y-pronouns.json';
import frenchPresentConjugation from './french-present-conjugation.json';
import frenchPasseComposeParticiples from './french-passe-compose-participles.json';
import frenchFutureConjugation from './french-future-conjugation.json';
import frenchImparfaitConjugation from './french-imparfait-conjugation.json';

const quizzes = [
  frenchPronouns,
  frenchGenderAgreement,
  tcfWritingToolkit,
  frenchConnectors,
  frenchArticles,
  frenchCoiYPronouns,
  frenchPresentConjugation,
  frenchPasseComposeParticiples,
  frenchFutureConjugation,
  frenchImparfaitConjugation,
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
