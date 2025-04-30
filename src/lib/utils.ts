export function formatMessageTime(date: Date) {
  const messageDate = new Date(date);
  const now = new Date();

  const isSameDay =
    messageDate.getFullYear() === now.getFullYear() &&
    messageDate.getMonth() === now.getMonth() &&
    messageDate.getDate() === now.getDate();

  if (isSameDay) {
    // Show time only 
    return messageDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } else {
    // Show date + time
    return messageDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
}
