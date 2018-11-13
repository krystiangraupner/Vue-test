<template>
<div>
    <b-card :title="`${product.name}`" tag="article" :footer="`Last updated ${product.minuteDiff} mins ago`" footer-tag="footer" class="mb-2">
        <b-container class="bv-row">
            <b-row>
                <b-col cols="4">
                    <p class="card-text">
                        <b>Department</b>
                    </p>
                </b-col>
                <b-col cols="4">
                    <p class="card-text">
                        {{ product.department }}
                    </p>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="4">
                    <p class="card-text">
                        <b>Price</b>
                    </p>
                </b-col>
                <b-col cols="4">
                    <p class="card-text">
                        {{ product.price | currency }}
                    </p>
                </b-col>
            </b-row>
            <b-row style="margin-top: 35px;">
                <b-col cols="4">
                    <p class="card-text">
                       <b>Status</b>
                    </p>
                </b-col>
                <b-col cols="4">
                    <b-badge variant="success">{{ product.status | formatStatus }}</b-badge>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
</div>
</template>

<script>
import productService from "@/services/product";

export default {
  name: "item",
  data() {
    return {
      product: {
        name: "",
        department: "",
        price: "",
        status: "",
        date: "",
        minuteDiff: 0
      }
    };
  },
  beforeMount() {
    this.loadProduct();
  },
  methods: {
    loadProduct() {
      let serverProduct = productService.get(this.$route.params.id);
      this.product.name = serverProduct.name;
      this.product.department = serverProduct.department;
      this.product.price = serverProduct.price;
      this.product.status = serverProduct.status;
      this.product.date = serverProduct.date;
      this.product.minuteDiff = Math.floor(
        Math.abs(new Date() - new Date(this.product.date)) / 1000 / 60
      );
    }
  }
};
</script>
