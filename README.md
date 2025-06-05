<h1 align="center">🛍️ EliteBuy : FULL-STACK-ECOMMERCE-WEBSITE-SPRINGBOOT</h1>

<p align="center"><i>Empowering Seamless Shopping Experiences for Everyone</i></p>

<p align="center">
  <img src="https://img.shields.io/github/languages/top/anshjain-24/Full-stack-Ecommerce-Website-SpringBoot?style=for-the-badge" />
  <img src="https://img.shields.io/github/last-commit/anshjain-24/Full-stack-Ecommerce-Website-SpringBoot?style=for-the-badge" />
  <img src="https://img.shields.io/github/languages/count/anshjain-24/Full-stack-Ecommerce-Website-SpringBoot?style=for-the-badge" />
</p>

<p align="center"><b>Built with the tools and technologies:</b></p>

<p align="center">
  <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/XML-007ACC?style=for-the-badge&logo=xml&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-8A2BE2?style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" />
</p>

---



Welcome to **EliteBuy**, an innovative e-commerce platform offering a personalized shopping experience. 
This website provides a wide range of products across various categories, including Men, Women, and Electronics, with sub-categories like Clothing, Accessories, Mobiles, and Laptops. We use cutting-edge technology to enhance your shopping experience with personalized recommendations and efficient user interactions.

## Features

### User Features
- 🏠 **Interactive Home Page**: Dynamic content including interactive navbars, carousels, and the latest products list.
- 🎯 **Personalized Recommendations**: 
  - 🔓 Logged-out users see trending products based on sales history.
  - 🔐 Logged-in users receive recommendations based on their order history using an SVD Algorithm.
- 🔍 **Advanced Search & Filters**: Search for products and filter based on color, price, discounts, stock availability, etc.
- 📦 **Product Details**: Comprehensive product details including title, price, offers, description, highlights, ratings, and reviews.
- 🔐 **User Authentication**: Secure sign-up and login features with session management.
- 🛒 **Cart Management**: Add, update quantity, or remove products from the cart.
- 💳 **Order Processing**: Seamless checkout process with address management and payment via Razorpay.
- 🚚 **Order Tracking**: Track order status and view order history.
- 🌟 **Product Reviews**: Rate and review products after delivery.
- 🤖 **AI Chatbot**: Get instant support from our AI-powered chatbot.

### Admin Features
- 🛠️ **Admin Panel**: Access to exclusive admin functionalities.
- 📊 **Dashboard**: Visual insights with time series graphs, pie charts, and bar charts.
- 👤 **User Management**: View and manage user accounts.
- 🛍️ **Product Management**: Add, delete, and update products.
- 📦 **Order Management**: Update order statuses and manage orders efficiently.

### Tech Stack
- **Frontend**: React.js
- **Backend**: Spring Boot
- **Database**: MySQL
- **Machine Learning**: SVD Algorithm for recommendations
- **Payment Gateway**: Razorpay

### Usage
- Access the site at `http://localhost:3000`.
- Explore the dynamic product listings and enjoy personalized recommendations.
- Utilize the admin panel for managing users, products, and orders.


## Getting Started

### Prerequisites
- ✅ **Node.js**: Ensure you have Node.js installed.
- ☕ **Java**: Make sure Java Development Kit (JDK) is installed.
- 🛢️ **MySQL**: Set up a MySQL database.

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
The frontend will be running on `http://localhost:3000`.

#### 3. Backend Setup
- Navigate to `src/main/resources`.
- Add your own `application.properties` file with your database and other necessary configuration.
  The Spring Boot BackEnd would be running on port 8080 (by default).
  you may check if it's up on `http://localhost:8080/`

#### Sample `application.properties`
```bash
spring.application.name=Elite Buy Online Shopping Website

spring.datasource.url=jdbc:mysql://localhost:3306/yourDatabaseName
spring.datasource.username=yourUsername
spring.datasource.password=yourPassword
spring.jpa.hibernate.ddl-auto=update

spring.jpa.hibernate.ddl-auto=update
#spring.jpa.show-sql: true

razorpay.api.key = API-KEY
razorpay.api.secret = API-Secret

spring.mail.host = smtp.gmail.com
spring.mail.port = 587
spring.mail.username =yourEmail
spring.mail.password =Key
spring.mail.properties.mail.smtp.auth = true
spring.mail.properties.mail.smtp.starttls.enable = true

```
##### run the recommendation model (python file)
```bash
python PersonalizedRecommendation.py
```
This would be running on port 5000


😉 Happy Coding :) 
---

© 2024 Ansh Jain. All rights reserved.
