import 'reflect-metadata';

export const NoNeedLogin = (): MethodDecorator => {
    return (target, key, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata('NoNeedLogin', true, descriptor.value);
        return descriptor;
    };
};
