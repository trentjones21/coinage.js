
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
      throw ('MoneyError: fromFloat requires a number. Recieved: ' + typeof num);
    }

    const numberOfDecimals = countDecimals(num);
    if (numberOfDecimals >= 3) {
      throw ('MoneyError: Number can have no more than 2 decimal places.  Recieved: ' + num);
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

  plus(other) {
    if (other instanceof Money) {
      return new Money({
        cents: this.cents + other.cents
      })
    } else {
      throw ('MoneyError: You must add another instance of type Money.  Recieved: ' + typeof other);
    }
  }

  minus(other) {
    if (other instanceof Money) {
      return new Money({
        cents: this.cents - other.cents
      })
    } else {
      throw ('MoneyError: You must subtract another instance of type Money.  Recieved: ' + typeof other);
    }
  }

  times(other) {
    if (typeof other === 'number') {
      return new Money({
        cents: round(this.cents * other)
      })
    } else {
      throw ('MoneyError: You must subtract another instance of type Number.  Recieved: ' + typeof other);
    }
  }

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

  greaterThan(other) {
    if (other instanceof Money) {
      return this.cents > other.cents;
    } else {
      throw ('MoneyError: You must compare another instance of type Money.  Recieved: ' + typeof other);
    }
  }

  greaterThanOrEqual(other) {
    if (other instanceof Money) {
      return this.cents >= other.cents;
    } else {
      throw ('MoneyError: You must compare another instance of type Money.  Recieved: ' + typeof other);
    }
  }

  lessThan(other) {
    if (other instanceof Money) {
      return this.cents < other.cents;
    } else {
      throw ('MoneyError: You must compare another instance of type Money.  Recieved: ' + typeof other);
    }
  }

  lessThanOrEqual(other) {
    if (other instanceof Money) {
      return this.cents <= other.cents;
    } else {
      throw ('MoneyError: You must compare another instance of type Money.  Recieved: ' + typeof other);
    }
  }
}

module.exports = Money;
