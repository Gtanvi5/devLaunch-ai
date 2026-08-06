export {};

declare global {
  interface CustomJwtSessionClaims {
    publicMetadata: {
      subscription_status?: string;
    };
    org_metadata?: {
      plan?: string;
      razorpay_customer_id?: string;
    };
  }
}
