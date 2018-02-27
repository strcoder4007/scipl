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
                <form enctype="multipart/form-data">
                    <input type="file" @change="onFileChange">
                </form>
            </div>
        </div>
    </div>
</template>




<script>

var teams;
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
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createInput(files[0]);
        },
        createInput(file) {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.fileinput = reader.result;
                this.teams = e.target.result;
            }
            reader.readAsText(file);
        }

    }

}

/*
var file = new File('/scipl/src/assets/data/Team.csv');
console.log(file);

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
