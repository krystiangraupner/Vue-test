<template>
  <div>
    <b-alert dismissible variant="success" :show="!!lastCreatedProduct.name">
      Product <strong>{{lastCreatedProduct.name}}</strong> was created! Department: {{lastCreatedProduct.department}}; Price: {{lastCreatedProduct.price}};  Status: {{lastCreatedProduct.status}}.
    </b-alert>
    <b-card title="Create Product">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group label="Product:" label-for="name">
          <b-form-input id="name" type="text" v-model="product.name" required placeholder="Enter product name" v-focus>
          </b-form-input>
        </b-form-group>
        <b-form-group label="Department:" label-for="department">
          <b-form-input id="department" type="text" v-model="product.department" required placeholder="Enter department name">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Price:" label-for="price">
          <b-form-input id="price" type="text" v-model.lazy="product.price" v-money="money" required placeholder="Enter product price">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Status:" label-for="status">
          <b-form-radio-group id="radios" v-model="product.status" :options="options" name="radioOpenions">
          </b-form-radio-group>
        </b-form-group>
        <hr class="ruler">
        <b-button type="submit" variant="outline-success">Save Product</b-button>
        <b-button type="reset" variant="outline-secondary" :to="{name: 'list'}" tag="div">Cancel</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import productService from "@/services/product";
import { VMoney } from "v-money";

export default {
  data() {
    return {
      product: {
        name: "",
        department: "",
        price: "",
        status: ""
      },
      show: true,
      lastCreatedProduct: {},
      selected: "first",
      options: [
        {
          text: "Active",
          value: "PROD_ACTIVE"
        },
        {
          text: "Inactive",
          value: "PROD_INACTIVE"
        }
      ],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.product.price = this.product.price
        .substr(this.product.price.indexOf(" "), this.product.price.length)
        .replace(/\./g, "")
        .replace(/\,/g, ".");
      productService.create(this.product);
      this.lastCreatedProduct = {
        ...this.product
      };
      this.onReset();
    },
    onReset(evt) {
      if (evt) evt.preventDefault();
      /* Reset our form values */
      this.product.name = "";
      this.product.department = "";
      this.product.price = "";
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      }
    },
    money: VMoney
  }
};
</script>

<style lang="stylus" scoped>
form {
  button[type='submit'] {
    margin-right: 10px;
  }
}
</style>
