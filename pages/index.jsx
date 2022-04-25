import BasicLayout from "../layout/Basic";
import HomeScreen from "../src/modules/home/screens/Home";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../store/reducers";

const store = createStore(rootReducer);

const Home = () => {
  return (
    <BasicLayout>
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    </BasicLayout>
  );
};

export default Home;
