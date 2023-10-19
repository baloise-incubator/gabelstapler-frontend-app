import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { setupError } from './error.js'
import { setupConsoleLog } from './consoleLog.js'
import { setupFetch } from './fetch.js'
import {
  ConsoleInstrumentation,
  ConsoleTransport,
  ErrorsInstrumentation,
  FetchTransport,
  initializeFaro,
  SessionInstrumentation,
  WebVitalsInstrumentation,
  ViewInstrumentation,
} from '@grafana/faro-web-sdk'
import { TracingInstrumentation } from '@grafana/faro-web-tracing'

const instrumentationOptions = {
  propagateTraceHeaderCorsUrls: [new RegExp('https:\\/\\/.*\\.apps.baloise.dev.*')], // This is a list of specific URIs or regular exprressions
};

const faro = initializeFaro({
  instrumentations: [
    new ErrorsInstrumentation(),
    new WebVitalsInstrumentation(),
    new ConsoleInstrumentation(),
    new SessionInstrumentation(),
    new ViewInstrumentation(),
    new TracingInstrumentation({ instrumentationOptions }),
  ],
  transports: [
    new FetchTransport({
      url: 'https://monitroing-stack-faro-agent-app-receiver.apps.baloise.dev/collect',
      apiKey: 'secret',
    }),
    new ConsoleTransport(),
  ],
  app: {
    name: 'gabelstapler-frontend-app',
    version: '1.0.0',
  },
});

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div class="card">
      <button id="error" type="button">Throw error</button>
    </div>
    <div class="card">
      <button id="console-log-warn" type="button">Console.log WARN</button>
      <button id="console-log-error" type="button">Console.log ERROR</button>
      <button id="console-log-info" type="button">Console.log INFO</button>
      <button id="console-log" type="button">Console.log LOG</button>
    </div>
    <div class="card">
      <button id="request" type="button">Request to gabelstapler-observability-app-1</button>
      <pre id="request-result">No result</pre>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
setupError(document.querySelector('#error'))
setupConsoleLog(document.querySelector('#console-log-info'), console.info, 'some info console log')
setupConsoleLog(document.querySelector('#console-log-warn'), console.warn, 'some warn console log')
setupConsoleLog(document.querySelector('#console-log-error'), console.error, 'some error console log')
setupConsoleLog(document.querySelector('#console-log'), console.log, 'some generic console log')
setupFetch(document.querySelector('#request'))
