import states from "../constants/states";
import categories from "../constants/categories";
import staticEntranceExams from "../constants/entranceExam";
import citiesByState from "../constants/cities";
import staticCourses from "../constants/courses";

export interface ParsedFilters {
  category?: string;
  course?: string;
  entranceExam?: string;
  state?: string;
  city?: string;
  owner?: string;
}

/** Calculate string similarity using Levenshtein distance ratio */
function similarity(a: string, b: string): number {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  return (longerLength - editDistance(longer, shorter)) / longerLength;
}

/** Compute Levenshtein edit distance */
function editDistance(s1: string, s2: string): number {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  const costs: number[] = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

/** Fuzzy match an input string to a list of options based on similarity threshold */
function fuzzyMatch(input: string, options: string[], threshold = 0.75): string | undefined {
  const words = input.toLowerCase().split(/\s+/);
  let bestMatch: string | undefined;
  let bestScore = 0;

  for (const option of options) {
    const optionLower = option.toLowerCase();

    for (let i = 0; i < words.length; i++) {
      for (let len = 1; len <= 3 && i + len <= words.length; len++) {
        const phrase = words.slice(i, i + len).join(" ");

        if (phrase === optionLower) {
          return option;
        }

        const score = similarity(phrase, optionLower);
        const minScore = optionLower.length <= 4 ? 0.88 : threshold;

        if (score > bestScore && score >= minScore) {
          bestScore = score;
          bestMatch = option;
        }
      }
    }
  }

  return bestMatch;
}

/** Main parse function */
export default function parseSeoPath(input: string, dynamicCourses: string[]): ParsedFilters {
  const filters: ParsedFilters = {};
  const lowerInput = input.toLowerCase();

  // Match state and city
  filters.state = fuzzyMatch(input, states);
  if (filters.state && citiesByState[filters.state]) {
    filters.city = fuzzyMatch(input, citiesByState[filters.state]);
  }

  // Match category
  filters.category = fuzzyMatch(input, categories);

  // Match course using dynamic list first
  const matchedCourseSlug = fuzzyMatch(input, dynamicCourses);
  const matchedCourse = staticCourses.find((c) => c.slug === matchedCourseSlug);
  if (matchedCourse) {
    filters.course = matchedCourse.slug;
  }
console.log(filters)
  // Match entrance exam by name
  const matchedExamName = fuzzyMatch(input, staticEntranceExams.map((e) => e.name));
const matchedExam = staticEntranceExams.find((e) => e.name === matchedExamName);
if (matchedExam) {
  filters.entranceExam = matchedExamName; // ✅ store slug like courses
}

  // Match owner type
  if (/\b(private|pvt)\b/.test(lowerInput)) filters.owner = "Private";
  else if (/\b(government|govt|gov)\b/.test(lowerInput)) filters.owner = "Government";
  else if (/\b(public)\b/.test(lowerInput)) filters.owner = "Public";

  return filters;
}
