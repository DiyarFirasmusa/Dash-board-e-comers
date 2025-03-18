import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Customer } from './types'
import GlobalTableHeader from '@/components/table/GlobalTableHeader.vue'
import type { FilterField } from '@/utils/filters/types/filters'
import TableActions from './components/TableActions.vue'
import { computed } from 'vue'
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US') + ' ' + date.toLocaleTimeString('en-US');
};

export const URL = '/category';
export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'title',
    header: () => h(GlobalTableHeader, { label: 'Title' }),
    cell: ({ row }) => h('p', { class: 'text-start' }, row.getValue('title'))
  },
  {
    accessorKey: 'creationDate',
    header: () => h(GlobalTableHeader, { label: 'Creation Date' }),
    cell: ({ row }) => h('p', { class: 'text-start' }, formatDate(row.getValue('creationDate'))),
  },
  {
    accessorKey: 'actions',
    minSize: 20,
    header: () => h(GlobalTableHeader, { label: 'Actions', class: 'text-center' }),
    cell: ({ row }) => h(TableActions, { ...row.original })
  },
]

export const mainFilters: FilterField = {
  key: 'title',
  label: 'Title',
  type: 'text'
}

