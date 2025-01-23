import { DateTime } from "luxon";

export const formatDate = (dateString: string) => {
  return DateTime.fromISO(dateString).toFormat("dd/MM/yyyy");
};
