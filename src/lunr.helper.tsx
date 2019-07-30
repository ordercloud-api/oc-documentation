import { ApiResource } from './OpenApi.service';
import lunr from 'lunr';
import STOP_WORDS from './stop-words.constants';

export const initializeIndex = (
  operations: any[],
  resources: ApiResource[]
): lunr.Index => {
  /**
   * See lunr documentation for details: https://lunrjs.com/docs/index.html
   * Splitting up the path because I found that it produces more accurate
   * results.
   */
  return lunr(function () {
    this.ref('operationId');
    this.field('summary');
    this.field('splitPath');
    this.field('description');
    this.field('resource');

    /**
     * Remove the default stop words filter in favor of our own modified version
     * that doesn't include "me", "my", "get", or "all". This will allow users to
     * search for "get" and still receive some results. Similarly, it will allow
     * users to search for things under Me and My stuff.
     *
     * Original values: https://github.com/olivernn/lunr.js/blob/56f571b11fc4c3e0b4f44c6e33889e3406e6d7f9/lib/stop_word_filter.js#L43-L163
     */
    this.pipeline.remove(lunr.stopWordFilter);
    // this.pipeline.remove(lunr.stemmer);
    // this.searchPipeline.remove(lunr.stemmer);
    const customStopWords = lunr.generateStopWordFilter(STOP_WORDS);
    lunr.Pipeline.registerFunction(customStopWords, 'customStopWords');
    this.pipeline.add(customStopWords);

    /*
     * We can probably take advantage of pipelines to weight certain search terms
     * more heavily - such as giving more weight to HTTP verbs like POST, PUT, CREATE, etc.
     *
     * See searchPipeline in Builder properties: https://lunrjs.com/docs/lunr.Builder.html
     */

    operations.forEach(operation => {
      const resource = resources.find(r => operation.tags[0] === r.name);
      this.add({
        operationId: operation.operationId,

        /**
         * Add resource name to the beginning of summary because it improves
         * search results on Me psuedo resource
         */
        summary: `${resource!!.name} ${operation.summary}`,

        /**
         * Add verb to the beginning of path array because for some reason it
         * improves the search results (instead of having verb as it's own token)
         */
        splitPath: [operation.verb, ...operation.path.split('/')],
        description: operation.description,
      });
    });
  });
};
