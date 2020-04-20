'use strict';

const fs = require('fs');

const api = require('../../server/server');
const version = require('../../server/config.local');
const config = require('../../common/config/google-storage');

const tmpdir = './test/tmp/'; // should match /server/datasources.test.json

describe('When working with uploaded files to test', () => {
  before(() => {
    config.container_upload.enum.forEach((bucket) => {
      if (!fs.existsSync(tmpdir + config.container_upload[bucket])) {
        fs.mkdirSync(tmpdir + config.container_upload[bucket]);
      }
    });
  });

  after(() => {
  });

  it('should have the iati-testdatasets endpoint', (done) => {
    chai.request(api)
      .get(`${version.restApiRoot}/iati-testdatasets/`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it(
    'shouldn\'t handle uploading a small file into a container',
    (done) => {
      chai.request(api)
        .post(
          `${
            version.restApiRoot
          }/iati-testfiles/${config.container_upload.source}/upload`
        )
        .attach('files', fs.readFileSync('./test/fixtures/file-small.xml'),
          'file-small.xml')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    }
  );

  it('should handle uploading a large file as source', (done) => {
    chai.request(api)
      .post(`${version.restApiRoot}/iati-testfiles/file/source`)
      .attach('files', fs.readFileSync('./test/fixtures/file-large.xml'),
        'file-large.xml')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('shouldn\'t handle uploading a small file as source', (done) => {
    chai.request(api)
      .post(`${version.restApiRoot}/iati-testfiles/file/source`)
      .attach('files', fs.readFileSync('./test/fixtures/file-small.xml'),
        'file-small.xml')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('shouldn\'t handle uploading a small file as feedback', (done) => {
    chai.request(api)
      .post(`${version.restApiRoot}/iati-testfiles/file/feedback`)
      .attach('files', fs.readFileSync('./test/fixtures/file-small.xml'),
        'file-small.xml')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('shouldn\'t handle uploading a small file as json', (done) => {
    chai.request(api)
      .post(`${version.restApiRoot}/iati-testfiles/file/json`)
      .attach('files', fs.readFileSync('./test/fixtures/file-small.xml'),
        'file-small.xml')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('shouldn\'t handle uploading a small file as svrl', (done) => {
    chai.request(api)
      .post(`${version.restApiRoot}/iati-testfiles/file/svrl`)
      .attach('files', fs.readFileSync('./test/fixtures/file-small.xml'),
        'file-small.xml')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
