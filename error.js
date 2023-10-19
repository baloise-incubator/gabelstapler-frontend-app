export function setupError(element) {
  const raiseError = () => {
    throw new Error('Throw new error with random data');
  }
  element.addEventListener('click', () => raiseError())
}
