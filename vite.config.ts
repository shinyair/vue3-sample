import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv, PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const appendSentryPlugin = (mode: string, plugins: PluginOption[]) => {
  const isSentryEnabled = process.env.SENTRY_UPLOAD_SOURCE_MAP === "true";
  if (!isSentryEnabled) {
    return plugins;
  }
  console.log("sentry plugin enabled");
  return [
    ...plugins,
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: {
        name: mode,
        dist: mode,
      },
    }),
  ];
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  let plugins = [vue()];
  plugins = appendSentryPlugin(mode, plugins);

  return {
    plugins: plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      sourcemap: true,
    },
  };
});
