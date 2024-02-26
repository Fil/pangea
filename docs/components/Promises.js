export const Promises = {
  delay(t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }
};
