import {
  Alignment,
  Character,
  ClassName,
  Race,
  Scores,
  Stat,
  StatScores,
} from '@/types';

export const DEFAULT_RACE: Race = 'human';
export const DEFAULT_CLASS: ClassName = 'fighter';
export const DEFAULT_ALIGNMENT: Alignment = 'nn';

/**
 * Find top scores in the stat scores provided.
 * @param statScores  Scores of a specific stat
 * @param defaultStat Default stat if none are found
 */
export const findTopScores = (statScores: StatScores, defaultStat: Stat|null = null): Stat[] => {
  // map object keys to an array of scores for easier use
  const scoresArray = (Object.keys(statScores) as Stat[]).map((stat) => ({
    stat,
    value: statScores[stat] || 0,
  })).filter((score) => score.value > 0); // filter all scores over 0

  // find top score value
  const maxScore = Math.max(...scoresArray.map((score) => score.value));
  // filter by all stats with top score
  const topStats = scoresArray.filter((score) => score.value === maxScore);

  // return all top stats
  if (topStats.length > 0) {
    return topStats.map((score) => score.stat);
  }
  // if no results, return empty array or default if provided
  return (defaultStat === null) ? [] : [defaultStat];
};

/**
 * Pick a random winner from the array of stats.
 * Can optionally exclude a stat from the results.
 * @param stats   Array of stats to choose from
 * @param exclude Specific stat to exclude from result
 */
export const pickRandomWinner = (stats: Stat[], exclude?: Stat): Stat => {
  // skip our logic for random if it's just one item in the array
  if (stats.length === 1) {
    return stats[0];
  }
  const winner = stats[Math.floor(Math.random() * stats.length)];
  return (winner === exclude) ? pickRandomWinner(stats, winner) : winner;
};

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
  const topRaces = findTopScores(races, DEFAULT_RACE) as Race[];
  const race = pickRandomWinner(topRaces) as Race;

  // Primary Class
  const topClasses = findTopScores(classes, DEFAULT_CLASS) as ClassName[];
  const primaryClass = pickRandomWinner(topClasses) as ClassName;

  // Secondary Class
  const secondaryClass = (topClasses.length > 1)
    ? pickRandomWinner(topClasses, primaryClass) as ClassName
    : null;

  const characterClasses: ClassName[] = [primaryClass];
  if (secondaryClass) {
    characterClasses.push(secondaryClass);
  }

  // Alignment
  const topAlignments = findTopScores(alignments, DEFAULT_ALIGNMENT) as Alignment[];
  const alignment = pickRandomWinner(topAlignments) as Alignment;

  const character: Character = {
    race,
    class: characterClasses,
    level,
    alignment,
    abilityScores,
  };

  return character;
};
