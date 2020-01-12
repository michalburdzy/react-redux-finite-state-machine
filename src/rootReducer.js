const fakeFetch = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      Math.random() > 0.7
        ? res({ message: "data success" })
        : rej(new Error("Can't fetch the data"));
    });
  });

const RootReducer = {
  machineState: {
    name: "idle"
  },
  state: {
    data: {}
  },
  transitions: {
    idle: {
      GET_DATA: async function() {
        this.setStateTo("fetchData");
        try {
          const data = await fakeFetch();
          this.dispatch("success", data);
        } catch (error) {
          this.dispatch("failure", error);
        }
      }
    },
    fetchData: {
      success: function(data) {
        this.setStateTo("idle", data);
        return this.state.data;
      },
      failure: function(err) {
        this.setStateTo("idle", {});
        return {
          message: "ERROR!!!!"
        };
      }
    }
  },
  dispatch(actionName, ...payload) {
    const action = this.transitions[this.machineState.name][actionName];
    if (action) {
      action.apply(this, ...payload);
    }
  },
  setStateTo(newStateName, newData) {
    if (this.transitions[newStateName]) {
      this.machineState.name = newStateName;
      this.state.data = newData;
    }
  },
  reduxReducer(state, action) {
    return this.dispatch(action.type);
  }
};
const { reduxReducer } = RootReducer;
export default reduxReducer.bind(RootReducer);
