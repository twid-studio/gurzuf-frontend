const ukrainianMonths = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];

export const formatDate = (dateString) => {
  if (!dateString) return "";

  const dateObj = new Date(dateString);
  const currentYear = new Date().getFullYear();
  const dateYear = dateObj.getFullYear();
  
  const day = dateObj.getDate();
  const month = ukrainianMonths[dateObj.getMonth()];
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  // Include year if it's different from current year
  const yearPart = dateYear !== currentYear ? ` ${dateYear}` : "";

  return `${day} ${month}${yearPart}, ${hours}:${minutes}`;
};
