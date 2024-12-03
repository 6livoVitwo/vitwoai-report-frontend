import { Provider } from "react-redux";
import Store from "../store/store";
import Holder from "./Holder";

const RouteHolder = () => {
  // const multiTheme = useSelector((state) => state.multitheme.currentTheme);
  // console.log('🔵',{ multiTheme });
  return (
    <Provider store={Store}>
      <Holder />
    </Provider>
  );
};

export default RouteHolder;