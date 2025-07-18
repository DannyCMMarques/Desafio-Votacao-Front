import type { Status } from '../../interfaces/componentInterface';

export const handleStatus = (status: Status): string => {
  return status
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, (l) => l.toUpperCase());
};
