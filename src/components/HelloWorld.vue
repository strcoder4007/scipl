<template>
    <div class="hello">
        <div class="row">
            <div class="col-sm-12 col-md-3" style="background-color: #333; min-height: 100vh;">
                <span class="brand">SC</span>
                <div class="clearfix"></div>
                <div class="seasonsClass">Seasons</div>
                <div v-for="(season, index) in seasons" :key='index' class="seasonsClass">{{ season.name }}</div>
            </div>
            <div class="col-sm-12 col-md-9" style="background-color:  #222; min-height: 100vh;">

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
        return {
            seasons: [
                { "name": "Season#1" },
                { "name": "Season#2" },
                { "name": "Season#3" },
                { "name": "Season#4" },
                { "name": "Season#5" }
            ]
        }
    }

}

Papa.parse("", {
    complete: function(results) {
        console.log("Finished:", results.data);
    }
});

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Anton');
@import url('https://fonts.googleapis.com/css?family=Roboto');
.brand {
    font-size: 15em;
    color: #222;
    font-family: "Anton";
    border-bottom: 2px solid #222;
}

.seasonsClass {
    font-size: 3em;
    color: #222;
    font-family: "Anton";
    border-bottom: 1px solid #222;
    cursor: pointer;
}

.seasonsClass:hover {
    color: #111;
}
</style>
