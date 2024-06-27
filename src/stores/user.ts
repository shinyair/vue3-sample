import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { clearJWT } from "@/apis/jwt";
import { signIn as apiSignIn } from "@/apis/auth";
import { STORAGE_USER_KEY } from "@/constants/localstorage";

export interface User {
  userId: string;
  email: string;
  name?: string;
  avatar?: string;
}

const getUser = () => {
  return localStorage.getItem(STORAGE_USER_KEY) || "";
};
const setUser = (newValue: string) => {
  localStorage.setItem(STORAGE_USER_KEY, newValue);
};
const clearUser = () => {
  localStorage.removeItem(STORAGE_USER_KEY);
};

export const useUserStore = defineStore("user", () => {
  const storedUserJson = getUser();
  const storedUser = storedUserJson ? JSON.parse(storedUserJson) : undefined;

  const user = ref<User | undefined>(storedUser);
  const userId = computed(() => {
    return user.value ? user.value.userId : undefined;
  });
  const isSignedIn = computed(() => {
    return !!user.value;
  });
  const signIn = async (email: string, password: string) => {
    const response = await apiSignIn(email, password);
    if (response.failureResponse) {
      return response.failureResponse.errorType;
    }
    if (response.sucResponse) {
      user.value = {
        userId: response.sucResponse.user.userId,
        name: response.sucResponse.user.name,
        email: response.sucResponse.user.email,
        avatar: response.sucResponse.user.avatar,
      };
      setUser(JSON.stringify(user.value));
    }
    return;
  };
  const signOut = () => {
    user.value = undefined;
    clearUser();
    clearJWT();
  };
  return { user, userId, isSignedIn, signIn, signOut };
});
