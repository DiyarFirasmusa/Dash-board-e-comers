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

] as (NavigationItem | NavigationHeader)[]
