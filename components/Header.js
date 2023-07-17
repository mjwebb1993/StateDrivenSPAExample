import html from "html-literal";
export default state => html`
  <header>
    <h1>Example SPA: ${state.heading}</h1>
  </header>
`;
