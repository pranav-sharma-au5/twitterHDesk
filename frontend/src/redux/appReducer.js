const initialState = {}

function appReducer(state = initialState, action) {
  const stateCopy = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "value":

      return stateCopy;

    default:
      return stateCopy;
  }


}

export default appReducer