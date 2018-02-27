<template>
    <div class="hello">
        <div class="row">
            <div class="col-sm-12 col-md-3" style="background-color: #333; min-height: 100vh;">
                <span class="brand">SC</span>
                <div class="clearfix"></div>
                <div v-for="(season, index) in seasons" :key='index' class="seasonsClass">{{ season.name }}</div>
            </div>
            <div class="col-sm-12 col-md-9" style="background-color:  #222; min-height: 100vh;">

            </div>
        </div>
    </div>
</template>

<script>
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
}
</style>
