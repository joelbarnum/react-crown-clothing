import './catagory-item.styles.scss'

const CatagoryItem = ({catagory}) => {
    const {imageUrl, title, id} = catagory
    return (
        <div key={id} className="category-container">
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`
            }}>
            </div>
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default CatagoryItem