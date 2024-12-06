import { Provider } from "react-redux";
import Store from "../store/store";
import Holder from "./Holder";

const RouteHolder = () => {
  return (
    <Provider store={Store}>
      <Holder />
    </Provider>
  );
};

export default RouteHolder;