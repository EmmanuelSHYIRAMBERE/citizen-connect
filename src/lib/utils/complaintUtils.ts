export function getComplaintCategory(text: string): string | undefined {
  const categories = [
    {
      keywords: ["road", "bridge", "construction"],
      category: "infrastructure",
    },
    { keywords: ["trash", "garbage", "waste"], category: "sanitation" },
    { keywords: ["bus", "taxi", "transport"], category: "transportation" },
    { keywords: ["crime", "police", "safety"], category: "safety" },
    { keywords: ["noise", "loud", "music"], category: "noise" },
  ];

  const lowerText = text.toLowerCase();
  const matchedCategory = categories.find(({ keywords }) =>
    keywords.some((keyword) => lowerText.includes(keyword))
  );

  return matchedCategory?.category;
}
