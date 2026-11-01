import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { App } from './app/App';
import { startApplication } from './app/controller';

// A small programmatic API supports embedding and browser integration checks.
// Application components import modules and never read this browser namespace.
export {
  getSnapshot,
  getCatalog,
  getToolDefinition,
  navigate,
  changeStep,
} from './app/controller';
export { hrefTopic, hrefTool } from './navigation/routes';

startApplication();
const root = createRoot(document.getElementById('root')!);
flushSync(() => root.render(<App />));
