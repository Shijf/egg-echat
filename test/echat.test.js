'use strict';

const mock = require('egg-mock');

describe('test/echat.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/echat-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, echat')
      .expect(200);
  });
});
