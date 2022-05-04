import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../store/reducers";
import BasicLayout from "../layout/Basic";

const store = createStore(rootReducer);

function MyApp({ Component, pageProps }) {
  return (
    <BasicLayout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </BasicLayout>
  );
}

export default MyApp;
