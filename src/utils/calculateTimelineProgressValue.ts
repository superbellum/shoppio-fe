import moment from "moment";

export default function calculateTimelineProgressValue(startDateStr: string, endDateStr: string) {
  const start = moment(startDateStr);
  const end = moment(endDateStr);
  const now = moment();
  const clamped = moment.min(moment.max(now, start), end);
  const total = end.diff(start);
  const elapsed = clamped.diff(start);
  return Math.round((elapsed / total) * 100);
}
