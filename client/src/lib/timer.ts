export default function timer(time: Date) {
  const uploadTime = new Date(time);
  const time_diff = Math.abs(Date.now() - uploadTime.getTime()) / 1000;
  const secs = Math.floor(((time_diff % 86400) % 3600) % 60);
  const minuites = Math.floor(((time_diff % 86400) % 3600) / 60);
  const hours = Math.floor((time_diff % 86400) / 3600);
  const days = Math.floor(((time_diff % 31556926) % 2629743) / 86400);
  const months = Math.floor((time_diff % 31556926) / 2629743);
  const years = Math.floor(time_diff / 31556926);
  let timepassed = "";

  if (years > 0) {
    timepassed = years > 1 ? `${years} years ago` : `${years} year ago`;
  } else if (months > 0) {
    timepassed = months > 1 ? `${months} months ago` : `${months} month ago`;
  } else if (days > 0) {
    timepassed = days > 1 ? `${days} days ago` : `${days} day ago`;
  } else if (hours > 0) {
    timepassed = hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
  } else if (minuites > 0) {
    timepassed =
      minuites > 1 ? `${minuites} minuites ago` : `${minuites} minuite ago`;
  } else if (secs >= 0) {
    timepassed = secs > 1 ? `${secs} secs ago` : `${secs} sec ago`;
  } else {
    return "something went wrong!";
  }

  return timepassed;
}

