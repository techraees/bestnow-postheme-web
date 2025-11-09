interface Year {
  id: number;
  name: string;
}

export const generateYears = (): Year[] => {
  const currentYear = new Date().getFullYear();
  const years: Year[] = [];
  for (let i = currentYear - 5; i <= currentYear; i++) {
    years.push({
      id: i,
      name: i.toString(), // or just i, depending on how you want to format it
    });
  }
  return years;
};
