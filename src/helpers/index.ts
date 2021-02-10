import {
  ABILITY_SCORES,
  ALIGNMENTS,
  CLASSES,
  GOODNESS_RANGE,
  LAWFULNESS_RANGE,
  RACES,
  MappedModifiers,
  Modifier,
  Scores,
  ScoreTypes,
  Stat,
  Score,
  AbilityScoreScores,
  StatsTuple,
  AlignmentScores,
  ClassScores,
  GoodnessScores,
  LawfulnessScores,
  RaceScores,
} from '@/types';

const baseScores: { [key in Stat]?: number } = {
  human: 13,
  halfelf: 4,
};

/**
 * Filter modifiers to the provided stats
 * @param modifiers All modifiers of which to filter
 * @param stats readonly array of keys by which to filter
 */
export const filterModifiers = (
  modifiers: Modifier[],
  stats: StatsTuple,
): Modifier[] => modifiers.filter((modifier) => {
  const { stat } = modifier;
  const filter = [...stats];
  return filter.find((filterItem) => filterItem === stat);
});

/**
 * Calculate the final score of the provided stat given
 * the provided modifiers
 * @param modifiers Scoped modifiers
 * @param stat Stat of which to calculate the score
 */
export const reduceScore = (modifiers: Modifier[], stat: Stat) => {
  const start = baseScores[stat] || 0;
  return modifiers.reduce((accumulator: number, currentModifier: Modifier) => {
    if (currentModifier.stat === stat) {
      return accumulator + currentModifier.value;
    }
    return accumulator;
  }, start);
};

/**
 * Calculate the final scores of a given group of stats
 * @param modifiers Scoped modifiers
 * @param stats Readonly array of stats for which to calculate scores
 */
export const reduceScores = (modifiers: Modifier[], stats: StatsTuple) => {
  const keys = [...stats];
  return keys.reduce((accum: Score, stat: Stat) => Object
    .assign(accum, { [stat]: reduceScore(modifiers, stat) }),
    {} as Score);
};

/**
 * Extract the stat-specific modifiers from the
 * provided array of all modifiers.
 * The name would be better as extractModifiers, but it's a
 * nod to Matt Mercer's Extract Aspects ability in the
 * Monk: Way of the Cobalt Soul
 * @param modifiers All modifiers
 */
export const extractAspects = (modifiers: Modifier[]): Scores => {
  const scopedModifiers: MappedModifiers = {
    [ScoreTypes.abilityScores]: filterModifiers(modifiers, ABILITY_SCORES),
    [ScoreTypes.races]: filterModifiers(modifiers, RACES),
    [ScoreTypes.classes]: filterModifiers(modifiers, CLASSES),
    [ScoreTypes.alignments]: filterModifiers(modifiers, ALIGNMENTS),
    [ScoreTypes.goodness]: filterModifiers(modifiers, GOODNESS_RANGE),
    [ScoreTypes.lawfulness]: filterModifiers(modifiers, LAWFULNESS_RANGE),
    [ScoreTypes.level]: modifiers.filter((modifier) => modifier.stat === ScoreTypes.level),
  };
  const scores: Scores = {
    [ScoreTypes.abilityScores]: reduceScores(
      scopedModifiers[ScoreTypes.abilityScores],
      ABILITY_SCORES,
    ) as AbilityScoreScores,
    [ScoreTypes.alignments]: reduceScores(
      scopedModifiers[ScoreTypes.alignments],
      ALIGNMENTS,
    ) as AlignmentScores,
    [ScoreTypes.classes]: reduceScores(
      scopedModifiers[ScoreTypes.classes],
      CLASSES,
    ) as ClassScores,
    [ScoreTypes.goodness]: reduceScores(
      scopedModifiers[ScoreTypes.goodness],
      GOODNESS_RANGE,
    ) as GoodnessScores,
    [ScoreTypes.lawfulness]: reduceScores(
      scopedModifiers[ScoreTypes.lawfulness],
      LAWFULNESS_RANGE,
    ) as LawfulnessScores,
    [ScoreTypes.races]: reduceScores(
      scopedModifiers[ScoreTypes.races],
      RACES,
    ) as RaceScores,
    [ScoreTypes.level]: reduceScore(
      scopedModifiers[ScoreTypes.level],
      ScoreTypes.level,
    ),
  };
  return scores;
};
