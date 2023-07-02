import styles from '../ingredients-details/ingredients-details.module.css'
import ingredientType from "../../utils/prop-types";


const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.box}>
      <h1 className={styles.caption}>Детали ингредиента </h1>
      <img src={ingredient.image} alt={ingredient.name} className={styles.img} />
      <h2 className={`text text_type_main-medium pt-4 ${styles.name}`}>{ingredient.name}</h2>
      <div className={styles.composition_box}>
        <div className={styles.composition_item}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </div>
        <div className={styles.composition_item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </div>
        <div className={styles.composition_item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </div>
        <div className={styles.composition_item}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: ingredientType.isRequired,
}

export default IngredientDetails;