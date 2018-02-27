<template>
    <div class="hello">
        <div class="row gutter-0">
            <div class="col-sm-12 col-md-2" style="background-color: #333; min-height: 100vh; overflow: auto">
                <span class="brand">SC</span>
                <div class="clearfix"></div>
                <div class="seasonsClass" v-on:click="showSeasons = !showSeasons">Seasons</div>
                <div v-if="showSeasons">
                    <div v-on:click="showMatches[index] = !showMatches[index]" v-for="(season, index) in seasons" :key='index' class="seasonsClass">{{ season.name }}
                        <div v-if="showMatches[index]">
                            <div v-on:click="gotoMatchPage(index)" v-for="(match, idx) in matches[index]" v-bind:key='idx'>{{ match.name }}</div>
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


export default {

    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        //hard-coding the size of matches array to 10
        var showSeasons = false;
        var showMatches = new Array(10);
        for (var i = 0; i < showMatches.length; i++)
            showMatches[i] = false;
        var matches = new Array(10);
        for (var i = 0; i < 10; i++)
            matches[i] = new Array(100);
        return {
            seasons: [
                { "name": "Season#1" },
                { "name": "Season#2" },
                { "name": "Season#3" },
                { "name": "Season#4" },
                { "name": "Season#5" }
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

.brand {
    font-size: 10em;
    color: #222;
    font-family: "Anton";
    border-bottom: 2px solid #222;
}

.seasonsClass {
    font-size: 2em;
    color: #222;
    font-family: "Anton";
    border-bottom: 1px solid #222;
    cursor: pointer;
}

.seasonsClass:hover {
    color: #111;
}
</style>
