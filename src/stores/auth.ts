import { useCookie } from "@/composable/useCookie";
import router from "@/plugins/router";
import type { Currency } from "@/views/currencies/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const iraqiDinar = {
  symbol: 'IQD',
  code: 'IQD',
  name: 'Dinar',
  exchangeRate: 1,
};

export const useAuthStore = defineStore('auth-store', () => {
  const accessToken = computed(() => useCookie<string>('access-token'))
  const user = computed(() => useCookie('user-data'))
  const activeCurrency = ref<Currency>(JSON.parse(localStorage.getItem('currency') ?? JSON.stringify(iraqiDinar)))

  const setUserData = (user:any) => {
    useCookie('user-data').value = user ;
    console.log(user.role)
  }

  const login = (accessToken: string, refreshToken: string) => {
    useCookie('user-data').value = null;
    useCookie('access-token').value = accessToken;
    useCookie('refresh-token').value = refreshToken;
  }
  const logout = () => {
    useCookie('access-token').value = null;
    useCookie('refresh-token').value = null;
    useCookie('user-data').value = null;
    router.push('/login')
  }

  const rolePermissions = {
    SuperAdmin: ['products.create', 'products.edit', 'users.delete','products.view','products.search'],
    User: ['products.view']
  };

  const hasPermission = (permission: string) => {
    const userRole = useCookie('user-data').value.role
    console.log(userRole)
    return rolePermissions[userRole]?.includes(permission);
  };

  // const refreshAccessToken = async () => {
  //   const refreshToken = useCookie('refresh-token').value
  //   if (refreshToken) {
  //     const { data: { token, tokenExpire, refreshToken: responseRefreshToken, refreshTokenExpire } } = await $api_public.post('authentication/refresh-token', {
  //       refreshToken: refreshToken
  //     })
  //     login(token, new Date(tokenExpire), responseRefreshToken, new Date(refreshTokenExpire))
  //   } else {
  //     router.push('/login')
  //   }
  // }

  return {
    user,
    login,
    logout,
    setUserData,
    accessToken,
    // refreshAccessToken,
    activeCurrency,
    hasPermission
  }
})
