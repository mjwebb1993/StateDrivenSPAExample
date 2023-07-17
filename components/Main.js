import * as views from "./views";

export default state => `
  ${views[state.view](state)}
`;
