import ingridientType from "../../utils/prop-types"

const IngredientDetais = ({ ingredient }) => {
  return (
    <div className={styles.box}>
      <h1 className="">Детали ингредиента</h1>
      <img src={ingredient.image} alt={ingredient.name} className="" />
      <h2 className={ }>{ingredient.name}</h2>
      <div className="composition-box">
        <div className="composition_item">
          <p className="">Калории,ккал</p>
          <p className="">{ingredient.calories}</p>
        </div>
        <div className="composition_item">
          <p className="">Белки, г</p>
          <p className="">{ingredient.proteins}</p>
        </div>
        <div className="composition_item">
          <p className="">Жиры, г</p>
          <p className="">{ingredient.fat}</p>
        </div>
        <div className="composition_item">
          <p className="">Углеводы, г</p>
          <p className="">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

IngredientDetais.propTypes = {
  ingredient: ingridientType.isRequired,
}

export default IngredientDetais;