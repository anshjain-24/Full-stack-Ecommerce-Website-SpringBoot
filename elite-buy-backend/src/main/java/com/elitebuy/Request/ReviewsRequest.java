package com.elitebuy.Request;

import com.elitebuy.model.Product;

public class ReviewsRequest {

    private Long productId;

    private String review;

    public ReviewsRequest() {
    }

    public ReviewsRequest(Long productId, String review) {
        this.productId = productId;
        this.review = review;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
