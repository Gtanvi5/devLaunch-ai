export {};

declare global {
  interface CustomJwtSessionClaims {
    publicMetadata: {
      subscription_status?: string;
      razorpay_customer_id?: string;
    };
  }
}
