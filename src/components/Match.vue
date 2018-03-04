<template>
    <div id="match">
        <div v-if="showMatch">
            <span class="teamNameClass">{{team || "First Team"}} vs {{opponent || "Second Team"}}</span>
            <canvas id="line-chart" width="800" height="450"></canvas>
        </div>
    </div>
</template>

<script>

export default {

    name: 'Match',
    data() {
        return {
            showMatch: true
        }
    }
}

</script>

<style>
.teamNameClass {
    font-family: "Anton";
    font-size: 4em;
    color: #222;
}
</style>