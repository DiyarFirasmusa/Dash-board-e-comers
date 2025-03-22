import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import type { Customer } from './types';
import GlobalTableHeader from '@/components/table/GlobalTableHeader.vue';
import type { FilterField } from '@/utils/filters/types/filters';
import TableActions from './components/TableActions.vue';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US') + ' ' + date.toLocaleTimeString('en-US');
};

export const URL = '/item';

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'img',
    header: () => h(GlobalTableHeader, { label: 'Img' }),
    cell: ({ row }) => h('p', { class: 'text-start' }, row.getValue('img'))
  },
  {
    accessorKey: 'name',
    header: () => h(GlobalTableHeader, { label: 'Name' }),
    cell: ({ row }) => h('p', { class: 'text-start' }, row.getValue('name'))
  },
  {
    accessorKey: 'price',
    header: () => h(GlobalTableHeader, { label: 'Price' }),
    cell: ({ row }) => h('p', { class: 'text-start' }, row.getValue('price'))
  },
  {
    accessorKey: 'categoryTitle',
    header: () => h(GlobalTableHeader, { label: 'CategoryTitle' }),
    cell: ({ row }) => h('p', { class: 'text-start' }, row.getValue('categoryTitle'))
  },
  {
    accessorKey: 'storageTitle',
    header: () => h(GlobalTableHeader, { label: 'StorageTitle' }),
    cell: ({ row }) => h('p', { class: 'text-start' }, row.getValue('storageTitle'))
  },
  
  {
    accessorKey: 'colors',
    header: () => h(GlobalTableHeader, { label: 'Name Color' }),
    cell: ({ row }) => {
      const colors = row.getValue('colors') as Array<{name: string;}>;
      const firstColor = colors[0];
      const nameColor = firstColor.name
      return h('p', { class: 'text-start' }, nameColor);
    }
  },
  {
    accessorKey: 'colors',
    header: () => h(GlobalTableHeader, { label: 'HexColor' }),
    cell: ({ row }) => {
      const colors = row.getValue('colors') as Array<{
        hexColor: string;
      }>;
      const firstColor = colors[0];
      const hexColor = firstColor.hexColor
      return h('p', { class: 'text-start' }, hexColor);
    }
  },
  {
    accessorKey: 'colors',
    header: () => h(GlobalTableHeader, { label: 'Size Number' }),
    cell: ({ row }) => {
      const colors = row.getValue('colors') as Array<{
        sizes: Array<{ number: number }>;
      }>;
      const firstColor = colors[0];
      const firstSize = firstColor ? firstColor.sizes[0] : null;
      const sizeNumber = firstSize ? firstSize.number : 'N/A';
      return h('p', { class: 'text-start' }, sizeNumber);
    }
  },  {
    accessorKey: 'colors',
    header: () => h(GlobalTableHeader, { label: 'Size Count' }),
    cell: ({ row }) => {
      const colors = row.getValue('colors') as Array<{
        sizes: Array<{ count: number }>;
      }>;
      const firstColor = colors[0];
      const firstSize = firstColor ? firstColor.sizes[0] : null;
      const sizeNumber = firstSize ? firstSize.count : 'N/A';
      return h('p', { class: 'text-start' }, sizeNumber);
    }
  },
  {
    accessorKey: 'actions',
    minSize: 20,
    header: () => h(GlobalTableHeader, { label: 'Actions', class: 'text-center' }),
    cell: ({ row }) => h(TableActions, { ...row.original })
  },
];

export const mainFilters: FilterField = {
  key: 'name',
  label: 'name',
  type: 'text'
};