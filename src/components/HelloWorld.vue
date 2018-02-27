<template>
    <div class="hello">
        <div class="row gutter-0">
            <div class="col-sm-12 col-md-2" style="background-color: #333; min-height: 100vh; overflow: auto">
                <span class="brand">SC</span>
                <div class="clearfix"></div>
                <div class="seasonsClass">Seasons</div>
                <div v-for="(season, index) in seasons" :key='index' class="seasonsClass">{{ season.name }}</div>
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

var myfile = "./assets/data/Team.csv";
console.log(Papa.parse(myfile));

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
