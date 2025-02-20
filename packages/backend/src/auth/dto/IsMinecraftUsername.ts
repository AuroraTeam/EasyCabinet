import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsMinecraftUsername(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return (
            value.length >= 3 &&
            value.length <= 16 &&
            /^[a-zA-Z0-9_]+$/.test(value)
          );
        },
        defaultMessage: () => '"$value" is not a valid Minecraft username!',
      },
    });
  };
}
