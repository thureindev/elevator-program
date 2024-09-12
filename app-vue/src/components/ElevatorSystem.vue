<script setup>
import { ref, computed } from 'vue'
import CarUnit from './CarUnit.vue';
import Building from './Building.vue';
import CarUnitModel from '../models/CarUnitModel';

// config 
// 'us' or 'uk' (actually, the rest of the world)
const floorIndicator = ref('us');
const totalFloors = ref(8);

// floors
const floors = computed(() =>
  Array.from({ length: totalFloors.value }, (_, idx) => floorIndicator.value === 'us' ? ++idx : idx === 0 ? 'G' : idx)
);

// const cars = ref(Array.from({ length: 3 }, () => new CarUnitModel(floors, 0)));
const cars = ref([new CarUnitModel(floors, 0, 101), new CarUnitModel(floors, 3, 102), new CarUnitModel(floors, 5, 103)]);
const selectedCar = ref(null);

const updateSelectedCar = (selectedCarIdx) => {
  cars.value.map((ele, idx) => idx === selectedCarIdx ? ele.isSelected = true : ele.isSelected = false);
  selectedCar.value = cars.value[selectedCarIdx];
}
updateSelectedCar(0);

</script>

<template>
  <h1>Elevator</h1>

  <!-- Configs -->
  <div class="config-panel">
    <label for="totalFloors">Total Floors:</label>
    <input v-model="totalFloors" id="totalFloors" type="number" min="2" max="100" step="1">
    <br>
    <label for="floorIndicator">Floor Indicator:</label>
    <select v-model="floorIndicator" id="floorIndicator" name="floorIndicator">
      <option value="us">US system</option>
      <option value="uk">British system</option>
    </select>
  </div>
  <!-- ----- ----- ----- -->

  <div class="simulation-container">
    <Building :floors="floors" :carUnits="cars" @update-selected-car="updateSelectedCar" />
    <CarUnit :floors="floors" :selectedCar="selectedCar" />
  </div>

</template>

<style scoped>
.config-panel {
  margin: 20px auto;
}

.simulation-container {
  display: flex;
  flex-direction: row;
  /* max-width: 480px; */
}

@media screen and (max-width: 480px) {
  .simulation-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
