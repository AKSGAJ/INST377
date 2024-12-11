let chart;
async function getData(){
    temp = [];
    dates = [];
    await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m')
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);
      temp = resJson.hourly.temperature_2m.slice(0, 101);
      dates = resJson.hourly.time.slice(0, 101);

      //console.log(data)
    })

    return {
        temp: temp,
        dates: dates
    };
}

async function makeChart(){
    
    const data = await getData()
    const dates = data.dates;
    const numbers = data.temp;

    console.log(dates)
    console.log(numbers)

    // console.log("Data List", numbers)
    // for (let i=0; i < range; i++){
    //     const date = new Date();
    //     date.setDate(date.getDate() - i);
    //     dates.push(date.toLocaleDateString("en-US"));
    // };

    
    const ctx = document.getElementById('myChart');
    let maximum = Math.max(numbers);
    let minimum = Math.min(numbers);


    //var newChart = new Chart(ctx, 
    configuration = {
        type: 'line',
        data: {
        labels: dates,
        datasets: [{
            label: 'Stock',
            data: numbers,
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            min: minimum,
            max: maximum
            }
        }
        }
    };

   
    
    if (chart) {
        console.log("Hello")
        chart.destroy();
        chart = new Chart(ctx, configuration);
    } else {
        chart = new Chart(ctx, configuration);
    }

    event.preventDefault();
}


window.onload = function(){
    makeChart();
}