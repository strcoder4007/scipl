<template>
    <div class="hello">
        <div class="row gutter-0">
            <div class="col-sm-12 col-md-2 sidebar">
                <span class="brand">SC</span>
                <div class="clearfix"></div>
                <div class="seasonsClass" v-on:click="showSeasons = !showSeasons">Seasons</div>
                <div v-if="showSeasons">
                    <div v-on:click="showMatches = !showMatches" v-for="(season, index) in seasons" :key='index' class="seasonsClass">{{ season.name }}<br>
                        <div v-if="showMatches">
                            <div v-on:click="gotoMatchPage(index)" v-for="(match, idx) in matches[index]" v-bind:key='idx' class="matchClass">{{ match }}</div>
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
var showMatches = false;
var matches = new Array(10);
for (var i = 0; i < 10; i++) {
    matches[i] = new Array(90);
    for (var j = 0; j < 4; j++)
        matches[i].push("match");
}

export default {

    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            seasons: [
                { "name": "2008" },
                { "name": "2009" },
                { "name": "2010" },
                { "name": "2011" },
                { "name": "2012" }
            ], showSeasons, showMatches, matches
        }
    }
}

/*
var file = new File([""], '/scipl/src/assets/data/Team.csv');
var rdr = new FileReader;
console.log(rdr.readAsText(file));

Papa.parse(file, {
	complete: function(results) {
		console.log("Finished:", results.data);
	}
});
*/

</script>



<style scoped>
.row {
    width: 100vw;
}

.sidebar {
    background-color: #333; 
    min-height: 100vh;
    overflow: auto;
}

.brand {
    font-size: 10em;
    color: #222;
    font-family: "Anton";
    border-bottom: 3px solid #222;
    cursor: pointer;
}

.seasonsClass {
    font-size: 2em;
    color: #222;
    font-family: "Anton";
    border-bottom: 2px solid #222;
    cursor: pointer;
}

.matchClass {
    color: #222;
    font-family: "Anton";
    border-bottom: 1px solid #222;
    cursor: pointer;
}

.seasonsClass:hover, .matchClass:hover {
    color: #111;
}
</style>
