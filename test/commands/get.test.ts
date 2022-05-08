import { expect, test } from '@oclif/test';

describe('get', () => {
  test
    .stdout()
    .command(['get'])
    .it('should print ios version and build number', ctx => {
      expect(ctx.stdout).to.contain('hello world');
    });

  test
    .stdout()
    .command(['get', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff');
    });
});
