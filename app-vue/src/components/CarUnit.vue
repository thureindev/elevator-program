<script setup>
import { ref } from 'vue';
import CarUnitModel from '../models/CarUnitModel';

defineProps({
    floors: {
        type: Array,
        required: true,
    },
    selectedCar: {
        type: CarUnitModel,
        required: true,
    },
});

const currentFloorIdx = ref(0);
const carStatus = ref('static'); // static, moving
const doorStatus = ref('closed'); // closed, closing, opened, opening

const floorBtnSeq = ref([]);

const handleFloorBtn = (floorIdx) => {
    floorBtnSeq.push({
        user: 'admin',
        floorIdx: floorIdx,
    })
}

const moveCar = (floorIdx) => {
    if (currentFloorIdx !== floorIdx) {
        if (doorStatus !== closed) {
            // TODO: wait some seconds and then close
            //  //  wait some time

            //  //  start closing door
            doorStatus.value = 'closing';
            //  //  wait some time
            setTimeout(() => {

                doorStatus.value = 'closed';
                carStatus.value = 'moving';
                setTimeout(() => {

                    //  //  wait some time
                    currentFloorIdx.value = floorIdx
                    carStatus.value = 'static';
                }, 3000);
            }, 1800);

        }
    }
    else {
        // TODO: at the same level // remove the button light
    }
}
</script>

<template>
    <div class="car-unit">
        <div class="unit-panel">
            <div class="unit-interface">
                <h3>Elevator {{ selectedCar.carId }}</h3>
                <p>{{ carStatus }} {{ carStatus === 'static' ? ' at floor ' + floors[selectedCar.currentFloorIdx] : ''
                    }}</p>
                <p>Doors {{ doorStatus }}.</p>

                <button v-for="(fl, idx) in floors" type="button" class="btn-floor" @click="handleFloorBtn(idx)">{{ fl
                    }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.car-unit {
    flex: 1;
    flex-wrap: wrap;
}

.btn-floor {
    margin: 5px;
    border-color: #646cff;
}
.btn-floor:hover {
    border-color: ghostwhite;
}

.unit-interface {
    width: 280px;
}
</style>
