import { test, expect } from "@jest/globals";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { i18n } from "@/i18n";

test("App renders", () => {
  const wrapper = mount(App, {
    global: {
      plugins: [i18n],
      mocks: {
        $t: (msg) => msg,
      },
    },
  });
  expect(wrapper.text()).not.toBeNull();
});
