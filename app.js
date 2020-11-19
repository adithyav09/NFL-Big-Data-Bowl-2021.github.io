d3.csv('barRaceData.csv').then(csvData => {

    teams = [];
    scores = [];

    year2015 = [];
    year2016 = [];
    year2017 = [];
    year2018 = [];
    year2019 = [];
    year2020 = [];

    winner2015 = [];
    winner2016 = [];
    winner2017 = [];
    winner2018 = [];
    winner2019 = [];
    winner2020 = [];

    data = csvData;
    dates = data.map(obj => obj.datetime);
    winner = data.map(obj => obj.TEAM);
    winner.forEach(team => {
        if (!teams.includes(team)) {
            teams.push(team);
            scores.push(0);
        };
    });

    for (let i = 0; i < dates.length; i++) {
        if (dates[i][3] === '5') {
            year2015.push(dates[i]);
            winner2015.push(winner[i]);
        } else if (dates[i][3] === '6') {
            year2016.push(dates[i]);
            winner2016.push(winner[i]);
        } else if (dates[i][3] === '7') {
            year2017.push(dates[i]);
            winner2017.push(winner[i]);
        } else if (dates[i][3] === '8') {
            year2018.push(dates[i]);
            winner2018.push(winner[i]);
        } else if (dates[i][3] === '9') {
            year2019.push(dates[i]);
            winner2019.push(winner[i]);
        } else {
            year2020.push(dates[i]);
            winner2020.push(winner[i]);
        }
    };
    console.log(winner2020);

    var yearSelect = {
        '2015': [year2015, winner2015, 'rgb(158,202,225)'],
        '2016': [year2016, winner2016, 'rgb(100,202,225)'],
        '2017': [year2017, winner2017, 'rgb(50,202,225)'],
        '2018': [year2018, winner2018, 'rgb(0,202,225)'],
        '2019': [year2019, winner2019, 'rgb(200,202,225)'],
        '2020': [year2020, winner2020, 'rgb(250,202,225)']
    }

    count = 0;

    function getYear(year) {
        var select = yearSelect[year];
        for (let i = 0; i < select[0].length; i++) {
            setTimeout(function() {
                scores[teams.indexOf(select[1][i])] += 1;

                var trace1 = {
                    x: scores,
                    // y: teams, //number of wins in season
                    type: 'bar',
                    orientation: 'h',
                    text: teams,
                    textposition: 'auto',
                    hoverinfo: 'none',
                    marker: {
                        color: select[2],
                        opacity: 0.6,
                        line: {
                            color: select[2],
                            width: 1.5
                        }
                    }
                };

                var data = [trace1];

                var layout = {
                    barmode: 'stack',
                    autosize: false,
                    width: 1200,
                    height: 1200,
                    margin: {
                        l: 50,
                        r: 50,
                        b: 100,
                        t: 100,
                        pad: 4
                    }
                };

                Plotly.newPlot('myDiv', data, layout);

            }, 250)
        };
    }
    getYear('2015');
    d3.select('#list').on("change", function(event) {
        getYear(this.value);
    })

    // function getSelectValue() {
    //     var selectedValue = document.getElementById("list").value;
    //     console.log(selectedValue);
    //     getYear(selectedValue);
    // }
});