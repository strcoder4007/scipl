<template>
    <div class="hello">
        <div class="row gutter-0">
            <div class="Left col-sm-12 col-md-2">
                <span class="brand">SC</span>
                <div class="clearfix"></div>
                <div class="seasonClass" v-on:click="showSeasons = !showSeasons">IPL Seasons</div>
                <div v-if="showSeasons">
                    <div v-on:click="showSeasons = !showSeasons;showMatches[index] = !showMatches[index];showSeasons = !showSeasons;" v-for="(season, index) in seasons.slice().reverse()" v-bind:key='index' class="seasonsClass">
                        <div>Year {{ season[0] }}</div>
                        <div v-if="showMatches[index]">
                            <div v-for="(match, idx) in season" v-bind:key='idx' class="matchClass">
                                <div v-if="idx" v-on:click="showMatch = false; showMatches[index] = !showMatches[index]; showMatch = true;loadMatch(match.split('$')[0]);">
                                    {{ match.split('$')[2] }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="seasonClass">Versus</div>
                <div class="seasonClass">Settings</div>
            </div>
            <div class="Right col-sm-12 col-md-10">
                <div v-if="showMatch">
                    <Match/>
                </div>
            </div>
        </div>
    </div>
</template>




<script>

import Papa from '../../node_modules/papaparse/papaparse.js';
import Match from '../components/Match'


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
var matchDate, team, opponent, seasonId, venueName, tossId, tossDecision, winType, wonBy, matchWinnerId, manOfTheMatch, city, country;

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
        //console.log(myMatches);
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
        //console.log(myTeams);
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

setTimeout(() => {

    for (let i = 0; i < 10; i++) {
        let junk = "df";
        for (let j = 1; j < mySeasons.length; j++)
            if (parseInt(mySeasons[j][0]) == i)
                junk = mySeasons[j][1];
        seasons.push([junk]);
    }

    for (let i = 1; i < myMatches.length; i++) {
        let junk = parseInt(myMatches[i][4]);
        if (junk > 0 && junk <= 9) {
            let strng = myMatches[i][0] + "$" + myMatches[i][1] + "$" + myTeams[myMatches[i][2]][2] + " vs " + myTeams[myMatches[i][3]][2];
            seasons[junk].push(strng);
        }
    }

    seasons.splice(0, 1);
    seasons.slice().reverse();


}, 1000);


var loadMatch = x => {

    localStorage.setItem("myId", x);

    /*
    0 Match_Id,
    1    Match_Date,
    2   Team_Name_Id,
    3    Opponent_Team_Id,
    4   Season_Id,
    5    Venue_Name,
    6    Toss_Winner_Id,
    7    Toss_Decision,
    8    IS_Superover,
    9    IS_Result,
    10    Is_DuckWorthLewis,
    11    Win_Type,
    12    Won_By,
    13    Match_Winner_Id,
    14    Man_Of_The_Match_Id,
    15    First_Umpire_Id,
    16    Second_Umpire_Id,
    17    City_Name,
    18    Host_Country
    */
}




export default {

    name: 'HelloWorld',
    components: {
        Match
    },
    data() {
        return {
            showMatch: false, seasons, showSeasons, showMatches, matches, loadMatch, matchDate, team, opponent, seasonId, venueName, tossId, tossDecision, winType, wonBy, matchWinnerId, manOfTheMatch, city, country
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

.Left,
.Right {
    background-color: #444;
}

.brand {
    font-size: 10em;
    color: #222;
    font-family: "Anton";
    cursor: pointer;
}

.seasonClass {
    font-size: 35px;
    color: #222;
    font-family: "Anton";
    border-top: 2px solid #222;
    cursor: pointer;
}

.seasonsClass {
    font-size: 28px;
    color: #222;
    font-family: "Anton";
    border-top: 2px solid #222;
    cursor: pointer;
}

.matchClass {
    color: #222;
    font-family: "Anton";
    font-size: 25px;
    border-bottom: 1px solid #222;
    cursor: pointer;
}

.seasonsClass:hover,
.matchClass:hover {
    color: #111;
}
</style>
