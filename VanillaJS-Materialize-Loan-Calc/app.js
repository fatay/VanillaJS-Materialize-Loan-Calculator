//Getting Inputs 
const loanInput     = document.querySelector('#loan');
const yearsInput    = document.querySelector('#years');
const interestInput = document.querySelector('#interest');
//Result Inputs (Readonly)
const monthlyPayment = document.querySelector('#monthly_payment');
const totalPayment   = document.querySelector('#total_payment');
const totalInterest  = document.querySelector('#total_interest');
//Listen for submit
document.querySelector('#calculateForm').addEventListener('submit', function(e) {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

function calculateResults(e) {
  
  let amount   = loanInput.value;
  let years    = yearsInput.value;
  let interest = interestInput.value;

  let principal = parseFloat(amount);  
  let calculatedInterest = parseFloat(interest) /100 /12;
  let calculatedPayments = parseFloat(years) * 12;

  let x = Math.pow(1 + calculatedInterest, calculatedPayments);
  let monthly = (principal*x*calculatedInterest) / (x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

  } else {
    let toastHTML = '<span>Please check your numbers.</span>';
    M.toast({html: toastHTML, classes: 'red darken-1'})
    monthlyPayment.value = '';
    totalPayment.value = '';
    totalInterest.value = '';
  }


  document.getElementById('results').style.display = 'block';
  document.getElementById('loading').style.display = 'none';

  e.preventDefault();
}
