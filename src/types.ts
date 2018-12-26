export interface Money {
  fromFloat(): Money;
  fromString(): Money;
  valueOf(): Number;
  toString(): String;
  toUsd(): String;
  plus(other: Money): Money;
  minus(other: Money): Money;
  times(other: Number): Money;
  divideBy(other: Number): Money;
  greaterThan(other: Money): Boolean;
  greaterThanOrEqual(other: Money): Boolean;
  lessThan(other: Money): Boolean;
  lessThanOrEqual(other: Money): Boolean;
  max(other: Money): Money;
  min(other: Money): Money;
}