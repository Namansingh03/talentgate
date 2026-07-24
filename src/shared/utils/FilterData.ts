export function filterData<T extends Record<string, T>>(
  data: T[],
  selectedFilter: string,
  selectedValue: string,
  filters: {
    id: string;
    accessor: keyof T;
  }[],
) {
  const activeFilter = filters.find((filter) => filter.id === selectedFilter);

  if (!activeFilter || selectedValue === "All") {
    return data;
  }

  return data.filter((item) => {
    return String(item[activeFilter.accessor]) === selectedValue;
  });
}
