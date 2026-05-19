import { occupiedEmails } from '../const';

export const checkEmailAvailability = async (
  email: string,
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isOccupied = occupiedEmails.includes(email.toLowerCase());
      resolve(!isOccupied);
    }, 500);
  });
};
