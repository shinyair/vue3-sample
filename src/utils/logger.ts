import * as loglevel from "loglevel";
import * as prefix from "loglevel-plugin-prefix";
import { MODE, LOG_MIN_LEVEL } from "@/constants/env";

const log = loglevel.getLogger(MODE);
log.setLevel(LOG_MIN_LEVEL || "info");
prefix.reg(loglevel);
prefix.apply(log, {
  template: "[%t] %n %l:",
  levelFormatter: function (level) {
    return level.toUpperCase();
  },
  nameFormatter: function (name) {
    return name || "root";
  },
  timestampFormatter: function (date) {
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  },
});
export default log;
