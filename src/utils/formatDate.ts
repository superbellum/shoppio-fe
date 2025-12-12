export default function formatDate(dateStr: string, withTime: boolean = true) {
  const timeOpts = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  let options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  if (withTime) {
    options = {
      ...options,
      ...timeOpts,
    };
  }

  return new Intl.DateTimeFormat("en-GB", options as Intl.DateTimeFormatOptions).format(new Date(dateStr))
}
