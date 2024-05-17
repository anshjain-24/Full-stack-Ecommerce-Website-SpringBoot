from flask import Flask, jsonify
from flask_restful import Api, Resource
from surprise import Dataset, Reader, SVD
from sqlalchemy import create_engine
from sqlalchemy import text
import pandas as pd
from sklearn.preprocessing import LabelEncoder

from flask import Flask, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS  # Import CORS from flask_cors module

# Initialize Flask app and API
app = Flask(__name__)
api = Api(app)

# Enable CORS for all domains on all routes
CORS(app)

# MySQL connection parameters
db_username = 'root'
db_password = 'my-Sql24;'
db_host = 'localhost'
db_port = 3306
db_name = 'elite_buy'

# Define the SQL query
query = """
    SELECT 
        o.user_id,
        p.category_id,
        c.name # Assuming category_name is the column name for category names
    FROM 
        `order_item` o
    INNER JOIN 
        product p ON o.product_id = p.id
    INNER JOIN 
        category c ON p.category_id = c.id
"""

# Load data from MySQL database and train the model
def train_model():
    # Create SQLAlchemy engine
    engine = create_engine(f"mysql+mysqlconnector://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}")

    # Fetch data from MySQL
    df = pd.read_sql_query(query, engine)

    # Convert category_id to numerical IDs
    label_encoder = LabelEncoder()
    df['name_encoded'] = label_encoder.fit_transform(df['name'])
    df.drop(columns=['name'], inplace=True)

    reader = Reader(rating_scale=(1, 5))
    # Load the dataframe into Surprise's Dataset format
    data = Dataset.load_from_df(df, reader)
    
    # Train the SVD (Singular Value Decomposition) algorithm
    model = SVD()
    model.fit(data.build_full_trainset())
    
    return model

# Endpoint to get recommendations for a given user ID
class Recommendations(Resource):
    
    def get(self, user_id):
        try:
            # Load trained model
            model = train_model()
            # Get top N recommendations for the user
            top_n = 2
            
            # Create SQLAlchemy engine
            engine = create_engine(f"mysql+mysqlconnector://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}")

            # Fetch unique category IDs for the products purchased by the given user
            user_query = f"""
                SELECT DISTINCT
                    p.category_id
                FROM 
                    `order_item` o
                INNER JOIN 
                    product p ON o.product_id = p.id
                WHERE
                    o.user_id = {user_id}
            """
            user_df = pd.read_sql_query(user_query, engine)
            category_ids = user_df['category_id'].tolist()
            
            # Create a test set for the given user ID
            test_set = [[user_id, category_id, 0] for category_id in category_ids]

            # Predict ratings for the test set
            predictions = model.test(test_set)
            
            # Sort the predictions by estimated rating in descending order
            predictions.sort(key=lambda x: x.est, reverse=True)

            # Extract category names from the sorted predictions
            category_names = [self.get_category_name(prediction.iid) for prediction in predictions[:top_n]]

            return jsonify(category_names)
        except Exception as e:
            return str(e), 500



    # Function to fetch category name based on item ID
    def get_category_name(self, item_id):
        # Convert item_id to a regular Python integer
        item_id = int(item_id)
        
        # Connect to the database
        engine = create_engine(f"mysql+mysqlconnector://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}")
        
        # Establish a connection
        connection = engine.connect()
        
        # Query to fetch category name based on category ID
        query = text("SELECT name FROM category WHERE id = :id")
        
        try:
            # Bind the item_id parameter to the query
            query = query.bindparams(id=item_id)
            
            # Execute the query and fetch the category name
            result = connection.execute(query).fetchone()
            
            # Check if a result is found
            if result:
                category_name = result[0]  # Extract the category name from the result tuple
                return category_name
            else:
                return "Unknown Category"  # Return a default value if category name is not found
        finally:
            # Close the connection
            connection.close()

# Add resources to API
api.add_resource(Recommendations, '/recommendations/<int:user_id>')

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

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
