import type { NavigationHeader, NavigationItem } from "./types";

export default [
  {
    title: "Deparments",
    header: true,
  },
  {
    title: "Home",
    icon: 'tabler-home',
    to: '/',
  },
  {
    title: "category",
    icon: 'tabler-category',
    to: '/category',
  },
  {
    title: "storage",
    icon: 'tabler-building-warehouse',
    to: '/storage',
  },
  {
    title: "item",
    icon: 'tabler-archive',
    to: '/items',
  },

] as (NavigationItem | NavigationHeader)[]
