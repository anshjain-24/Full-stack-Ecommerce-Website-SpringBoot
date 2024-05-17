from flask import Flask, jsonify
from sqlalchemy import create_engine
import pandas as pd

app = Flask(__name__)

# MySQL connection parameters
db_username = 'root'
db_password = 'my-Sql24;'
db_host = 'localhost'
db_port = 3306
db_name = 'elite_buy'

@app.route('/api/trending_categories', methods=['GET'])
def get_trending_categories():
    # Create SQLAlchemy engine
    engine = create_engine(f"mysql+mysqlconnector://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}")

    # Query to fetch trending categories
    query = """
        SELECT 
            category.name,
            COUNT(order_item.id) AS order_count
        FROM 
            order_item
        INNER JOIN 
            product ON order_item.product_id = product.id
        INNER JOIN 
            category ON product.category_id = category.id
        GROUP BY 
            category.id
        ORDER BY 
            order_count DESC
        LIMIT 5
    """

    # Fetch data from MySQL
    trending_categories_df = pd.read_sql_query(query, engine)

    # Convert DataFrame to JSON
    trending_categories_json = trending_categories_df.to_json(orient='records')

    return trending_categories_json

if __name__ == '__main__':
    app.run(debug=True)
