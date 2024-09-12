<script setup>
import { computed, defineEmits } from 'vue';

const props = defineProps({
    floors: {
        type: Array,
        required: true,
    },
    carUnits: {
        type: Array,
        required: true,
    },
})
const topFloorIdx = computed(() => props.floors.length - 1);

const emit = defineEmits(['update-selected-car']);

</script>

<template>
    <div class="building-view">
        <h3>Building</h3>

        <div class="floors-view">
            <div class="container floors-interface-group">
                <div v-for="(fl, idx) in floors" class="floor-unit">
                    <button type="button" @click="dummy" class="floor-label">floor #{{ fl }}</button>

                    <button v-if="idx !== topFloorIdx" class="floor-interface" type="button" @click="dummy">^</button>
                    <button v-if="idx !== 0" class="floor-interface" type="button" @click="dummy">v</button>
                    <!-- <button type="button" @click="dummy" class="floor-label">floor #{{ fl }}</button> -->

                </div>
            </div>

            <div v-for="(cu, cuIdx) in carUnits" :class="['container car-units-group', { 'selected': cu.isSelected }]"
                @click="() => emit('update-selected-car', cuIdx)">
                <p class="car-unit-label">Elevator {{ cu.carId }}</p>
                <div v-for="(fl, idx) in floors" class="floor-unit">

                    <button v-if="cu.currentFloorIdx === idx" class="car-unit">{{ fl }}</button>
                    <button v-if="cu.currentFloorIdx !== idx" class="dummy-btn">.</button>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.building-view {
    --selected-unit-bg-color: cadetblue;

    flex: 1;
    border: 1px solid skyblue;
    padding: 12px;
    padding-top: 0;
}

.floors-view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 5px;
}

.container {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: flex-start;
}

.floors-interface-group {

    min-width: 220px;
    margin-right: 20px;
}

.car-units-group {
    border: 1px solid ghostwhite;
    padding: 5px;
    cursor: pointer;
}

.car-units-group.selected {
    background-color: var(--selected-unit-bg-color);
}

.floor-unit {
    margin: 5px 0;
    display: flex;
    gap: 5px;

    text-wrap: nowrap;
}

.floor-interface {
    border-color: #646cff;
}
.floor-interface:hover {
    border-color: ghostwhite;
}

.car-unit {
    min-width: 100px;
}

.floor-label {
    background-color: cadetblue;
    color: var(--main-bg-color);
    cursor: default;
}

.car-unit-label {
    margin: 0 auto;
}

.dummy-btn {

    background-color: var(--main-bg-color);
    color: var(--main-bg-color);
    transition: border-color 0s;
}

.car-units-group.selected .dummy-btn {
    background-color: var(--selected-unit-bg-color);
    color: var(--selected-unit-bg-color);
}

.dummy-btn:hover {
    border: 1px solid var(--main-bg-color);
}

.car-units-group.selected .dummy-btn:hover {
    border: 1px solid var(--selected-unit-bg-color);
}
</style>
