'use strict';

// Data
const account1 = {
  owner: 'Rahul Kumar Verma',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-01T21:31:17.1782',
    '2019-11-02T21:31:17.1782',
    '2019-11-03T21:31:17.1782',
    '2019-11-04T21:31:17.1782',
    '2019-11-05T21:31:17.1782',
    '2019-11-06T21:31:17.1782',
    '2019-11-07T21:31:17.1782',
    '2019-11-08T21:31:17.1782',
  ],
  currency: 'INR',
  local: 'hi-IN',
};

const account2 = {
  owner: 'Vishwas Verma',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-09T21:31:17.1782',
    '2019-11-12T21:31:17.1782',
    '2019-11-13T21:31:17.1782',
    '2019-11-14T21:31:17.1782',
    '2019-11-15T21:31:17.1782',
    '2019-11-16T21:31:17.1782',
    '2019-11-17T21:31:17.1782',
    '2022-09-27T21:31:17.1782',
  ],
  currency: 'USD',
  local: 'en-US',
};

const account3 = {
  owner: 'Bathe Singh Bathistha',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-21T21:31:17.1782',
    '2019-11-22T21:31:17.1782',
    '2019-11-23T21:31:17.1782',
    '2019-11-24T21:31:17.1782',
    '2019-11-25T21:31:17.1782',
    '2019-11-26T21:31:17.1782',
    '2019-11-27T21:31:17.1782',
    '2019-11-28T21:31:17.1782',
  ],
  currency: 'INR',
  local: 'hi-IN',
};

const account4 = {
  owner: 'Bahut Jagah Hai',
  movements: [430, 1000, 700, 50, 900, -39, -290, 1000],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-10-01T21:31:17.1782',
    '2019-10-02T21:31:17.1782',
    '2019-10-03T21:31:17.1782',
    '2019-10-04T21:31:17.1782',
    '2019-10-05T21:31:17.1782',
    '2019-10-06T21:31:17.1782',
    '2019-10-07T21:31:17.1782',
    '2019-10-08T21:31:17.1782',
  ],
  currency: 'EUR',
  local: 'pt-PT',
};
const account5 = {
  owner: 'Aman Maurya',
  movements: [100, 250, -300, 1000, -350, 130, -70, 3300],
  interestRate: 1.2, // %
  pin: 5555,

  movementsDates: [
    '2019-01-01T21:31:17.1782',
    '2019-01-02T21:31:17.1782',
    '2019-01-03T21:31:17.1782',
    '2019-01-04T21:31:17.1782',
    '2019-01-05T21:31:17.1782',
    '2019-01-06T21:31:17.1782',
    '2019-01-07T21:31:17.1782',
    '2019-01-08T21:31:17.1782',
  ],
  currency: 'INR',
  local: 'hi-IN',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const loginSection = document.querySelector('.login');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnLogout = document.querySelector('.logout');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = function (date, locale) {
  const calcPassedDate = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcPassedDate(new Date(), date);
  // console.log(daysPassed);
  if (daysPassed == 0) return 'Today';
  if (daysPassed == 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurr = function (value, locale, curr) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: `${curr}`,
  }).format(value);
};
///Movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const showDate = formatMovementDate(date, acc.local);

    const formattedMov = formatCurr(mov, acc.local, acc.currency);

    const html = `
    <div class="movements__row">
       <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${showDate}</div>
       <div class="movements__value">${formattedMov}</div>
    </div> 
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// for back to the login page
const restart = function () {
  containerApp.style.display = 'none';
  btnLogout.style.display = 'none';
  loginSection.style.display = 'flex';
   labelWelcome.textContent = 'Log in to get started';
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedMov = formatCurr(acc.balance, acc.local, acc.currency);
  labelBalance.textContent = `${formattedMov}`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  //how much mony is deposited/cames
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = formatCurr(incomes, acc.local, acc.currency);

  //how much amount of total money is withdrew/rtransfered
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurr(Math.abs(out), acc.local, acc.currency);

  //interest rate
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((intr, i, arr) => intr >= 1)
    .reduce((acc, mov) => acc + mov);
  labelSumInterest.textContent = formatCurr(interest, acc.local, acc.currency);
};
// calcDisplaySummary(accounts);

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);
// console.log(accounts);   // check username of every element's object

const updateUI = function (cAcc) {
  //cAcc -> current/active account
  //display movements
  displayMovements(cAcc);

  //display balnace
  calcDisplayBalance(cAcc);

  //display summary
  calcDisplaySummary(cAcc);
};

const startLogOutTimer = function () {
  let time = 120;

  const dash = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      restart();
    }
    time--;
  };
  dash();
  const timer = setInterval(dash, 1000);
  return timer;
};
//Event Handler
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  //enter marte hi login
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.display = 'grid';
    
    const time = new Date();
    const options = {
      hour: 'numeric',
      min: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.local,
      options
    ).format(time);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);

    //
    loginSection.style.display = 'none';
    btnLogout.style.display = 'block';
  }
});

btnTransfer.addEventListener('click', function (e) {
  // e->event , its very useful woking with forms
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  // console.log(amount, reciverAcc);
  if (
    amount > 0 &&
    reciverAcc &&
    currentAccount.balance >= amount &&
    reciverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);
    //push transaction date
    currentAccount.movementsDates.push(new Date().toISOString());
    reciverAcc.movementsDates.push(new Date().toISOString());
    //Updating UI after the transfering Currency
    updateUI(currentAccount);

    //reset the timer per transaction
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function () {
      currentAccount.movements.push(Math.trunc(amount));
      // add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
      // reset timer per transaction
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    accounts.splice(index, 1);
    restart();
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

btnLogout.addEventListener('click', restart);
// Existing accounts
console.log(accounts);
