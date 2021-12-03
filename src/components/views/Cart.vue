<template>
  <div class="container m-4">
    <div class="card">
      <div class="row">
        <div class="col-md-12 cart">
          <div class="title">
            <div class="row">
              <div class="col">
                <h4><b>Корзина</b></h4>
              </div>
              <div class="col align-self-center text-right text-muted">
                Количество позиций: {{ cartData.length }}
              </div>
            </div>
          </div>

          <div
            v-for="(itemProduct, key) in cartData"
            :key="key"
            class="row border-top border-bottom"
          >
            <div class="row main align-items-center">
              <div class="col">
                <div class="row text-muted">
                  {{ nameTable[itemProduct.G].G }}
                </div>
                <div class="row">
                  {{ nameTable[itemProduct.G].B[itemProduct.T].N }}
                </div>
              </div>
              <div class="col">
                <div class="col-6">
                  <div class="input-group">
                    <button
                      @click="
                        itemProduct.count > 1 && itemProduct.count--;
                        refreshSummary();
                      "
                      class="btn btn-outline-secondary"
                      type="button"
                    >
                      -
                    </button>
                    <input
                      v-model="itemProduct.count"
                      min="1"
                      :max="itemProduct.P"
                      class="form-control count"
                    />
                    <button
                      @click="
                        itemProduct.count < itemProduct.P &&
                          itemProduct.count++;
                        refreshSummary();
                      "
                      class="btn btn-outline-secondary"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div class="col">
                {{
                  new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  }).format(itemProduct.curentPrice)
                }}
                <a
                  @click.prevent="cartData.splice(key, 1)"
                  title="Удалить"
                  href="#"
                  class="close"
                  >&#10005;</a
                >
              </div>
            </div>
          </div>

          <div class="mt-3">
            <div class="row">
              <div class="col">
                <h6 class="float-end"><b>Общая стоимость</b></h6>
              </div>
              <div class="col float-end">
                {{
                  new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  }).format(summary)
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    cartData: Array,
    nameTable: Object,
  },
  data() {
    return {
      summary: 0,
    };
  },
  methods: {
    // Обновить общую стоимость
    refreshSummary() {
      this.summary = 0;
      // проходим по каждуму элементу корзины и добавляем в стоимость
      this.cartData.forEach((item) => {
        this.summary += item.curentPrice * item.count;
      });
    },
  },
  watch: {
    // вочер на изменение данных корзины
    cartData: function () {
      // Обновить общую стоимость
      this.refreshSummary();
    },
  },
};
</script>

<style scoped>
body {
  background: #ddd;
  min-height: 100vh;
  vertical-align: middle;
  display: flex;
  font-family: sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
}

.btn {
  height: 46px;
}

.count {
  margin: 0;
}

.title {
  margin-bottom: 5vh;
}

.card {
  margin: auto;
  max-width: 950px;
  width: 90%;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 1rem;
  border: transparent;
}

@media (max-width: 767px) {
  .card {
    margin: 3vh auto;
  }
}

.cart {
  background-color: #fff;
  padding: 4vh 5vh;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
}

@media (max-width: 767px) {
  .cart {
    padding: 4vh;
    border-bottom-left-radius: unset;
    border-top-right-radius: 1rem;
  }
}

.summary {
  background-color: #ddd;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 4vh;
  color: rgb(65, 65, 65);
}

@media (max-width: 767px) {
  .summary {
    border-top-right-radius: unset;
    border-bottom-left-radius: 1rem;
  }
}

.summary .col-2 {
  padding: 0;
}

.summary .col-10 {
  padding: 0;
}

.row {
  margin: 0;
}

.title b {
  font-size: 1.5rem;
}

.main {
  margin: 0;
  padding: 2vh 0;
  width: 100%;
}

.col-2,
.col {
  padding: 0 1vh;
}

a {
  padding: 0 1vh;
}

.close {
  margin-left: auto;
  font-size: 0.7rem;
}

img {
  width: 3.5rem;
}

.back-to-shop {
  margin-top: 4.5rem;
}

h5 {
  margin-top: 4vh;
}

hr {
  margin-top: 1.25rem;
}

form {
  padding: 2vh 0;
}

select {
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 1.5vh 1vh;
  margin-bottom: 4vh;
  outline: none;
  width: 100%;
  background-color: rgb(247, 247, 247);
}

input {
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 1vh;
  margin-bottom: 4vh;
  outline: none;
  width: 100%;
  background-color: rgb(247, 247, 247);
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}

a {
  color: black;
  text-decoration: none;
}

a:hover {
  color: black;
  text-decoration: none;
}

#code {
  background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.253),
      rgba(255, 255, 255, 0.185)
    ),
    url("https://img.icons8.com/small/16/000000/long-arrow-right.png");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: center;
}
</style>
