const x = [
  {
    title: 'x',
    value: '1500',
    type: 'income'
  },
  {
    title: 'y',
    value: '2000',
    type: 'outcome'
  },
  {
    title: 'z',
    value: '1200',
    type: 'outcome'
  },
  {
    title: 'a',
    value: '1270',
    type: 'income'
  }
];

let income = 0;
let outcome = 0;
let total = 0;

x.reduce((acc, cur, idx) => {
  if(idx === 1){
    if(acc.type === 'income') { income += parseInt(acc.value) }
    else { outcome += parseInt(acc.value) }
  }

  if(cur.type === 'income') { income += parseInt(cur.value) }
  else { outcome += parseInt(cur.value) }
});

total = income - outcome;

console.log(income, outcome, total);
