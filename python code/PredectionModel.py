import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split

class Config:
    DEBUG = True
    DATA_FILE = 'ReqData.csv'

class RecommendationModel:
    def __init__(self):
        self.data = pd.read_csv(Config.DATA_FILE)
        self.data['user_product'] = self.data['user_id'].astype(str) + ' ' + self.data['name']
        self.count_matrix = CountVectorizer().fit_transform(self.data['user_product'])
        _, _, y_train, _ = train_test_split(self.count_matrix, self.data['order_frequency'], test_size=0.2, random_state=42)
        self.clf = MultinomialNB()
        self.clf.fit(self.count_matrix, y_train)

    def get_recommendations(self, user_id):
        user_data = self.data[self.data['user_id'] == user_id]
        if user_data.empty:
            raise ValueError('User not found.')
        
        user_vector = CountVectorizer().fit_transform(user_data['user_product'])
        user_pred = self.clf.predict(user_vector)
        top_categories = user_data.iloc[user_pred.argsort()[-7:]]['name'].tolist()
        return top_categories
