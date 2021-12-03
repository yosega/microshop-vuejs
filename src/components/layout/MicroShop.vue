<template>
  <div>
    <Header/>
      <main>
        <div class="container">
          <ViewData/>
        </div>
      </main>
  </div>
</template>

<script>
import Header from './Header.vue'
import ViewData from './../views/ViewData.vue'

export default {
  name: 'MicroShop',
  components: {
    Header,
    ViewData
  }
}
</script>

<style>
</style>
