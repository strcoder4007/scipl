<template>
    <div id="match">
        <p class="teamNameClass">{{team || "First Team"}}
            <span style="font-size: 1.3em">VS</span> {{opponent || "Second Team"}}</p>
        <span class="info">On {{matchDate}} at {{venueName}} in {{city}}, {{country}}</span><br>
        <span class="info">Toss Winner: {{tossId}} decided to {{tossDecision}}</span><br>
        <span class="heading">{{matchWinnerId}} won by {{wonBy}} {{winType.split(' ')[1]}} with {{manOfTheMatch}} being the man of the match</span>
        <div class="clearfix"></div>
        <canvas id="line-chart" width="800" height="450"></canvas>
    </div>
</template>

<script>
import Papa from '../../node_modules/papaparse/papaparse.js';

var myMatches, teamString, playerString;
var matchId, matchDate, team, opponent, seasonId, venueName, tossId, tossDecision, winType, wonBy, matchWinnerId, manOfTheMatch, city, country;


fetch('https://hfzqng.bn.files.1drv.com/y4mzpRpey6-zwV8EO242SDib41UBh25V1GKon_I8leXO_XnpIa5gM7Na3GyZFUDqhcm6qjxTwbCBn6Adkcqrikey6EB4pubVHnBkGLFVR5sabIsixStAMvhoWUt786MfcUytE51nCzjiHPE0aqsaiDncvKZeg3LiEn4mJTta338t71Tj-NDB-cREy4YEgguCrpB2tKRu3XTAmdr3qYr5LMjHQ').then(response => {
    if (response.status !== 200) {
        return;
    }
    response.text().then(function(data) {
        myMatches = Papa.parse(data).data;
        //console.log("from match page: ", myMatches);
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
            matchId, matchDate, team, opponent, seasonId, venueName, tossId, tossDecision, winType, wonBy, matchWinnerId, manOfTheMatch, city, country, teamString, playerString
        }
    },
    created() {
        this.teamString = localStorage.getItem("myTeams").split('$');
        this.playerString = localStorage.getItem("myPlayers").split('$');
        console.log(this.playerString);
        this.matchId = parseInt(this.matchInfo.split('$')[0]);
        this.matchDate = this.matchInfo.split('$')[1];
        this.team = this.teamString[parseInt(this.matchInfo.split('$')[2])];
        this.opponent = this.teamString[parseInt(this.matchInfo.split('$')[3])];
        this.venueName = this.matchInfo.split('$')[5];
        this.tossId = this.teamString[parseInt(this.matchInfo.split('$')[6])];
        this.tossDecision = this.matchInfo.split('$')[7];
        this.winType = this.matchInfo.split('$')[11];
        this.wonBy = this.matchInfo.split('$')[12];
        this.matchWinnerId = this.teamString[parseInt(this.matchInfo.split('$')[13])];
        this.manOfTheMatch = this.playerString[parseInt(this.matchInfo.split('$')[14])];
        this.city = this.matchInfo.split('$')[17];
        this.country = this.matchInfo.split('$')[18];
    },
    watch: {
        matchInfo: function() {
            this.matchId = parseInt(this.matchInfo.split('$')[0]);
            this.matchDate = this.matchInfo.split('$')[1];
            this.team = this.teamString[parseInt(this.matchInfo.split('$')[2])];
            this.opponent = this.teamString[parseInt(this.matchInfo.split('$')[3])];
            this.venueName = this.matchInfo.split('$')[5];
            this.tossId = this.teamString[parseInt(this.matchInfo.split('$')[6])];
            this.tossDecision = this.matchInfo.split('$')[7];
            this.winType = this.matchInfo.split('$')[11];
            this.wonBy = this.matchInfo.split('$')[12];
            this.matchWinnerId = this.teamString[parseInt(this.matchInfo.split('$')[13])];
            this.manOfTheMatch = this.playerString[parseInt(this.matchInfo.split('$')[14])];
            this.city = this.matchInfo.split('$')[17];
            this.country = this.matchInfo.split('$')[18];
        }
    }
}
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
</script>

<style>
.teamNameClass {
    font-family: "Anton";
    font-size: 3em;
    color: #111;
}

.heading {
    font-family: "Anton";
    font-size: 2em;
    color: #222;
    text-align: left;
}

.info {
    font-family: "Anton";
    font-size: 1.5em;
    color: #222;
    text-align: center;
}
</style>