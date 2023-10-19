export function setupFetch(element) {
  const faro = window.faro;
  const { trace, context } = faro.api.getOTEL();
  const tracer = trace.getTracer('default');

  let resultElement = document.querySelector('#request-result')

  const makeRequest = () => {
    const span = tracer.startSpan('request-to-backend-app');
    context.with(trace.setSpan(context.active(), span), () => {
      resultElement.innerHTML = 'loading...'
      fetch("https://gabelstapler-observability-app-1.apps.baloise.dev/endpoint").then(result => {
        result.text().then(text => {
          resultElement.innerHTML = text
          span.end()
        });
      }).catch(err => {
        resultElement.innerHTML = err
      });
    });
  }
  element.addEventListener('click', () => makeRequest())
}
