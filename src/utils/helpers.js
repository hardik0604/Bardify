export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const copyToClipboard = async (text) => {
  if (!navigator.clipboard) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};
