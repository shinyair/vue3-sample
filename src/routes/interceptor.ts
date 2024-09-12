import { router } from "./router";
import { PATHS } from "./path";
import { useUserStore } from "../stores/user";
import { replaceParams } from "../utils/str";

router.beforeEach((to) => {
  const userStore = useUserStore();
  // check user login status
  if (!!to.meta.requiresAuth && !userStore.isSignedIn) {
    return {
      name: PATHS.auth.children.signIn.name,
      query: {
        redirect: to.fullPath,
      },
    };
  }
  // check user permission
  if (to.meta.requiredPermission) {
    const requiredPermission = replaceParams(
      to.meta.requiredPermission,
      to.params,
    );
    const isPermitted = userStore.hasPermission(requiredPermission);
    if (!isPermitted) {
      return {
        name: PATHS.forbidden.name,
      };
    }
  }
});
