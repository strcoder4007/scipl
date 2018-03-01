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
var baseUrl = "http://18.221.40.67";
//var baseUrl = "http://localhost:8080"; //not working
var seasons = new Array;
var myTeams, myMatches, mySeasons, myPlayers;
Papa.parse(baseUrl + "/assets/data/Season.csv", {
    download: true,
    complete: function(results) {
        console.log(this.mySeasons);
        this.mySeasons = results.data;
    }
});
Papa.parse(baseUrl + "/assets/data/Match.csv", {
    download: true,
    complete: function(results) {
        this.myMatches = results.data;
        console.log(this.myMatches);
        for (let i = 1; i < this.myMatches.length; i++) {
            seasons[this.myMatches[i][4]].push({ "name": this.myMatches[i][2]});
        }
    }
});

var justchecking = function(index) {
    this.showSeasons = !this.showSeasons;
    this.showMatches[index] = !this.showMatches[index];
    this.showSeasons = !this.showSeasons;
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
    this.someData = response.body;
    console.log(this.someData);
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
