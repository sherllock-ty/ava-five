export enum Roles {
    CUSTOMER = 'CUSTOMER',
    OWNER = 'OWNER',
  }
  export const rolesArray = Object.keys(Roles).map((key) => Roles[key]);
  