// import { formatDistanceToNow } from "date-fns";

// const formatTime = (createdAt) => {
//   const date = new Date(createdAt);

//   // const pakistanTime = new Date(date.getTime() + 5 * 60 * 60 * 1000);
//   const pakistanTime = new Date(date.getTime());

//   const timeAgo = formatDistanceToNow(pakistanTime, { addSuffix: true });

//   return timeAgo;
// };

// export default formatTime;

import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
} from "date-fns";

const formatTime = (createdAt: string | Date): string => {
  const now = new Date();
  const date = new Date(createdAt);

  const diffInMinutes = differenceInMinutes(now, date);
  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = differenceInHours(now, date);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = differenceInDays(now, date);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  const diffInWeeks = differenceInWeeks(now, date);
  return `${diffInWeeks}w ago`;
};

export default formatTime;
