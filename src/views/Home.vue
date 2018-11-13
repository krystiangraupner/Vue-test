<template>
<div class="home">
    <b-form>
        <b-input v-model="filterList" class="mb-2 mr-sm-2 mb-sm-0" size="lg" placeholder="Search..." />
    </b-form>
    <b-table :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" bordered striped hover :items="filteredProducts" :fields="tableFields" @row-clicked="clickHandler" @row-hovered="rowPointer">
        <template slot="name" slot-scope="data" @click="this.$router.push(data.item.id)">
            {{ data.item.name }}
        </template>
        <template slot="department" slot-scope="data" @click="this.$router.push(data.item.id)">
            {{ data.item.department }}
        </template>
        <template slot="price" slot-scope="data" @click="this.$router.push(data.item.id)">
            {{ data.item.price | currency }}
        </template>
        <template slot="date" slot-scope="data" @click="this.$router.push(data.item.id)">
            {{ data.item.date | moment("DD/MM/YYYY [às] HH:mm") }}
        </template>
        <template slot="status" slot-scope="data" @click="this.$router.push(data.item.id)">
            {{ data.item.status | formatStatus }}
        </template>
    </b-table>
    <p>
        Sorting By: <b>{{ sortBy }}</b>,
        Sort Direction: <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </p>
</div>
</template>

<script>
// @ is an alias to /src
import productService from "@/services/product";

export default {
  name: "home",
  components: {},
  data() {
    return {
      sortBy: "name",
      sortDesc: false,
      products: productService.list(),
      tableFields: [
        { key: "name", label: "Product", sortable: true },
        { key: "department", label: "Department", sortable: true },
        { key: "price", label: "Price", sortable: true },
        { key: "date", label: "Last Modified", sortable: true },
        { key: "status", label: "Status", sortable: true }
      ],
      filterList: ""
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(
        p =>
          p.name.toLowerCase().includes(this.filterList.toLowerCase()) ||
          p.department.toLowerCase().includes(this.filterList.toLowerCase())
      );
    }
  },
  methods: {
    clickHandler(item) {
      this.$router.push({ name: "item", params: { id: item.id } });
    },
    rowPointer() {
      this.$el.style.cursor = "pointer";
    }
  }
};
</script>

<style lang="stylus" scoped>
form {
    margin-bottom: 30px;
}
</style>
