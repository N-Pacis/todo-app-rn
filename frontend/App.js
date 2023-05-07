import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TodoList from "./src/screens/TodoList";
import NewTodo from "./src/screens/NewTodo";

const navigator = createStackNavigator(
  {
    Home: TodoList,
    NewTodo: NewTodo
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Todo List",
    },
  }
);

export default createAppContainer(navigator);
