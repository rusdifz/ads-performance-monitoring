import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager, FindOneOptions, Not } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entityClass, entityProperty] = args.constraints;
    const repositorys = this.entityManager.getRepository(entityClass);

    const where: FindOneOptions = {
      where: { [entityProperty]: value },
    };

    if (args.object['id']) {
      where.where['id'] = Not(args.object['id']);
    }

    const foundEntity = await repositorys.findOne(where);

    return !foundEntity;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be unique`;
  }
}

export function IsUnique(
  entityClass: any,
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entityClass, field, validationOptions],
      validator: IsUniqueConstraint,
    });
  };
}
