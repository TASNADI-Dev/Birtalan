// Hides array add controls once the field reaches its max validation limit.
import {
  ArrayOfObjectsFunctions,
  type ArrayOfObjectsInputProps,
} from 'sanity';

type ValidationRule = {
  flag?: string;
  constraint?: number;
};

type ValidatableSchemaType = {
  validation?: Array<{ _rules?: ValidationRule[] }>;
};

function getMaxItems(schemaType: ValidatableSchemaType): number | undefined {
  const allRules =
    schemaType.validation?.flatMap((validation) => validation._rules ?? []) ??
    [];

  const maxRule = allRules.find(
    (rule) => rule.flag === 'max' || rule.flag === 'length',
  );

  return typeof maxRule?.constraint === 'number'
    ? maxRule.constraint
    : undefined;
}

function limitedArrayFunctions(
  props: Parameters<NonNullable<ArrayOfObjectsInputProps['arrayFunctions']>>[0],
) {
  const maxItems = getMaxItems(props.schemaType as ValidatableSchemaType);
  const total = props.value?.length ?? 0;

  if (maxItems !== undefined && total >= maxItems) {
    return null;
  }

  return <ArrayOfObjectsFunctions {...props} />;
}

export function ArrayWithMaxItems(props: ArrayOfObjectsInputProps) {
  return props.renderDefault({
    ...props,
    arrayFunctions: limitedArrayFunctions,
  });
}
