let chart;
const host = window.location.origin;

async function getData(lat, long){
    temp = [];
    dates = [];
    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`)
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);
      temp = resJson.hourly.temperature_2m.slice(0, 25);
      dates = resJson.hourly.time.slice(0, 25);
    })

    return {
        temp: temp,
        dates: dates
    };
}

async function makeChart(lat, long){
    
    const data = await getData(lat, long)
    const dates = data.dates;
    const numbers = data.temp;

    // console.log(dates)
    // console.log(numbers)

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

async function createLocation(lat, long){
    local = await getLocality(lat, long);
    console.log(local)
    console.log(lat)
    console.log(long)

    console.log("Creating Location")
    await fetch(`${host}/coordinates`, {
    method: 'POST',
    body: JSON.stringify({
        firstName: `${local}`,
        lastName: `${document.getElementById('lat').value}`,
        userState: `${document.getElementById('long').value}`
    }),
    headers: {
        'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())

    await loadLocationData();
}

async function loadLocationData(){
    await fetch(`${host}/coords`)
    .then((res) => res.json())
    .then((resJson) => {
        const table = document.createElement('table')
        table.setAttribute('id', 'locationInfo')

        const tableRow = document.createElement('tr');

        const tableHeading1 = document.createElement('th')
        tableHeading1.innerHTML = 'Locality'
        tableRow.appendChild(tableHeading1)

        const tableHeading2 = document.createElement('th')
        tableHeading2.innerHTML = 'Latitude'
        tableRow.appendChild(tableHeading2)

        const tableHeading3 = document.createElement('th')
        tableHeading3.innerHTML = 'Longitude'
        tableRow.appendChild(tableHeading3)

        table.appendChild(tableRow);

        resJson.forEach(location => {
            const locationTableRow = document.createElement('tr')
            const locationTableLocality = document.createElement('td')
            const locationTableLatitude = document.createElement('td')
            const locationTableLongitude = document.createElement('td')

            locationTableLocality.innerHTML = location.locality;
            locationTableLatitude.innerHTML = location.latitude;
            locationTableLongitude.innerHTML = location.longitude;

            locationTableRow.appendChild(locationTableLocality);
            locationTableRow.appendChild(locationTableLatitude);
            locationTableRow.appendChild(locationTableLongitude);

            table.appendChild(locationTableRow);
        });


        const preExistingTable = document.getElementById('locationInfo')
        if(preExistingTable){
            preExistingTable.remove();
        }
        document.body.appendChild(table);
    });
}

async function getLocality(lat, long){
    var result;
    const local = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
    var loc = await fetch(local)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        result = data.locality;
        console.log(result)
    });

    return result
}


window.onload = function(){
    makeChart(),
    loadLocationData();
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

      