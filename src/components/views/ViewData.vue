<template>
  <div>
    <div class="mb-3 mt-4">
      <label for="dollarRate" class="form-label">Курс доллара</label>
      <input
        v-model="dollarRate"
        type="number"
        min="0"
        class="form-control"
        id="dollarRate"
      />
    </div>
    <div class="col-auto">
      <button @click.prevent="getDataProduct()" class="btn btn-primary mb-3">
        Обновить данные
      </button>
    </div>
    <div class="row">
      <div
        v-for="(itemProductGroup, key) in dataProduct"
        :key="key"
        class="accordion col-6 mb-3"
        id="accordionPanelsStayOpenExample"
      >
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#panelsStayOpen-collapse${key}`"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              {{ nameTable[itemProductGroup.groupId].G }}
            </button>
          </h2>
          <div
            :id="`panelsStayOpen-collapse${key}`"
            class="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div class="accordion-body">
              <table class="table table-striped">
                <tbody>
                  <tr
                    v-for="(itemProduct, keyProduct) in itemProductGroup.items"
                    :key="keyProduct"
                  >
                    <td class="col-8">
                      {{
                        nameTable[itemProductGroup.groupId].B[itemProduct.T].N
                      }}({{ itemProduct.P }})
                    </td>
                    <td
                      class="col-3"
                      :class="{
                        'bg-danger text-white':
                          itemProduct.curentPrice > itemProduct.lastPrice,
                        'bg-success text-white':
                          itemProduct.curentPrice < itemProduct.lastPrice,
                      }"
                    >
                      {{
                        new Intl.NumberFormat("ru-RU", {
                          style: "currency",
                          currency: "RUB",
                        }).format(itemProduct.curentPrice)
                      }}
                    </td>
                    <td class="col-1">
                      <a @click.prevent="addToCart(itemProduct)" href="#">+</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Cart :cartData="cartData" :nameTable="nameTable" />
  </div>
</template>

<script>
import Cart from "./../views/Cart.vue";
let lastPriceList = {};

export default {
  name: "ViewData",
  components: {
    Cart,
  },
  data() {
    return {
      dataProduct: [],  // все товары по группам
      nameTable: {},    // Таблица наименований
      dollarRate: 70,   // Курс Доллара
      cartData: [],     // Корзина
    };
  },
  mounted() {
    //получение данных каждые 15 сек
    setInterval(() => {
      this.getDataProduct();
    }, 15 * 1000);

    //Получить таблицу наименований
    this.getNameTable();
  },
  methods: {
    // Добавить в карзину
    addToCart(addItem) {
      let itemProduct = Object.assign({}, addItem);
      const index = this.cartData.findIndex((item) => item.T === addItem.T);
      if (index > -1) {
        alert("Товар уже в корзине");
      } else {
        itemProduct.count = 1;
        this.cartData.push(itemProduct);
      }
    },
    // получить рубли с пересчетом по текущему курсу
    getRubles(value) {
      return this.dollarRate * value;
    },
    // Получить список товаров
    getDataProduct() {
      this.$UserService.getHttp("/data.json").then((response) => {
        if (response) {
          // если данные не пусты
          if (
            response.data &&
            response.data.Value &&
            response.data.Value.Goods
          ) {
            // запомним последнюю цену
            this.dataProduct.forEach((itemGroup) => {
              itemGroup.items.forEach((itemProduct) => {
                const curentPrice = response.data.Value.Goods.find(
                  (itemNewData) => itemNewData.T === itemProduct.T
                ).C;
                if (this.getRubles(curentPrice) != itemProduct.curentPrice) {
                  lastPriceList[itemProduct.T] = itemProduct.curentPrice;
                }
              });
            });
            // обнуляем список товаров
            this.dataProduct = [];
            // проходим по каждому товару
            response.data.Value.Goods.map((item) => {
              // устанавливаем цены с учетом курса
              item.curentPrice = this.getRubles(item.C);
              item.lastPrice = lastPriceList[item.T];
              // Создаем пустую группу для добавления в нее товаров
              this.dataProduct.findIndex(
                (itemFind) => itemFind.groupId === item.G
              ) === -1 && this.dataProduct.push({ groupId: item.G, items: [] });
              // ищем группу, в которую поместим товар
              const curendGroupIndex = this.dataProduct.findIndex(
                (itemFind) => itemFind.groupId === item.G
              );
              // добавляем товар в свою группу
              this.dataProduct[curendGroupIndex].items.push(item);
            });
          }
        }
      });
    },
    // Получить таблицу наименований
    getNameTable() {
      this.$UserService.getHttp("/names.json").then((response) => {
        if (response.data) {
          this.nameTable = response.data;
          //инициируем получение данных после получения таблицы наименований
          this.getDataProduct();
        }
      });
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}

.accordion-body {
  padding: 0;
}

.table {
  margin: 0;
}
</style>
