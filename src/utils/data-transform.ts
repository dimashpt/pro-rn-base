/**
 * Turns an object into formdata for submission.
 * @param obj - The object to convert to FormData.
 * @returns A FormData object containing the key-value pairs from the object.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
}
