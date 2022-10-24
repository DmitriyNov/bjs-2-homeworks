'use strict';

function solveEquation(a, b, c) {
  let arr;
  let discr = Math.pow(b, 2) - 4 * a * c;
  if (discr < 0) {
    arr = [];
  } else if (discr > 0) {
    arr = [(-b + Math.sqrt(discr) )/(2*a), (-b - Math.sqrt(discr) )/(2*a)];
  } else {
    arr = [-b/(2*a)];
  }
  return arr;
}

function calculateTotalMortgage(percent, contribution, amount, date) {
  let totalAmount;
  //проверка типа данных
  if (isNaN(percent)) {
    totalAmount = `Параметр "Процентная ставка" содержит неправильное значение "${percent}"`;
    return totalAmount;
  } else percent = +percent;
  if (isNaN(contribution)) {
    totalAmount = `Параметр "Начальный взнос" содержит неправильное значение "${contribution}"`;
    return totalAmount;
  } else contribution = +contribution;
  if (isNaN(amount)) {
    totalAmount = `Параметр "Общая стоимость" содержит неправильное значение "${amount}"`;
    return totalAmount;
  } else amount = +amount;
  //тело кредита
  let body = amount - contribution;
  //срок кредита (вообще не понял, как правильно считать, работает, когда округляешь в меньшую сторону)
  date = Date.parse(date);
  const current = Date.now();
  let term = Math.floor((date - current) / 2592000000);
  //ежемесячный платёж
  let monthly = body * ((percent / 100 / 12) + ((percent / 100 / 12) / ((((1 + (percent / 100 / 12)) ** term) - 1))))
  //сумма платежа
  totalAmount = monthly * term;
  totalAmount = +totalAmount.toFixed(2);
  return totalAmount;
}