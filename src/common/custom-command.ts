import { Command, Flags } from '@oclif/core';
import CustomError from './custom-error';
import JsonError from './json-error';
import JsonResult from './json-result';

export default abstract class CustomCommand extends Command {
  static enableJsonFlag = true;

  static args = [{ name: 'dir', description: 'Capacitor project root directory', required: false, default: './' }];
  static flags = {
    version: Flags.string({ char: 'v', description: 'Set specific version', helpValue: 'x.x.x', required: true }),
    build: Flags.integer({ char: 'b', description: 'Set specific build', helpValue: '10', required: true }),
  };

  protected toSuccessJson(result: object): JsonResult {
    return { status: 'success', ...result };
  }

  protected toErrorJson(error: CustomError): JsonError {
    const result = {
      status: 'error',
      message: error.message,
      code: error.code,
      sugestions: error.suggestions,
    };

    return result;
  }
}
