export function setupConsoleLog(element, log, text) {
  const execute = () => {
    log(text);
  }
  element.addEventListener('click', () => execute())
}
