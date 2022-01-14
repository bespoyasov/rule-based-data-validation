/**
 * Basics for validation and functional rule composition:
 */
export type ValidationRule<T> = (data: T) => boolean;

type RequiresAll<T> = ValidationRule<T>;
type RequiresAny<T> = ValidationRule<T>;

export function all<T>(rules: List<ValidationRule<T>>): RequiresAll<T> {
  return (data) => rules.every((isValid) => isValid(data));
}

export function some<T>(rules: List<ValidationRule<T>>): RequiresAny<T> {
  return (data) => rules.some((isValid) => isValid(data));
}

/**
 * Returning error messages after the validation:
 */
export type ErrorMessage = string;
export type ErrorMessages<T> = Partial<Record<keyof T, ErrorMessage>>;
export type ValidationRules<T> = Partial<Record<keyof T, ValidationRule<T>>>;

type ValidationResult<TData> = {
  valid: boolean;
  errors: ErrorMessages<TData>;
};

export function createValidator<TData>(
  rules: ValidationRules<TData>,
  errors: ErrorMessages<TData>
) {
  return function validate(data: TData): ValidationResult<TData> {
    const result: ValidationResult<TData> = {
      valid: true,
      errors: {},
    };

    Object.keys(rules).forEach((key) => {
      const field = key as keyof TData;
      const validate = rules[field];

      if (!validate) return;
      if (!validate(data)) {
        result.valid = false;
        result.errors[field] = errors[field];
      }
    });

    return result;
  };
}
