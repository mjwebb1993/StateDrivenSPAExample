import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";

import Navigo from "navigo";
import { capitalize } from "lodash";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(state)}
  ${Nav(store.Links)}
  ${Main(state)}
  ${Footer()}
`;

  router.updatePageLinks();

  afterRender(state);
}

function afterRender(state) {
  // add event listeners to Nav items for navigation
  document.querySelectorAll("nav a").forEach(navLink =>
    navLink.addEventListener("click", event => {
      event.preventDefault();
      render(store[event.target.title]);
    })
  );

  // add menu toggle to bars icon in nav bar
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );

    if (state.view === "Order") {
      document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        const inputList = event.target.elements;

        const toppings = [];
        for (let input of inputList.toppings) {
          if (input.checked) {
            toppings.push(input.value);
          }
        }
        const requestData = {
          crust: inputList.crust.value,
          cheese: inputList.cheese.value,
          sauce: inputList.sauce.value,
          toppings: toppings,
          customer: "~Update with YOUR name~",
        };

        store.Pizza.pizzas.push(requestData);
        router.navigate("/Pizza");
      });
    }
}

router
  .on({
    "/": () => {
      render();
    },
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
    }
  })
  .resolve();
