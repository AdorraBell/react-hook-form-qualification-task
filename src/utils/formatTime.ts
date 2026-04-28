export const formatTime = (value?: Date | null): string | null => {
  if (!value) return null;
  return value.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
