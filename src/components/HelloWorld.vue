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
                                <div v-if="idx" v-on:click="showMatch = false;
                                                    showMatches[index] = !showMatches[index];
                                                    showMatch = true;
                                                    matchInfo=match;
                                                    loadMatch(match.split('$')[0]);
                                                    ">{{ match.split('$')[19+parseInt(match.split('$')[2])] }} vs {{ match.split('$')[19+parseInt(match.split('$')[3])] }}
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
                    <Match v-bind:matchInfo="matchInfo" />
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
var matchInfo = "", matchDate, team, opponent, seasonId, venueName, tossId, tossDecision, winType, wonBy, matchWinnerId, manOfTheMatch, city, country;

var myTeams, myMatches, mySeasons, myPlayers, myBalls;
//var onedriveUrl = "https://1drv.ms/u/s!AmQasIRCiDf9vhYHwQNS07CCGMB8";
//var dataUrl = "https://api.onedrive.com/v1.0/shares/u!" + btoa(onedriveUrl + "?v=" + Math.random()) + "/root?expand=children";


//for players;
fetch('https://hvzqng.bn.files.1drv.com/y4mY80lvbsYtjGZzW4Cx8wCosjJ5IOM6O4rHwN2oRdXOUJZrThzhFB67JDGf0M80IBJPM_7eCa5A_tAJ4hZqdDPcCoypXc5wVdhyNgI1bArDCVzyyBIQT9TdTdqyiQBDkOPThbWe_tcO0NZiyvrvgYRgmVWBdXD6mmFvF21Fu9qmyPHpDQ2K9NouhW4x9_ENJzLL1bSWuWDBGmQHGWoI7ZNSQ').then(response => {
    if (response.status !== 200) {
        return;
    }
    response.text().then(function(data) {
        myPlayers = Papa.parse(data).data;
        console.log(myPlayers);
        //for balls;
        fetch('https://ilzqng.bn.files.1drv.com/y4mj1Rjjyfc6yNQa8SNGEqX_gI64G9fI7dlxz6Qnz6a45OoHVlOy3EYgzI4SJX9emnFYn85S9IwXL4tH91IktYw9YrRmGt1JGCkkeMHVWS2-FnOqH8wozDeQhw7-ucRd9GeU7uJjACVAGR0UERTD1GHq30UlLoq55-7bMmYrdTvf2LY-EcvNoT0ztGrORgpMT0X5bl5KPQATI1KhcWxWN8bEQ').then(response => {
            if (response.status !== 200) {
                return;
            }
            response.text().then(function(data) {
                myBalls = Papa.parse(data).data;
                console.log(myBalls);
                //for matches
                fetch('https://hfzqng.bn.files.1drv.com/y4mzpRpey6-zwV8EO242SDib41UBh25V1GKon_I8leXO_XnpIa5gM7Na3GyZFUDqhcm6qjxTwbCBn6Adkcqrikey6EB4pubVHnBkGLFVR5sabIsixStAMvhoWUt786MfcUytE51nCzjiHPE0aqsaiDncvKZeg3LiEn4mJTta338t71Tj-NDB-cREy4YEgguCrpB2tKRu3XTAmdr3qYr5LMjHQ').then(response => {
                    if (response.status !== 200) {
                        return;
                    }
                    response.text().then(function(data) {
                        myMatches = Papa.parse(data).data;
                        //console.log(myMatches);

                        //for seasons
                        fetch('https://f1zqng.bn.files.1drv.com/y4mjnTFba2iSF--66P1CdTG2NqjIJp1vGMjfDgeo_lY42psmuu1S9FfkWEPkxxiqW_ZPj9lB2DKejintViZ3aV5BJUrVqLmCyltMw3F0lkUHpdH7Vd4QUSG0qySYDxVjGEK4IOMI07b-5D4hJB3SjArd7aMflNjpHYCwxQE1fIoRUZpGXaEfdKFjADVcjVTW0MJAlSyKAndsjATG3ppZlUc_Q').then(response => {
                            if (response.status !== 200) {
                                return;
                            }
                            response.text().then(function(data) {
                                mySeasons = Papa.parse(data).data;
                                mySeasons.splice(mySeasons.length - 1, 1);


                                //for teams
                                fetch('https://gfzqng.bn.files.1drv.com/y4mMMlLtdRNBqLBV_RO7IB6JCMOuRQJxmY8YlHqXDLxrabLS2YbdxX85SZStkvwnXCf03BTH_MQLK9-TW66VIddUiJLWHVZ2NZBc7f_fAyZ7HKYCN0AswdDOI-PB03fg41aft_Bn4h1zAeyUuFxEiUDOObQoJ9DEdmXEfxBRHNChwct_BYBqKlFEURlalzbFaAn02LC3TvxX8XEV6M9oIcFWQ').then(response => {
                                    if (response.status !== 200) {
                                        return;
                                    }
                                    response.text().then(function(data) {
                                        myTeams = Papa.parse(data).data;
                                        let teamShort = "", teamLong = "";
                                        for (let k = 0; k < myTeams.length; k++) {
                                            teamShort += myTeams[k][2] + '$';
                                            teamLong += myTeams[k][1] + '$';
                                        }
                                        localStorage.setItem("myTeamsShort", teamShort);
                                        localStorage.setItem("myTeams", teamLong);

                                        //generating the array
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
                                                let strng = "";
                                                for (let j = 0; j < myMatches[i].length; j++) {
                                                    strng = strng + myMatches[i][j] + "$";
                                                }
                                                strng += localStorage.getItem("myTeamsShort");
                                                seasons[junk].push(strng);
                                            }
                                        }

                                        seasons.splice(0, 1);
                                        seasons.slice().reverse();


                                    });
                                }).catch(function(err) {
                                    console.log('Fetch Error :-S', err);
                                })
                            });
                        }).catch(function(err) {
                            console.log('Fetch Error :-S', err);
                        })
                    });
                }).catch(function(err) {
                    console.log('Fetch Error :-S', err);
                })
            });
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
    });
}).catch(function(err) {
    console.log('Fetch Error :-S', err);
})





var loadMatch = x => {

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
    let lastId = myBalls[0][2], runs1 = [], runs2 = [], cnt1 = 0, cnt2 = 0;
    let limit = myBalls.length;
    for (let i = 1; i < limit; i++) {
        if (myBalls[i][0] == x && myBalls[i][1] == "1") {
            if (myBalls[i][2] != lastId) {
                runs1.push(cnt1);
                lastId = myBalls[i][2];
            }
            else {
                if (myBalls[i][10] != " ")
                    cnt1 += parseInt(myBalls[i][10]);
                if (myBalls[i][12] != " ")
                    cnt1 += parseInt(myBalls[i][12]);
            }
        }
        else if (myBalls[i][0] == x && myBalls[i][1] == "2") {
            if (myBalls[i][2] != lastId) {
                runs2.push(cnt2);
                lastId = myBalls[i][2];
            }
            else {
                if (myBalls[i][10] != " ")
                    cnt2 += parseInt(myBalls[i][10]);
                if (myBalls[i][12] != " ")
                    cnt2 += parseInt(myBalls[i][12]);
            }
        }
    }


    setTimeout(function() {
        new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                datasets: [{
                    data: runs1,
                    label: "Africa",
                    borderColor: "#3e95cd",
                    fill: false
                }, {
                    data: runs2,
                    label: "Asia",
                    borderColor: "#8e5ea2",
                    fill: false
                }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Runs vs Overs'
                }
            }
        });
    }, 400);


}


export default {
    name: 'HelloWorld',
    components: {
        Match
    },
    data() {
        return {
            matchInfo, showMatch: false, seasons, showSeasons, showMatches, matches, loadMatch, myTeams, myBalls, myPlayers
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
