declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.data.ts" {
  const data: any;

  export { data };
}
