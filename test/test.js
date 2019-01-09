const expect = require('chai').expect;
const Money = require('../src');

describe('Testing money.js', function() {
  it('should instantiate from a 2 decimal float', () => {
    expect(Money.fromFloat(5.55).valueOf()).to.equal(5.55);
  });

  it('should instantiate from a 1 decimal float', () => {
    expect(Money.fromFloat(5.5).valueOf()).to.equal(5.5);
  });

  it('should instantiate from a 0 decimal float', () => {
    expect(Money.fromFloat(5).valueOf()).to.equal(5.0);
  });

  it('should not instantiate from a >= 3 decimal float', () => {
    expect(() => Money.fromFloat(5.102)).to.throw('MoneyError');
  });

  it('should not instantiate from anything besides a number', () => {
    expect(() => Money.fromFloat({})).to.throw('MoneyError');
    expect(() => Money.fromFloat('5.55')).to.throw('MoneyError');
    expect(() => Money.fromFloat(Money.fromFloat(5.55))).to.throw('MoneyError');
  });

  it('should allow instantiation from string', () => {
    expect(Money.fromString('5.55').valueOf()).to.equal(5.55);
  });

  it('should do correct addition', () => {
    const a = Money.fromFloat(5.55);
    const b = Money.fromFloat(1.05);
    expect(a.plus(b).valueOf()).to.equal(6.6);

    const c = Money.fromFloat(0.1);
    const d = Money.fromFloat(0.2);
    expect(c.plus(d).valueOf()).to.equal(0.3);
  });

  it('should not do addition with the wrong type', () => {
    const a = Money.fromFloat(5.55);
    expect(() => a.plus({}).valueOf()).to.throw('MoneyError');
    expect(() => a.plus(1.05).valueOf()).to.throw('MoneyError');
    expect(() => a.plus(undefined).valueOf()).to.throw('MoneyError');
  });

  it('should do correct subtraction', () => {
    const a = Money.fromFloat(5.55);
    const b = Money.fromFloat(1.05);
    expect(a.minus(b).valueOf()).to.equal(4.5);

    const c = Money.fromFloat(0.1);
    const d = Money.fromFloat(0.1);
    expect(c.minus(d).valueOf()).to.equal(0.0);
  });

  it('should not do subtraction with the wrong type', () => {
    const a = Money.fromFloat(5.55);
    expect(() => a.minus({}).valueOf()).to.throw('MoneyError');
    expect(() => a.minus(1.05).valueOf()).to.throw('MoneyError');
    expect(() => a.minus(undefined).valueOf()).to.throw('MoneyError');
  });

  it('should do correct multiplication', () => {
    const a = Money.fromFloat(5.55);
    expect(a.times(2).valueOf()).to.equal(11.1);

    const b = Money.fromFloat(0.1);
    expect(b.times(0).valueOf()).to.equal(0.0);

    const c = Money.fromFloat(1.0);
    expect(c.times(1.115).valueOf()).to.equal(1.12);

    const d = Money.fromFloat(1.11);
    expect(d.times(1).valueOf()).to.equal(1.11);
  });

  it('should not do multiplication with the wrong type', () => {
    const a = Money.fromFloat(5.55);
    const b = Money.fromFloat(5.55);
    expect(() => a.times(b).valueOf()).to.throw('MoneyError');
    expect(() => a.times({}).valueOf()).to.throw('MoneyError');
    expect(() => a.times(undefined).valueOf()).to.throw('MoneyError');
  });

  it('should do correct division', () => {
    const a = Money.fromFloat(5.5);
    expect(a.dividedBy(2).valueOf()).to.equal(2.75);

    const b = Money.fromFloat(5.51);
    expect(b.dividedBy(2).valueOf()).to.equal(2.76);
  });

  it('should not do division with the wrong type', () => {
    const a = Money.fromFloat(5.55);
    const b = Money.fromFloat(5.55);
    expect(() => a.dividedBy(b).valueOf()).to.throw('MoneyError');
    expect(() => a.dividedBy({}).valueOf()).to.throw('MoneyError');
    expect(() => a.dividedBy(undefined).valueOf()).to.throw('MoneyError');
  });

  it('should throw error on divide by 0', () => {
    const a = Money.fromFloat(5.55);
    expect(() => a.dividedBy(0).valueOf()).to.throw('MoneyError');
  });

  it('should have a correct valueOf', () => {
    const a = Money.fromFloat(5.55);
    expect(a.valueOf()).to.equal(5.55);
  });

  it('should have a correct toString', () => {
    const a = Money.fromFloat(5.55);
    expect(a.toString()).to.equal('5.55');
  });

  it('should correctly compare', () => {
    const a = Money.fromFloat(5);
    const b = Money.fromFloat(6);
    const c = Money.fromFloat(6);
    const d = Money.fromFloat(7);

    expect(a.lessThan(b)).to.equal(true);
    expect(a.lessThanOrEqual(b)).to.equal(true);
    expect(a.greaterThan(b)).to.equal(false);
    expect(a.greaterThanOrEqual(b)).to.equal(false);

    expect(b.lessThan(c)).to.equal(false);
    expect(b.lessThanOrEqual(c)).to.equal(true);
    expect(b.greaterThan(c)).to.equal(false);
    expect(b.greaterThanOrEqual(c)).to.equal(true);
  });

  it('should correctly return the max value', () => {
    const a = Money.fromFloat(5);
    const b = Money.fromFloat(6);
    const c = Money.fromFloat(6);
    expect(a.max(b)).to.deep.equal(b);
    expect(b.max(a)).to.deep.equal(b);
    expect(b.max(c)).to.deep.equal(b);
    expect(b.max(c)).to.deep.equal(c);
  });

  it('should correctly return the min value', () => {
    const a = Money.fromFloat(5);
    const b = Money.fromFloat(6);
    const c = Money.fromFloat(6);
    const d = Money.fromFloat(500);
    const e = Money.fromFloat(1000);

    expect(a.min(b)).to.deep.equal(a);
    expect(b.min(a)).to.deep.equal(a);
    expect(b.min(c)).to.deep.equal(b);
    expect(b.min(c)).to.deep.equal(c);
    expect(d.min(e)).to.deep.equal(d);
  });

  it('should get a correcly formatted money string', () => {
    expect(Money.fromFloat(2342.22).toUsd()).to.equal('$2,342.22');
    expect(Money.fromFloat(-2342.22).toUsd()).to.equal('-$2,342.22');
    expect(Money.fromFloat(0).toUsd()).to.equal('$0.00');
    expect(Money.fromFloat(1000000000).toUsd()).to.equal('$1,000,000,000.00');
  });
});
