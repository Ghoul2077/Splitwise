import { Dispatch, MiddlewareAPI } from "redux";

const logger =
  ({ destination }: { destination: string }) =>
  (store: MiddlewareAPI) =>
  (next: Dispatch) =>
  (action: any) => {
    if (destination === "console") {
      console.log(JSON.stringify(store.getState(), null, 4));
    }

    next(action);
  };

export default logger;
