<template>
    <div class="hello">
        <div class="row gutter-0">
            <div class="col-sm-12 col-md-2 sidebar">
                <span class="brand">SC</span>
                <div class="clearfix"></div>
                <div class="seasonsClass" v-on:click="showSeasons = !showSeasons">IPL Seasons</div>
                <div v-if="showSeasons">
                    <div v-on:click="showSeasons = !showSeasons;showMatches[index] = !showMatches[index];showSeasons = !showSeasons;" v-for="(season, index) in seasons.slice().reverse()" v-bind:key='index' class="seasonsClass">
                        <div>Year {{ season[0] }}</div>
                        <div v-if="showMatches[index]">
                            <div v-for="(match, idx) in matches[index]" v-bind:key='idx' class="matchClass">{{ match }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-10" style="background-color:  #222; min-height: 100vh;">
            </div>
        </div>
    </div>
</template>




<script>

import Papa from '../../node_modules/papaparse/papaparse.js'


//hard-coding the size of matches array to 10x4
var seasons = new Array;
var showSeasons = false;
console.log(showSeasons);
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
        console.log(mySeasons);
    });
}).catch(function(err) {
    console.log('Fetch Error :-S', err);
})

setTimeout(function() {

    for (let i = 1; i < 10; i++) {
        let junk = "df";
        for (let j = 1; j < mySeasons.length; j++)
            if (parseInt(mySeasons[j][0]) == i)
                junk = mySeasons[j][1];
        seasons.push([junk]);
    }

    for (let i = 1; i < myMatches.length; i++) {
        let junk = myMatches[i][4];
        if (junk.length == 1)
            if (parseInt(junk) >= 0 && parseInt(junk) <= 9)
                seasons[parseInt(junk)].push(myMatches[i][1]).catch(console.log("junk: ", junk));
    }

    seasons.splice(0, 1);
    seasons.slice().reverse();

}, 2000);


var justchecking = function(index) {
    showSeasons = !showSeasons;
    showMatches[index] = !showMatches[index];
    showSeasons = !showSeasons;
}

export default {

    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            junkfunk : function() {
                console.log("=> ", showSeasons);
                showSeasons = !showSeasons;
                console.log("=> ", showSeasons);
            },
            seasons, showSeasons, showMatches, matches, justchecking
        }
    }
}

</script>



<style scoped>
.sidebar {
    background-color: #333;
    min-height: 100vh;
    overflow: auto;
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
