# EliteBuy

Welcome to **EliteBuy**, an innovative e-commerce platform offering a personalized shopping experience. Our website provides a wide range of products across various categories, including Men, Women, and Electronics, with sub-categories like Clothing, Accessories, Mobiles, and Laptops. We use cutting-edge technology to enhance your shopping experience with personalized recommendations and efficient user interactions.

## Features

### User Features
- **Interactive Home Page**: Dynamic content including interactive navbars, carousels, and the latest products list.
- **Personalized Recommendations**: 
  - Logged-out users see trending products based on sales history.
  - Logged-in users receive recommendations based on their order history using an SVD Algorithm.
- **Advanced Search & Filters**: Search for products and filter based on color, price, discounts, stock availability, etc.
- **Product Details**: Comprehensive product details including title, price, offers, description, highlights, ratings, and reviews.
- **User Authentication**: Secure sign-up and login features with session management.
- **Cart Management**: Add, update quantity, or remove products from the cart.
- **Order Processing**: Seamless checkout process with address management and payment via Razorpay.
- **Order Tracking**: Track order status and view order history.
- **Product Reviews**: Rate and review products after delivery.
- **AI Chatbot**: Get instant support from our AI-powered chatbot.

### Admin Features
- **Admin Panel**: Access to exclusive admin functionalities.
- **Dashboard**: Visual insights with time series graphs, pie charts, and bar charts.
- **User Management**: View and manage user accounts.
- **Product Management**: Add, delete, and update products.
- **Order Management**: Update order statuses and manage orders efficiently.

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed.
- **Java**: Make sure Java Development Kit (JDK) is installed.
- **MySQL**: Set up a MySQL database.

### Installation

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd EliteBuy
```
#### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will be running on http://localhost:3000.

#### 3. Backend Setup
   
Navigate to src/main/resources 

Add your own application.properties file with your database configuration.

Sample application.properties

```bash
spring.datasource.url=jdbc:mysql://localhost:3306/yourDatabaseName
spring.datasource.username=yourUsername
spring.datasource.password=yourPassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```
Start the backend by running the main Java file.
The backend will be running on http://localhost:8080 (by default)

#### 4. Personalized Recommendation Engine
Navigate to the recommendation engine script.
```bash
python PersonalizedRecommendation.py
```
### Tech Stack  
  - **Frontend: React.js**
  - **Backend: Spring Boot**
  - **Database: MySQL**
  - **Machine Learning: SVD Algorithm for recommendations**
  - **Payment Gateway: Razorpay**

Access the site at http://localhost:3000.

Explore the dynamic product listings and enjoy personalized recommendations.
Utilize the admin panel for managing users, products, and orders.

## License
This project is licensed under the MIT License.
