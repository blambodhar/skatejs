import assign from '../util/assign';
import empty from '../util/empty';
import toNullOrString from '../util/to-null-or-string';

export function create (def) {
  return (...args) => {
    args.unshift({}, def);
    return assign(...args);
  };
}

const attribute = { source: true };
const parseIfNotEmpty = val => (empty(val) ? null : JSON.parse(val));

export const array = create({
  attribute,
  coerce: val => (Array.isArray(val) ? val : (empty(val) ? null : [val])),
  default: () => [],
  deserialize: parseIfNotEmpty,
  serialize: JSON.stringify
});

export const boolean = create({
  attribute,
  coerce: val => !!val,
  default: false,
  // TODO: 'false' string must deserialize to false for angular 1.x to work
  // This breaks one existing test.
  // deserialize: val => !(val === null || val === 'false'),
  deserialize: val => !(val === null),
  serialize: val => (val ? '' : null)
});

// defaults empty to 0 and allows NaN
const zeroIfEmptyOrNumberIncludesNaN = val => (empty(val) ? 0 : Number(val));

export const number = create({
  attribute,
  default: 0,
  coerce: zeroIfEmptyOrNumberIncludesNaN,
  deserialize: zeroIfEmptyOrNumberIncludesNaN,
  serialize: toNullOrString
});

export const string = create({
  attribute,
  default: '',
  coerce: toNullOrString,
  deserialize: toNullOrString,
  serialize: toNullOrString
});

export const object = create({
  attribute,
  default: () => ({}),
  deserialize: parseIfNotEmpty,
  serialize: JSON.stringify
});
