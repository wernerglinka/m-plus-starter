/**
 * Metalsmith Build Configuration
 *
 * All plugin wiring, filter loading, and dev server management is handled
 * by the m-plus wrapper. This file just points it at the project directory
 * and decides whether to build or watch based on command-line flags.
 *
 * Configuration lives in metalsmith-components.config.json.
 */

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import createSite from 'm-plus';

const thisFile = fileURLToPath(import.meta.url);
const thisDirectory = dirname(thisFile);

const site = createSite(thisDirectory);

/**
 * Run the build when this file is executed directly.
 * --watch flag triggers dev mode with BrowserSync live-reload.
 */
if (process.argv[1] === thisFile) {
  const isWatching = process.argv.includes('--watch');

  if (isWatching) {
    await site.watch();
  } else {
    await site.build();
  }
}

export default site;
