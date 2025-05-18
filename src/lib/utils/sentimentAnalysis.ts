export function analyzeSentiment(text: string): string {
  const positiveWords = ["good", "great", "excellent", "happy", "thanks"];
  const negativeWords = ["bad", "poor", "terrible", "angry", "complaint"];

  const words = text.toLowerCase().split(/\s+/);
  const positiveCount = words.filter((word) =>
    positiveWords.includes(word)
  ).length;
  const negativeCount = words.filter((word) =>
    negativeWords.includes(word)
  ).length;

  if (positiveCount > negativeCount) return "positive";
  if (negativeCount > positiveCount) return "negative";
  return "neutral";
}
