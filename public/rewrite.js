window.__API__ = {
  USERS: "https://users-api-clouac-c3akdxbqaebvczd9.brazilsouth-01.azurewebsites.net",
  PRODUCTS: "https://products-api-cloudac-hmbgdzgpbkh9hyfd.brazilsouth-01.azurewebsites.net"
};

(function () {
  const orig = window.fetch.bind(window);
  window.fetch = (input, init) => {
    if (typeof input === "string") {
      //  corregido: mapear /api/users -> /users
      if (input.startsWith("/api/users")) {
        input = window.__API__.USERS + input.replace("/api/users", "/users");
      // (no lo usamos, pero por consistencia)
      } else if (input.startsWith("/api/products")) {
        input = window.__API__.PRODUCTS + input.replace("/api/products", "/products");
      // nuestro alias "médicos" usa /products
      } else if (input.startsWith("/api/medicos")) {
        input = window.__API__.PRODUCTS + input.replace("/api/medicos", "/products");
      } else if (input.startsWith("/api/citas")) {
        input = window.__API__.PRODUCTS + input.replace("/api/citas", "/products");
      }
    }
    return orig(input, init);
  };
})();
