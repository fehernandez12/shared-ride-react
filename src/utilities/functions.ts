function convertToBlob(object: any) {
  return new Blob([JSON.stringify(object)], { type: 'application/json' });
}