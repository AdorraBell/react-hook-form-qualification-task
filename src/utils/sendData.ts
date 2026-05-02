/* mock API request used because I don't have real backend,
 randomly returns success or error responses to demonstrate loading states and error handling in the UI */

import { FormDataType } from '../types';

const SUCCESS_RATE = 0.75;

export const sendData = async (
  data: FormDataType,
  delay = 1000,
): Promise<{ status: number; data: FormDataType }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const status = Math.random() < SUCCESS_RATE ? 200 : 500;

      resolve({
        status,
        data,
      });
    }, delay);
  });
};
