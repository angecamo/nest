import { FileValidator } from './file-validator.interface';

export type MaxFileSizeValidatorOptions = {
  maxSize: number;
  message?: string | ((file?: any) => string);
};

/**
 * Defines the built-in MaxSize File Validator
 *
 * @see [File Validators](https://docs.nestjs.com/techniques/file-upload#file-validation)
 *
 * @publicApi
 */
export class MaxFileSizeValidator extends FileValidator<MaxFileSizeValidatorOptions> {
  buildErrorMessage(file: any): string {
    if ('message' in this.validationOptions) {
      if (typeof this.validationOptions.message === 'function') {
        return this.validationOptions.message(file);
      }

      return this.validationOptions.message;
    }

    return `Validation failed (expected size is less than ${this.validationOptions.maxSize})`;
  }

  public isValid(file: any): boolean {
    if (!this.validationOptions) {
      return true;
    }

    return file.size < this.validationOptions.maxSize;
  }
}
