import {
  Alignment,
  Character,
  ClassName,
  Race,
  Scores,
} from '@/types';

export const DEFAULT_RACE: Race = 'human';
export const DEFAULT_CLASS: ClassName = 'fighter';
export const DEFAULT_ALIGNMENT: Alignment = 'nn';

/**
 * Build the character object using the final scores
 * @param scores Final Scores
 */
export const buildCharacter = (scores: Scores) => {
  const {
    races,
    classes,
    alignments,
    level,
    abilityScores,
  } = scores;

  // Race
  const filteredRaces = (Object.keys(races) as Race[])
    .filter((race) => races[race] > 0);
  const race: Race = filteredRaces.length
    ? filteredRaces.reduce((a, b) => (races[a] > races[b] ? a : b))
    : DEFAULT_RACE;

  // Primary Class
  const filteredClasses = (Object.keys(races) as ClassName[])
    .filter((className) => classes[className] > 0);
  const primaryClass: ClassName = filteredClasses.length
    ? filteredClasses.reduce((a, b) => (classes[a] > classes[b] ? a : b))
    : DEFAULT_CLASS;

  // Secondary Class
  const secondaryClass: ClassName|null = filteredClasses.length
    ? filteredClasses.reduce((a, b) => (classes[a] > classes[b] ? a : b))
    : null;

  const characterClasses: ClassName[] = [primaryClass];
  if (secondaryClass) {
    characterClasses.push(secondaryClass);
  }

  // Alignment
  const filteredAlignments = (Object.keys(alignments) as Alignment[])
    .filter((alignment) => alignments[alignment] > 0);
  const alignment: Alignment = filteredAlignments.length
    ? filteredAlignments.reduce((a, b) => (alignments[a] > alignments[b] ? a : b))
    : DEFAULT_ALIGNMENT;

  const character: Character = {
    race,
    class: characterClasses,
    level,
    alignment,
    abilityScores,
  };

  return character;
};
