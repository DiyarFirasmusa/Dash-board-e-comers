export interface Customer {
  id: string,
  title: string,
  location: string,
}

export const QueryKeys = {
  getAll: 'customers-get-all',
  getSingle: 'customers-get-single',
  update: 'customers-update',
  create: 'customers-create',
} as const


export const Permissions = {
  get: 'GetCustomerDetailsRequest',
  getAll: 'GetAllCustomersRequest',
  getDeleted: 'GetDeletedCustomersRequest',
  update: 'UpdateCustomerRequest',
  create: 'CreateCustomerRequest',
  delete: 'DeleteCustomerRequest',
}
