/** @type {import("vite").UserConfig} */
export default {
  test: {
    setupFiles: ["test/testing.mts"],
    passWithNoTests: true,
    forceRerunTriggers: ["**"],
  },
};
