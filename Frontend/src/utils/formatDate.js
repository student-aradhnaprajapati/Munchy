export const formatDate = (date) => {
  if (!date) return "N/A";

  const d = new Date(date);
  if (isNaN(d)) return "Invalid Date";

  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDateOnly = (date) => {
  if (!date) return "N/A";

  const d = new Date(date);
  if (isNaN(d)) return "Invalid Date";

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
