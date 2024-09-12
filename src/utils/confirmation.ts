import type { Action } from "element-plus";
import { ElMessageBox } from "element-plus";
import { i18n } from "@/i18n";

export const notify = (
  message: string,
  title?: string,
  calllback?: () => void,
) => {
  ElMessageBox.alert(message, title || "", {
    confirmButtonText: i18n.global.t("common.ok"),
    showClose: false,
    callback: () => {
      if (calllback) {
        calllback();
      }
    },
  });
};

export const confirm = (
  message: string,
  title?: string,
  okCallback?: () => void,
  cancelCallback?: () => void,
) => {
  ElMessageBox.confirm(message, title || "", {
    confirmButtonText: i18n.global.t("common.ok"),
    cancelButtonText: i18n.global.t("common.cancel"),
    showClose: false,
    callback: (action: Action) => {
      if (action === "confirm") {
        if (okCallback) {
          okCallback();
        }
      } else {
        if (cancelCallback) {
          cancelCallback();
        }
      }
    },
  });
};
