import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngridients = () => {
  return (
    <section>
      <h1>Соберите бургер</h1>
      <div className="">
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    </section>
  )
}

export default BurgerIngridients;