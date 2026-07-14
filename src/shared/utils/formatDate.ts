export function formatDate(): string {
  const d = new Date();

  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();

  const weekday = d.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const formattedDate = `${day}/${month}/${year}, ${weekday}`;

  return formattedDate;
}
