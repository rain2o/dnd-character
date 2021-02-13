export type QuestionOption = {
  label: string;
  value: string;
  modifiers: Modifier[];
  id?: string; // for compatibility for now
}

export type Question = {
  prompt: string;
  options: QuestionOption[];
  index: number;
}

export type Modifier = {
  stat: string;
  value: number;
}

export const CLASSES = [
  'fighter',
  'ranger',
  'paladin',
  'cleric',
  'druid',
  'bard',
  'monk',
  'sorcerer',
  'barbarian',
  'rogue',
  'wizard',
  'warlock',
] as const;
export type ClassTuple = typeof CLASSES;
export type ClassName = ClassTuple[number]; // union type

export const RACES = [
  'dwarf',
  'elf',
  'halfelf',
  'halfling',
  'human',
  'halforc',
  'gnome',
] as const;
export type RaceTuple = typeof RACES;
export type Race = RaceTuple[number];

export const ABILITY_SCORES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const;
export type AbilityScoreTuple = typeof ABILITY_SCORES;
export type AbilityScore = AbilityScoreTuple[number]; // union type

export const ALIGNMENTS = [
  'lg',
  'ln',
  'le',
  'cg',
  'cn',
  'ce',
  'ng',
  'ne',
  'nn',
] as const;
export type AlignmentTuple = typeof ALIGNMENTS;
export type Alignment = AlignmentTuple[number];

export const LAWFULNESS_RANGE = [
  'lx',
  'cx',
  'nx',
] as const;
export type LawfulnessTuple = typeof LAWFULNESS_RANGE;
export type Lawfulness = LawfulnessTuple[number];

export const GOODNESS_RANGE = [
  'xg',
  'xe',
  'xn',
] as const;
export type GoodnessTuple = typeof GOODNESS_RANGE;
export type Goodness = GoodnessTuple[number];

export type Level = number;

export type StatsTuple = AbilityScoreTuple
  | AlignmentTuple
  | RaceTuple
  | ClassTuple
  | GoodnessTuple
  | LawfulnessTuple;

export type Stat = ClassName | Race | AbilityScore | Alignment | Lawfulness | Goodness | 'level'
export type STATS = typeof ABILITY_SCORES | typeof CLASSES;

export enum ScoreTypes {
  races = 'races',
  classes = 'classes',
  abilityScores = 'abilityScores',
  alignments = 'alignments',
  lawfulness = 'lawfulness',
  goodness = 'goodness',
  level = 'level',
}

export type AbilityScoreScores = {
  [key in AbilityScore]: number;
}

export type RaceScores = {
  [key in Race]: number;
}

export type ClassScores = {
  [key in ClassName]: number;
}

export type AlignmentScores = {
  [key in Alignment]: number;
}

export type LawfulnessScores = {
  [key in Lawfulness]: number;
}

export type GoodnessScores = {
  [key in Goodness]: number;
}

export type StatScores = {
  [key in Stat]?: number;
}

export type Score = AbilityScoreScores
  | RaceScores
  | ClassScores
  | AlignmentScores
  | LawfulnessScores
  | GoodnessScores

export type Scores = {
  [ScoreTypes.races]: RaceScores;
  [ScoreTypes.classes]: ClassScores;
  [ScoreTypes.abilityScores]: AbilityScoreScores;
  [ScoreTypes.alignments]: AlignmentScores;
  [ScoreTypes.lawfulness]: LawfulnessScores;
  [ScoreTypes.goodness]: GoodnessScores;
  [ScoreTypes.level]: number;
}

export type ResultScore = {
  label: string;
  key: Stat;
  score: number;
}

export type MappedModifiers = {
  [key in ScoreTypes]: Modifier[]
}

// export type CharacterClass = {
//   name: ClassName;
//   level: number;
// }

export type Character = {
  race: Race;
  class: ClassName[];
  level: number;
  abilityScores: {
    [key in AbilityScore]: number
  };
  alignment: Alignment;
}

export type Details = {
  name: string;
  details: string;
}

export type ScoreDetails = {
  key: Stat;
  score: number;
  title: string;
  percentage: number;
}

export type StatDetails = {
  [key in Stat]?: Details;
}
