<template>
  <stripe-checkout
    ref="checkoutRef"
    :pk="publishableKey"
    :items="items"
    :successUrl="successUrl"
    :cancelUrl="cancelUrl"
  >
    <template slot="checkout-button">
      <button @click="checkout">Shut up and take my money!</button>
    </template>
  </stripe-checkout>
</template>

<script src="https://js.stripe.com/v3/"></script>
 
<script>
import { StripeCheckout } from 'vue-stripe-checkout';
export default {
  components: {
    StripeCheckout
  },
  data: () => ({
    loading: false,
    publishableKey: "sk_test_51H8VsYHbvwihiYLBMeKcZxUZOuKsnq3U4oaEkBUGlSUCYXDGiHEtoWKC19vo2UOt8ED3PQweV8i0wu57ERtZDIVc00zt2HDElS",
    items: [
      {
        sku: 'prod_HhvouBnI5nXx46', 
        quantity: 1
      }
    ],
    successUrl: 'your-success-url',
    cancelUrl: 'your-cancel-url',
  }),
  methods: {
    checkout () {
      this.$refs.checkoutRef.redirectToCheckout();
    }
  }
}
</script> 