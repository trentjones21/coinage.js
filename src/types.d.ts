export namespace Money {
  export function fromFloat(other: number): Money;
  export function fromString(other: string): Money;
  export function valueOf(other: Money): Number;
  export function toString(other: Money): String;
  export function toUsd(other: Money): String;
  export function plus(other: Money): Money;
  export function minus(other: Money): Money;
  export function times(other: Number): Money;
  export function divideBy(other: Number): Money;
  export function greaterThan(other: Money): Boolean;
  export function greaterThanOrEqual(other: Money): Boolean;
  export function lessThan(other: Money): Boolean;
  export function lessThanOrEqual(other: Money): Boolean;
  export function max(other: Money): Money;
  export function min(other: Money): Money;
}