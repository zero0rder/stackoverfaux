// Generate Random ID
export const generateRandomId = () =>
  Math.abs(~~(Math.random() * ~~(Math.random() * Date.now())));
