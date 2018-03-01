<template>
    <div class="hello">
        <div class="row gutter-0">
            <div class="col-sm-12 col-md-2 sidebar">
                <span class="brand">SC</span>
                <div class="clearfix"></div>
                <div class="seasonsClass" v-on:click="showSeasons = !showSeasons">Seasons</div>
                <div v-if="showSeasons">
                    <div v-on:click="justchecking(index)" v-for="(season, index) in seasons" :key='index' class="seasonsClass">
                        <div>{{ season.name }}</div>
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
var seasons = new Array;
var myTeams, myMatches, mySeasons, myPlayers;
var onedriveUrl = "https://1drv.ms/u/s!AmQasIRCiDf9vhHdwzFOTGl_5JJK";
var dataUrl = "https://api.onedrive.com/v1.0/shares/u!" + btoa(onedriveUrl + "?v=" + Math.random()) + "/root?expand=children";

//for teams
fetch('https://gfzqng.bn.files.1drv.com/y4mMMlLtdRNBqLBV_RO7IB6JCMOuRQJxmY8YlHqXDLxrabLS2YbdxX85SZStkvwnXCf03BTH_MQLK9-TW66VIddUiJLWHVZ2NZBc7f_fAyZ7HKYCN0AswdDOI-PB03fg41aft_Bn4h1zAeyUuFxEiUDOObQoJ9DEdmXEfxBRHNChwct_BYBqKlFEURlalzbFaAn02LC3TvxX8XEV6M9oIcFWQ').then(response => {
    if (response.status !== 200) {
        return;
    }
    response.text().then(function(data) {
        myTeams = data;
        //console.log("team:", data);
    });
}).catch(function(err) {
    console.log('Fetch Error :-S', err);
})

//for matches
fetch('https://hfzqng.bn.files.1drv.com/y4mzpRpey6-zwV8EO242SDib41UBh25V1GKon_I8leXO_XnpIa5gM7Na3GyZFUDqhcm6qjxTwbCBn6Adkcqrikey6EB4pubVHnBkGLFVR5sabIsixStAMvhoWUt786MfcUytE51nCzjiHPE0aqsaiDncvKZeg3LiEn4mJTta338t71Tj-NDB-cREy4YEgguCrpB2tKRu3XTAmdr3qYr5LMjHQ').then(response => {
    if (response.status !== 200) {
        return;
    }
    response.text().then(function(data) {
        myMatches = data;
        //console.log("match:", data);
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
        mySeasons = data;
        //console.log("season:", data);
    });
}).catch(function(err) {
    console.log('Fetch Error :-S', err);
})

/*
Papa.parse(baseUrl + "/assets/data/Season.csv", {
    download: true,
    complete: function(results) {
        console.log(mySeasons);
        mySeasons = results.data;
    }
});
Papa.parse(baseUrl + "/assets/data/Match.csv", {
    download: true,
    complete: function(results) {
        myMatches = results.data;
        console.log(myMatches);
        for (let i = 1; i < myMatches.length; i++) {
            seasons[myMatches[i][4]].push({ "name": myMatches[i][2]});
        }
    }
});
*/

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
            seasons, showSeasons, showMatches, matches, justchecking
        }
    }
}


/*
Papa.parse("http://18.221.40.67/assets/data/Team.csv", {
	download: true,
	complete: function(results) {
		console.log("Teams: " + results.data);
	}
});
Papa.parse("http://18.221.40.67/assets/data/Player_Match.csv", {
	download: true,
	complete: function(results) {
		console.log(results);
	}
});
Papa.parse("http://18.221.40.67/assets/data/Player.csv", {
	download: true,
	complete: function(results) {
		console.log(results);
	}
});
Papa.parse("http://18.221.40.67/assets/data/Ball_by_Ball.csv", {
	download: true,
	complete: function(results) {
		console.log(results);
	}
});
*/


/*
var someData;
HelloWorld.http.get('http://18.221.40.67/assets/data/Team.csv').then(response => {
    // get body data
    someData = response.body;
    console.log(someData);
    }, response => {
    // error callback
});
  */

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
