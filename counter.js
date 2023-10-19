export function setupCounter(element) {
  const faro = window.faro;
  const { trace, context } = faro.api.getOTEL();
  const tracer = trace.getTracer('default');

  let counter = 0
  const setCounter = (count) => {
    const span = tracer.startSpan('counter');
    context.with(trace.setSpan(context.active(), span), () => {
      counter = count
      element.innerHTML = `count is ${counter}`
      span.end();
    });
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
