<template>
    <div id="match">
        <span class="teamNameClass">{{team || "First Team"}} vs {{opponent || "Second Team"}}</span>
        <div class="clearfix"></div>
        <canvas id="line-chart" width="800" height="450"></canvas>
    </div>
</template>

<script>


import Papa from '../../node_modules/papaparse/papaparse.js';


var myMatches, myTeams, myId;
var matchDate, team, opponent, seasonId, venueName, tossId, tossDecision, winType, wonBy, matchWinnerId, manOfTheMatch, city, country;

fetch('https://gfzqng.bn.files.1drv.com/y4mMMlLtdRNBqLBV_RO7IB6JCMOuRQJxmY8YlHqXDLxrabLS2YbdxX85SZStkvwnXCf03BTH_MQLK9-TW66VIddUiJLWHVZ2NZBc7f_fAyZ7HKYCN0AswdDOI-PB03fg41aft_Bn4h1zAeyUuFxEiUDOObQoJ9DEdmXEfxBRHNChwct_BYBqKlFEURlalzbFaAn02LC3TvxX8XEV6M9oIcFWQ').then(response => {
    if (response.status !== 200) {
        return;
    }
    response.text().then(function(data) {
        myTeams = Papa.parse(data).data;
        console.log("from match page: ", myTeams);
    });
}).catch(function(err) {
    console.log('Fetch Error :-S', err);
})

fetch('https://hfzqng.bn.files.1drv.com/y4mzpRpey6-zwV8EO242SDib41UBh25V1GKon_I8leXO_XnpIa5gM7Na3GyZFUDqhcm6qjxTwbCBn6Adkcqrikey6EB4pubVHnBkGLFVR5sabIsixStAMvhoWUt786MfcUytE51nCzjiHPE0aqsaiDncvKZeg3LiEn4mJTta338t71Tj-NDB-cREy4YEgguCrpB2tKRu3XTAmdr3qYr5LMjHQ').then(response => {
    if (response.status !== 200) {
        return;
    }
    response.text().then(function(data) {
        myMatches = Papa.parse(data).data;
        console.log("from match page: ", myMatches);
    });
}).catch(function(err) {
    console.log('Fetch Error :-S', err);
}).then(() => {
    //var matchId = parseInt("335987");
    if (localStorage.getItem("myId") == undefined) {
        localStorage.setItem("myId", "");
    }
    var matchId = parseInt(localStorage.getItem("myId"));
    for (let i = 0; i < myMatches.length; i++) {
        if (myMatches[i][0] == matchId) {
            matchDate = myMatches[i][1]
            team = myTeams[parseInt(myMatches[i][2])][1];
            opponent = myTeams[parseInt(myMatches[i][3])][1];
            seasonId = myMatches[i][4];
            venueName = myMatches[i][5];
            tossId = myMatches[i][6];
            tossDecision = myMatches[i][7];
            winType = myMatches[i][11];
            wonBy = myMatches[i][12];
            matchWinnerId = myMatches[i][13];
            manOfTheMatch = myMatches[i][14];
            city = myMatches[i][17];
            country = myMatches[i][18];
            break;
        }
    }
    /*
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
    */
})




export default {
    name: 'Match',
    props: ['myIdChange'],
    data() {
        return {
            check, matchDate, team, opponent, seasonId, venueName, tossId, tossDecision, winType, wonBy, matchWinnerId, manOfTheMatch, city, country
        }
    },
    mounted() {
        this.myId = this.myIdChange;
    },
    watch: {
        myIdChange: function() {
            alert("changing match to ID: " + this.myId);
            var matchId = parseInt(myIdChange);
            for (let i = 0; i < myMatches.length; i++) {
                if (myMatches[i][0] == matchId) {
                    matchDate = myMatches[i][1]
                    team = myTeams[parseInt(myMatches[i][2])][1];
                    opponent = myTeams[parseInt(myMatches[i][3])][1];
                    seasonId = myMatches[i][4];
                    venueName = myMatches[i][5];
                    tossId = myMatches[i][6];
                    tossDecision = myMatches[i][7];
                    winType = myMatches[i][11];
                    wonBy = myMatches[i][12];
                    matchWinnerId = myMatches[i][13];
                    manOfTheMatch = myMatches[i][14];
                    city = myMatches[i][17];
                    country = myMatches[i][18];
                    break;
                }
            }
        }
    }
}

var check = () => {
    alert(myIdChange);
}

</script>

<style>
.teamNameClass {
    font-family: "Anton";
    font-size: 4em;
    color: #222;
    text-align: left;
}
</style>