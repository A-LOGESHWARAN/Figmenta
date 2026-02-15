export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateBookmark(data, isUpdate = false) {
  const { url, title, description = "", tags = [] } = data;

  if (!isUpdate && (!url || !title)) {
    return "URL and title are required";
  }

  if (url && !isValidURL(url)) {
    return "Invalid URL format";
  }

  if (title && title.length > 200) {
    return "Title must be under 200 characters";
  }

  if (description && description.length > 500) {
    return "Description must be under 500 characters";
  }

  if (tags && tags.length > 5) {
    return "Maximum 5 tags allowed";
  }

  return null;
}
