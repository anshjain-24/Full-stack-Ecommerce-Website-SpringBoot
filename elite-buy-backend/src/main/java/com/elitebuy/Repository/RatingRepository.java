package com.elitebuy.Repository;

import com.elitebuy.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    @Query("SELECT r FROM Rating r WHERE r.product.id = :productId")
    List<Rating> getAllProductRating(@Param("productId") Long productId);

    // Assuming 'score' is the correct field name for the numerical value you're trying to retrieve
    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.user.id = :userId AND r.product.id = :productId")
    Optional<Double> getRatingByUserAndProduct(@Param("userId") Long userId, @Param("productId") Long productId);

}
