<template>
    <div id="match">
        <span class="teamNameClass">{{team || "First Team"}} vs {{opponent || "Second Team"}}</span>
        <div class="clearfix"></div>
        <canvas id="line-chart" width="800" height="450"></canvas>
    </div>
</template>

<script>


import Papa from '../../node_modules/papaparse/papaparse.js';


var myMatches, teamString;
var matchId, matchDate, team, opponent, seasonId, venueName, tossId, tossDecision, winType, wonBy, matchWinnerId, manOfTheMatch, city, country;


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

})



export default {
    name: 'Match',
    props: ['matchInfo'],
    data() {
        return {
            matchId, check, matchDate, team, opponent, seasonId, venueName, tossId, tossDecision, winType, wonBy, matchWinnerId, manOfTheMatch, city, country, teamString
        }
    },
    created() {
        this.teamString = localStorage.getItem("myTeams").split('$');
        console.log(this.matchInfo.split('$').length);
        this.matchId = parseInt(this.matchInfo.split('$')[0]);
        this.matchDate = this.matchInfo.split('$')[1];
        this.team = this.teamString[parseInt(this.matchInfo.split('$')[2])];
        this.opponent = this.teamString[parseInt(this.matchInfo.split('$')[3])];
    },
    watch: {
        matchInfo: function() {
            this.matchId = parseInt(this.matchInfo.split('$')[0]);
            this.matchDate = this.matchInfo.split('$')[1];
            this.team = this.teamString[parseInt(this.matchInfo.split('$')[2])];
            this.opponent = this.teamString[parseInt(this.matchInfo.split('$')[3])];
            /*
            for (let i = 0; i < myMatches.length; i++) {
                if (parseInt(myMatches[i][0]) == this.matchId) {
                    matchDate = myMatches[i][1]
                    team = teamString[parseInt(myMatches[i][2])][1];
                    opponent = teamString[parseInt(myMatches[i][3])][1];
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
            */
        }
    }
}

var check = () => {
    alert(matchInfo);
}

/*
setTimeout(function() {
        if (localStorage.getItem("myId") == undefined) {
        localStorage.setItem("myId", "");
    }
    //var matchId = parseInt(localStorage.getItem("myId"));
    //var matchId = myId;
    //var matchId = parseInt("335987");
    for (let i = 0; i < myMatches.length; i++) {
        if (myMatches[i][0] == this.matchId) {
            matchDate = myMatches[i][1]
            team = teamString[parseInt(myMatches[i][2])][1];
            opponent = teamString[parseInt(myMatches[i][3])][1];
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
}, 1000);
*/

</script>

<style>
.teamNameClass {
    font-family: "Anton";
    font-size: 4em;
    color: #222;
    text-align: left;
}
</style>