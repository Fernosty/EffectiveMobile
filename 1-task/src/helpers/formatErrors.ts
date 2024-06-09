import { ValidationError } from 'class-validator';

interface IError {
    type: string;
    messages: string[];
}

export const formatErrors = (errors: ValidationError[]) => {
    const updatedErrors: IError[] = [];

    errors.forEach(e => {
        if (e.constraints) {
            const error: IError = {
                type: e.property,
                messages: Object.values(e.constraints),
            };
            updatedErrors.push(error);
        }
    });

    return updatedErrors;
};
