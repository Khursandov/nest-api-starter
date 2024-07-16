import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { i18nValidationMessage } from 'nestjs-i18n';

export class BasePagination {
  @IsNumber(
    {},
    {
      message: i18nValidationMessage('validation.IS_NUMBER'),
    },
  )
  @Min(5, {
    message: i18nValidationMessage('validation.MIN'),
  })
  @Transform((value) => {
    return Number(value.value);
  })
  @IsOptional({
    message: i18nValidationMessage('validation.IS_OPTIONAL'),
  })
  limit?: number;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage('validation.IS_NUMBER'),
    },
  )
  @Transform((value) => {
    return Number(value.value);
  })
  @IsOptional({
    message: i18nValidationMessage('validation.IS_OPTIONAL'),
  })
  offset?: number;

  @IsOptional({
    message: i18nValidationMessage('validation.IS_OPTIONAL'),
  })
  @IsString({
    message: i18nValidationMessage('validation.IS_STRING'),
  })
  sortField?: string;

  @IsOptional({
    message: i18nValidationMessage('validation.IS_OPTIONAL'),
  })
  @IsString({
    message: i18nValidationMessage('validation.IS_STRING'),
  })
  sortOrder?: string;

  @IsOptional({
    message: i18nValidationMessage('validation.IS_OPTIONAL'),
  })
  @IsString({
    message: i18nValidationMessage('validation.IS_STRING'),
  })
  search?: string;

  @IsOptional({
    message: i18nValidationMessage('validation.IS_OPTIONAL'),
  })
  @Transform((value) => {
    return value.value === 'true';
  })
  paginate?: boolean = true;
}
