import { describe, expect, it } from "vitest";
import { Coffee } from "./barista";
import { Ingredient } from "./barista";
import { Barista } from "./barista";

describe("Coffee", () => {
  it("crée un café avec un nom et un prix", () => {
    const coffee = new Coffee("Cappuccino", 4);

    expect(coffee.name).toBe("Cappuccino");
    expect(coffee.price).toBe(4);
  });

  it("ajoute un ingrédient à la recette", () => {
    const coffee = new Coffee("Cappuccino", 3.5);

    coffee.addIngredient("soupe", 4);

    expect(coffee.ingredients).toStrictEqual([{name:"soupe", quantity:4 }]);
  });
});

describe("Ingredient", () => {
  it("ajoute une quantité au stock", () => {
    const chocolat = new Ingredient("Chocolat", 4);

    chocolat.addQuantity(4);

    expect(chocolat.quantity).toBe(8);

  });

  it("retire une quantité du stock", () => {
    const chocolat = new Ingredient("Chocolat", 8);

    chocolat.removeQuantity(4);

    expect(chocolat.quantity).toBe(4);
  });

  it("refuse de retirer une quantité supérieure au stock", () => {
    const chocolat = new Ingredient("Chocolat", 3);

    expect(chocolat.removeQuantity(4)).not.toBe(true);
  });
});

describe("Barista", () => {
  it("ajoute un café à sa liste de cafés", () => {
    const coffee = new Coffee("Cappuccino", 4);
    const barista = new Barista("Pierre");

    barista.addCoffee(coffee);

    expect(barista.listCoffees()).toContain(coffee);
  });

  it("retourne undefined lorsqu'un café n'existe pas", () => {
    const barista = new Barista("Pierre");

    expect(barista.getCoffee("Cappuccino")).toBe(undefined);
  });

  it("peut préparer un café lorsque tous les ingrédients sont disponibles", () => {

    const chocolatAuLait = new Coffee("chocolat au lait", 2.50);
    chocolatAuLait.addIngredient("chocolat",2);
    chocolatAuLait.addIngredient("lait",4);

    const barista = new Barista("Pierre");

    barista.addCoffee(chocolatAuLait);
    barista.addIngredient("chocolat",2);
    barista.addIngredient("lait",4);

    expect(barista.canMakeCoffee(chocolatAuLait)).toBe(true);

  });

  it("ne peut pas préparer un café lorsqu'un ingrédient est manquant", () => {
    const chocolatAuLait = new Coffee("chocolat au lait", 2.50);
    chocolatAuLait.addIngredient("chocolat",2);
    chocolatAuLait.addIngredient("lait",4);

    const barista = new Barista("Pierre");

    barista.addCoffee(chocolatAuLait);
    barista.addIngredient("lait",4);

    expect(barista.canMakeCoffee(chocolatAuLait)).toBe(false);
  });

  it("ne peut pas préparer un café lorsque la quantité est insuffisante", () => {
    const chocolatAuLait = new Coffee("chocolat au lait", 2.50);
    chocolatAuLait.addIngredient("chocolat",2);
    chocolatAuLait.addIngredient("lait",4);

    const barista = new Barista("Pierre");

    barista.addCoffee(chocolatAuLait);
    barista.addIngredient("chocolat",1);
    barista.addIngredient("lait",4);

    expect(barista.canMakeCoffee(chocolatAuLait)).toBe(false);
  });

  it("consomme les ingrédients lorsqu'il prépare un café", () => {
    const chocolatAuLait = new Coffee("chocolat au lait", 2.50);
    chocolatAuLait.addIngredient("chocolat",2);
    chocolatAuLait.addIngredient("lait",4);

    const barista = new Barista("Pierre");

    barista.addCoffee(chocolatAuLait);
    barista.addIngredient("chocolat",2);
    barista.addIngredient("lait",4);

    barista.makeCoffee(chocolatAuLait);

    expect(barista.ingredients).toStrictEqual([new Ingredient("chocolat",0),new Ingredient("lait",0)]);
  });

  it("ne consomme rien lorsqu'il ne peut pas préparer le café", () => {
    const chocolatAuLait = new Coffee("chocolat au lait", 2.50);
    chocolatAuLait.addIngredient("chocolat",2);
    chocolatAuLait.addIngredient("lait",4);

    const barista = new Barista("Pierre");

    barista.addCoffee(chocolatAuLait);
    barista.addIngredient("chocolat",1);
    barista.addIngredient("lait",4);

    barista.makeCoffee(chocolatAuLait);

    expect(barista.ingredients).toStrictEqual([new Ingredient("chocolat",1),new Ingredient("lait",4)]);
  });

  it("retourne le prix lorsqu'un café est commandé", () => {
    const chocolatAuLait = new Coffee("chocolat au lait", 2.50);
    chocolatAuLait.addIngredient("chocolat",2);
    chocolatAuLait.addIngredient("lait",4);

    const barista = new Barista("Pierre");

    barista.addCoffee(chocolatAuLait);
    barista.addIngredient("chocolat",2);
    barista.addIngredient("lait",4);


    expect(barista.orderCoffee("chocolat au lait")).toBe(2.50);
  });
});
