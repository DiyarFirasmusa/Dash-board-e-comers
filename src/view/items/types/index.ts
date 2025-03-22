export interface Customer {
  id: string,
  name: string,
  price: number,
  img: string,
  colors: [
    {
      name: string,
      hexColor: string,
      sizes: [
        {
          number: number,
          count: number
        }
      ]
    }
  ],
  categoryTitle: string,
  storageTitle: string,
  categoryId: string,
  storageId: string
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
