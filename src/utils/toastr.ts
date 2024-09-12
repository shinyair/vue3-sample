import { ElNotification } from "element-plus";

export const toastrInfo = (message: string) => {
  ElNotification.info({
    message: message,
    position: "bottom-left",
  });
};

export const toastrSuccess = (message: string) => {
  ElNotification.success({
    message: message,
    position: "bottom-left",
  });
};

export const toastrWarning = (message: string) => {
  ElNotification.warning({
    message: message,
    position: "bottom-left",
  });
};

export const toastrError = (message: string) => {
  ElNotification.error({
    message: message,
    position: "bottom-left",
  });
};
