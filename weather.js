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

    const ctx = document.getElementById('myChart');
    let maximum = Math.max(numbers);
    let minimum = Math.min(numbers);

    maximum = maximum + 2;
    minimum = minimum - 2;

    configuration = {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Temperature',
                data: numbers,
                borderWidth: 2,
                borderColor: '#1E90FF',  // Blue line color
                backgroundColor: 'rgba(30, 144, 255, 0.2)',  // Light blue background
                pointBackgroundColor: '#1E90FF'  // Blue points
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    ticks: {
                        display: true,
                        color: 'black',// Black tick labels on x-axis
                        title: {
                            display: true,
                            text: 'Time',
                            color: 'black',
                            font: {
                                family: 'Arial',
                                size: 20,
                                weight: 'bold'  // Bold text for x-axis labels
                            }
                        },
                        font: {
                            weight: 'bold'  // Bold text for x-axis labels
                        }
                    },
                    grid: {
                        color: 'black',  // Black grid lines for contrast
                        borderDash: [5, 5],  // Optional: dashed grid lines
                    }
                },
                y: {
                    ticks: {
                        color: 'black',  // Black tick labels on y-axis
                        font: {
                            weight: 'bold'  // Bold text for y-axis labels
                        }
                    },
                    grid: {
                        color: 'black',  // Black grid lines for contrast
                        borderDash: [5, 5],  // Optional: dashed grid lines
                    },
                    min: minimum,
                    max: maximum + 2
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#FFFFFF',  // White legend text
                        font: {
                            weight: 'bold'  // Bold text for legend
                        }
                    }
                }
            },
            layout: {
                padding: 20
            },
            backgroundColor: 'black'  // Dark background for chart area
        }
    };

    if (chart) {
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

  maptilersdk.config.apiKey = 'S3e8Gh3icLKzeUp1iSs5';
      const map = (window.map = new maptilersdk.Map({
        container: 'map', // container's id or the HTML element to render the map
        style: maptilersdk.MapStyle.BACKDROP,  // stylesheet location
        zoom: 3,
        center: [-94.77, 38.57],
      }));

      const timeTextDiv = document.getElementById("time-text");
      const pointerDataDiv = document.getElementById("pointer-data");
      let pointerLngLat = null;

      const weatherLayer = new maptilerweather.TemperatureLayer({
        colorramp: maptilerweather.ColorRamp.builtin.TEMPERATURE_3
      });

      map.on('load', function () {
        map.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.4)");
        map.addLayer(weatherLayer, 'Water');
        weatherLayer.animateByFactor(3600);
      });

      map.on('mouseout', function(evt) {
        if (!evt.originalEvent.relatedTarget) {
          pointerDataDiv.innerText = "";
          pointerLngLat = null;
        }
      });

      // Update the date time display
      function refreshTime() {
        const currentTime = new Date(); // Get the current real-world time
        timeTextDiv.innerText = currentTime.toString(); // Update the time display with the current time
    }
    

      function updatePointerValue(lngLat) {
        if (!lngLat) return;
        pointerLngLat = lngLat;
        const value = weatherLayer.pickAt(lngLat.lng, lngLat.lat);
        if (!value) {
          pointerDataDiv.innerText = "";
          return;
        }
        pointerDataDiv.innerText = `${value.value.toFixed(1)}°`
      } 
      setInterval(refreshTime, 1000);

      map.on('mousemove', (e) => {
        updatePointerValue(e.lngLat);
      });