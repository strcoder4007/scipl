<template>
    <div class="hello">
        <div class="row gutter-0">
            <div class="Left col-sm-12 col-md-2">
                <span class="brand">SC</span>
                <div class="clearfix"></div>
                <div class="seasonsClass" v-on:click="showSeasons = !showSeasons">IPL Seasons</div>
                <div v-if="showSeasons">
                    <div v-on:click="showSeasons = !showSeasons;showMatches[index] = !showMatches[index];showSeasons = !showSeasons;" v-for="(season, index) in seasons.slice().reverse()" v-bind:key='index' class="seasonsClass">
                        <div>Year {{ season[0] }}</div>
                        <div v-if="showMatches[index]">
                            <div v-for="(match, idx) in season" v-bind:key='idx' class="matchClass">
                                <div v-if="idx">{{ match }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="Right col-sm-12 col-md-10">
                <canvas id="line-chart" width="800" height="450"></canvas>
            </div>
        </div>
    </div>
</template>




<script>

import Papa from '../../node_modules/papaparse/papaparse.js'


//hard-coding the size of matches array to 10x4
var seasons = new Array;
var showSeasons = false;
var showMatches = new Array;
for (let i = 0; i < 10; i++)
    showMatches.push(false);
var matches = new Array(10);
for (let i = 0; i < 10; i++) {
    matches[i] = new Array;
    for (var j = 0; j < 4; j++)
        matches[i].push("m");
}

var myTeams, myMatches, mySeasons, myPlayers;
var onedriveUrl = "https://1drv.ms/u/s!AmQasIRCiDf9vhHdwzFOTGl_5JJK";
var dataUrl = "https://api.onedrive.com/v1.0/shares/u!" + btoa(onedriveUrl + "?v=" + Math.random()) + "/root?expand=children";

//for matches
fetch('https://hfzqng.bn.files.1drv.com/y4mzpRpey6-zwV8EO242SDib41UBh25V1GKon_I8leXO_XnpIa5gM7Na3GyZFUDqhcm6qjxTwbCBn6Adkcqrikey6EB4pubVHnBkGLFVR5sabIsixStAMvhoWUt786MfcUytE51nCzjiHPE0aqsaiDncvKZeg3LiEn4mJTta338t71Tj-NDB-cREy4YEgguCrpB2tKRu3XTAmdr3qYr5LMjHQ').then(response => {
    if (response.status !== 200) {
        return;
    }
    response.text().then(function(data) {
        myMatches = Papa.parse(data).data;
    });
}).catch(function(err) {
    console.log('Fetch Error :-S', err);
})

//for teams
fetch('https://gfzqng.bn.files.1drv.com/y4mMMlLtdRNBqLBV_RO7IB6JCMOuRQJxmY8YlHqXDLxrabLS2YbdxX85SZStkvwnXCf03BTH_MQLK9-TW66VIddUiJLWHVZ2NZBc7f_fAyZ7HKYCN0AswdDOI-PB03fg41aft_Bn4h1zAeyUuFxEiUDOObQoJ9DEdmXEfxBRHNChwct_BYBqKlFEURlalzbFaAn02LC3TvxX8XEV6M9oIcFWQ').then(response => {
    if (response.status !== 200) {
        return;
    }
    response.text().then(function(data) {
        myTeams = Papa.parse(data).data;
    });
}).catch(function(err) {
    console.log('Fetch Error :-S', err);
})

//for seasons
fetch('https://f1zqng.bn.files.1drv.com/y4mjnTFba2iSF--66P1CdTG2NqjIJp1vGMjfDgeo_lY42psmuu1S9FfkWEPkxxiqW_ZPj9lB2DKejintViZ3aV5BJUrVqLmCyltMw3F0lkUHpdH7Vd4QUSG0qySYDxVjGEK4IOMI07b-5D4hJB3SjArd7aMflNjpHYCwxQE1fIoRUZpGXaEfdKFjADVcjVTW0MJAlSyKAndsjATG3ppZlUc_Q').then(response => {
    if (response.status !== 200) {
        return;
    }
    response.text().then(function(data) {
        mySeasons = Papa.parse(data).data;
        mySeasons.splice(mySeasons.length - 1, 1);
    });
}).catch(function(err) {
    console.log('Fetch Error :-S', err);
})

setTimeout(function() {

    for (let i = 0; i < 10; i++) {
        let junk = "df";
        for (let j = 1; j < mySeasons.length; j++)
            if (parseInt(mySeasons[j][0]) == i)
                junk = mySeasons[j][1];
        seasons.push([junk]);
    }

    for (let i = 1; i < myMatches.length; i++) {
        let junk = parseInt(myMatches[i][4]);
        if (junk > 0 && junk <= 9)
            seasons[junk].push(myMatches[i][1]);
        else {
            //console.log("junk: ", junk)
        }
    }

    seasons.splice(0, 1);
    seasons.slice().reverse();

    new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
            labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
            datasets: [{
                data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                label: "Africa",
                borderColor: "#3e95cd",
                fill: false
            }, {
                data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                label: "Asia",
                borderColor: "#8e5ea2",
                fill: false
            }, {
                data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                label: "Europe",
                borderColor: "#3cba9f",
                fill: false
            }, {
                data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                label: "Latin America",
                borderColor: "#e8c3b9",
                fill: false
            }, {
                data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                label: "North America",
                borderColor: "#c45850",
                fill: false
            }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'World population per region (in millions)'
            }
        }
    });


}, 1000);

export default {

    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            seasons, showSeasons, showMatches, matches
        }
    }
}

</script>



<style scoped>

.Left {
    border-right: 4px solid #222;
}

.Left,
.Right {
    overflow: auto;
    height: 100vh;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
}

.Left::-webkit-scrollbar,
.Right::-webkit-scrollbar {
    display: none;
}

.Left, .Right {
    background-color: #333;
}

.brand {
    font-size: 10em;
    color: #222;
    font-family: "Anton";
    cursor: pointer;
}

.seasonsClass {
    font-size: 2em;
    color: #222;
    font-family: "Anton";
    border-top: 2px solid #222;
    cursor: pointer;
}

.matchClass {
    color: #222;
    font-family: "Anton";
    border-bottom: 1px solid #222;
    cursor: pointer;
}

.seasonsClass:hover,
.matchClass:hover {
    color: #111;
}
</style>
