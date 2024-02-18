var AIresponse ;
//hard coded modular db
const averageInfants = {
    feedCloths: 50,
    Life_insurance: 10,
    medicalCosts: 10,
    housingCosts: 0,
    Transport: 0,
    lifeActivities: 100,
    totalcost: 170 

}

const averageToddlers = {
    feedCloths: 110,
    Life_insurance: 10,
    medicalCosts: 10,
    housingCosts: 0,
    Transport: 0,
    lifeActivities: 100,
    totalcost: 230
}

const averageChildren = {
    feedCloths: 175,
    Life_insurance: 20,
    medicalCosts: 20,
    housingCosts: 0,
    Transport: 60,
    lifeActivities: 100,
    totalcost: 375

}

const averageTeenagers = {
    feedCloths: 250,
    Life_insurance: 35,
    medicalCosts: 40,
    housingCosts: 0,
    Transport: 100,
    lifeActivities: 100,
    totalcost: 525

}

const averageYoungAd = {
    feedCloths: 350,
    Life_insurance: 50,
    medicalCosts: 50,
    housingCosts: 1500,
    Transport: 240,
    lifeActivities: 200,
    totalcost: 2390

}

const averageMidAd = {
    feedCloths: 350,
    Life_insurance: 140,
    medicalCosts: 80,
    housingCosts: 1500,
    Transport: 300,
    lifeActivities: 100,
    totalcost: 2470

}

const averageElder = {
    feedCloths: 350,
    Life_insurance: 200,
    medicalCosts: 80,
    housingCosts: 2000,
    Transport: 150,
    lifeActivities: 50,
    totalcost: 2830

}

const averageYoAd2 = {
    feedCloths: 500,
    Life_insurance: 100,
    medicalCosts: 100,
    housingCosts: 2000,
    Transport: 500,
    lifeActivities: 300,
    totalcost: 3500

}

const averageMidAd2 = {
    feedCloths: 500,
    Life_insurance: 300,
    medicalCosts: 160,
    housingCosts: 2000,
    Transport: 600,
    lifeActivities: 150,
    totalcost: 3710

}

var currentUser = {
    totalcost: 0,
    income: 0,
    netgain: 0,
    //savings: 0,
}

window.onload = function() {
    currentUser.income = prompt('What is your monthly income?');
    currentUser.totalcost = prompt('What is your monthly expenditure?');
    

    const xValues = ["Food And Clothes", "Life Insurance", "Healthcare", "housingCosts" , "Transport", "Life Activities","Netgain_perc"];
    const yValues = pieChartPerc(averageMidAd);
    const barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145",
    "#f29999",
    "#00aba9"
    ];

    new Chart("myChart", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        title: {
        display: true,
        text: "World Wide Wine Production 2018"
        }
    }
    });


}


function canSpend(age) {
    if (age.totalcost >= income) {
        console.log('You are going in dept or net zero this month');
        currentUser.netgain += (currentUser.income - age.totalcost) //provide the amount of net negative dept you is in
    } else {
        currentUser.netgain += (currentUser.income - age.totalcost) //positive net gain
        //currentUser.savings += currentUser.income - currentUser.netgain
        pieChartPerc(age)
    }
    
}

function pieChartPerc(age) {
    //percentage of a piechart out of 360.
    feedCloth_perc = age.feedCloths / currentUser.income
    Life_insurance_perc = age.Life_insurance / currentUser.income
    medicalCosts_perc = age.medicalCosts / currentUser.income
    housingCosts_perc = age.housingCosts / currentUser.income
    Transport_perc = age.Transport / currentUser.income
    lifeActivities_perc = age.lifeActivities / currentUser.income
    Netgain_perc = currentUser.negtain/currentUser.income

    return [feedCloth_perc, Life_insurance_perc, medicalCosts_perc, housingCosts_perc, Transport_perc, lifeActivities_perc, Netgain_perc]
    
}

document.querySelector('.input-box').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default action (form submission, newline, etc.)
      document.getElementById("userInput").readOnly = true;     // Your code here...
      document.getElementById("AIResponse").innerHTML = "Thinking...";
      const inputValue = document.querySelector('.input-box').value; // Get the value of the input box
      fetch(`/run-ai?input=${encodeURIComponent(inputValue)}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.response[0].text.value);
          AIresponse = data.response[0].text.value;    
            DisplayAIResponse();
            document.getElementById("userInput").readOnly = false;
      })
    }
});





function DisplayAIResponse(){

    document.getElementById("AIResponse").innerHTML = AIresponse;

}



