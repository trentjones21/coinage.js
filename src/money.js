
function countDecimals (value) {
  if ((value % 1) != 0)
    return value.toString().split(".")[1].length;
  return 0;
};

function round (num) {
  return +(Math.round(num + "e+0")  + "e-0");
};

class Money {

  /**
  * @access private
  */
  constructor(config) {
    this.cents = config.cents;
  }

  /**
  * Create a Money object from a float that has less than 2 decimal places
  * @param {number} num - a float to create the Money object from
  * @example Money.fromFloat(4.54)
  * @return {Money}
  */
  static fromFloat(num) {
    if (typeof num !== 'number') {
      throw new Error('MoneyError: fromFloat requires a number. Recieved: ' + typeof num).stack;
    }

    const numberOfDecimals = countDecimals(num);
    if (numberOfDecimals >= 3) {
      throw new Error('MoneyError: Number can have no more than 2 decimal places.  Recieved: ' + num).stack;
    }

    return new Money({
      cents: num * 100
    })
  }

  /**
  * Create a Money object from a string that has less than 2 decimal places
  * @param {string} str - a string to create the Money object from
  * @example Money.fromString("4.54")
  * @return {Money}
  */
  static fromString(str) {
    if (typeof str !== 'string') {
      throw ('MoneyError: fromString requires a string. Recieved: ' + typeof str);
    }

    return this.fromFloat(parseFloat(str));
  }

  /**
  * Returns the amount of money in dollars, limited to 2 decimal places
  * @return {number}
  */
  valueOf() {
    return this.cents / 100;
  }

  /**
  * Returns the amount of money in dollars, limited to 2 decimal places
  * @return {number}
  */
  toString() {
    return String(this.valueOf());
  }

  /**
  * Returns the sum of 2 Money objects as a new money object
  * @param {Money} other - the money object you want to add
  * @return {Money}
  */
  plus(other) {
    if (other instanceof Money) {
      return new Money({
        cents: this.cents + other.cents
      })
    } else {
      throw ('MoneyError: You must add another instance of type Money.  Recieved: ' + typeof other);
    }
  }

  /**
  * Returns the difference of 2 Money objects as a new money object
  * @param {Money} other - the money object you want to subtract
  * @return {Money}
  */
  minus(other) {
    if (other instanceof Money) {
      return new Money({
        cents: this.cents - other.cents
      })
    } else {
      throw ('MoneyError: You must subtract another instance of type Money.  Recieved: ' + typeof other);
    }
  }

  /**
  * Returns the product of the Money objects times a number as a new Money object
  * @param {number} num - the number you want to multiply by
  * @return {Money}
  */
  times(other) {
    if (typeof other === 'number') {
      return new Money({
        cents: round(this.cents * other)
      })
    } else {
      throw ('MoneyError: You must subtract another instance of type Number.  Recieved: ' + typeof other);
    }
  }

  /**
  * Returns the result of the Money objects divided by a number as a new Money object
  * @param {number} num - the number you want to divide by
  * @return {Money}
  */
  dividedBy(other) {
    if (typeof other === 'number') {
      if (other === 0) {
        throw('MoneyError: Cannot divide by 0');
      }
      return new Money({
        cents: round(this.cents / other)
      })
    } else {
      throw ('MoneyError: You must subtract another instance of type Number.  Recieved: ' + typeof other);
    }
  }

  /**
  * Returns true if this Money object is greater than another
  * @param {Money} other - the money object you want to compare
  * @return {Money}
  */
  greaterThan(other) {
    if (other instanceof Money) {
      return this.cents > other.cents;
    } else {
      throw ('MoneyError: You must compare another instance of type Money.  Recieved: ' + typeof other);
    }
  }

  /**
  * Returns true if this Money object is greater than or equal to another
  * @param {Money} other - the money object you want to compare
  * @return {Money}
  */
  greaterThanOrEqual(other) {
    if (other instanceof Money) {
      return this.cents >= other.cents;
    } else {
      throw ('MoneyError: You must compare another instance of type Money.  Recieved: ' + typeof other);
    }
  }

  /**
  * Returns true if this Money object is less than another
  * @param {Money} other - the money object you want to compare
  * @return {Money}
  */
  lessThan(other) {
    if (other instanceof Money) {
      return this.cents < other.cents;
    } else {
      throw ('MoneyError: You must compare another instance of type Money.  Recieved: ' + typeof other);
    }
  }

  /**
  * Returns true if this Money object is less than or equal to another
  * @param {Money} other - the money object you want to compare
  * @return {Money}
  */
  lessThanOrEqual(other) {
    if (other instanceof Money) {
      return this.cents <= other.cents;
    } else {
      throw ('MoneyError: You must compare another instance of type Money.  Recieved: ' + typeof other);
    }
  }

  /**
  * Returns the max between two money objects
  * @param {Money} other - the other money object
  * @return {Money}
  */
  max(other) {
    if (other instanceof Money) {
      return this.cents > other.cents ? this : other;
    } else {
      throw ('MoneyError: You must compare another instance of type Money.  Recieved: ' + typeof other);
    }
  }

  /**
  * Returns the min between two money objects
  * @param {Money} other - the other money object
  * @return {Money}
  */
  min(other) {
    if (other instanceof Money) {
      return this.cents < other.cents ? this : other;
    } else {
      throw ('MoneyError: You must compare another instance of type Money.  Recieved: ' + typeof other);
    }
  }
}

module.exports = Money;
