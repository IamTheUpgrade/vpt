package com.example.vpt_be;

import com.example.vpt_be.entity.Videogame;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public class VideogameFilters {

    public static Specification<Videogame> filterTitle(String title) {
        return (root, query, cb) -> cb.like(cb.upper(root.get("title")), "%" + title.toUpperCase() + "%" );
    }

    public static Specification<Videogame> filterTypes(List<String> types) {
        return (root, query, cb) -> {

            Path<String> typePath = root.get("type");
            List<Predicate> typesPredicates = new ArrayList<>();

            for (String type: types) {
                typesPredicates.add(cb.like(typePath, type));
            }

            return cb.or(typesPredicates.toArray(new Predicate[typesPredicates.size()]));

        };
    }

    public static Specification<Videogame> filterBasePriceLowerThanOrEqualTo(Float minPrice){
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("basePrice"), minPrice);
    }

    public static Specification<Videogame> filterBasePriceHigherThanOrEqualTo(Float maxPrice){
        return (root, query, cb) -> cb.or(
                cb.lessThanOrEqualTo(root.get("basePrice"), maxPrice),
                root.get("currentDiscountedPrice").isNotNull()
        );
    }

    /** Overload */
    public static Specification<Videogame> filterDiscountedPriceLowerThanOrEqualTo(Float minPrice){
        return (root, query, cb) -> cb.or(
            cb.greaterThanOrEqualTo(root.get("currentDiscountedPrice"), minPrice),
            root.get("currentDiscountedPrice").isNull()
        );
    }

    /** Overload */
    public static Specification<Videogame> filterDiscountedPriceHigherThanOrEqualTo(Float maxPrice){
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("currentDiscountedPrice"), maxPrice);
    }

    public static Specification<Videogame> filterDiscountedPriceHigherThanOrEqualToAndNull(Float maxPrice){
        return (root, query, cb) -> cb.or(
                cb.lessThanOrEqualTo(root.get("currentDiscountedPrice"), maxPrice),
                root.get("currentDiscountedPrice").isNull()
        );
    }

    public static Specification<Videogame> filterReleaseYearLowerThanOrEqualTo(String minYear){
        return (root, query, cb) -> cb.greaterThanOrEqualTo(cb.substring(root.get("releaseDate"), 1, 4), minYear);
    }

    public static Specification<Videogame> filterReleaseYearHigherThanOrEqualTo(String maxYear){
        return (root, query, cb) -> cb.lessThanOrEqualTo(cb.substring(root.get("releaseDate"), 1, 4), maxYear);
    }

    public static Specification<Videogame> filterSystems(List<String> systems) {
        return (root, query, cb) -> {

            Path<String> systemPath = root.join("systems").get("system");

            query.distinct(true);

            List<Predicate> systemsPredicates = new ArrayList<>();

            for (String system: systems) {
                systemsPredicates.add(cb.like(systemPath, system));
            }

            return cb.or(systemsPredicates.toArray(new Predicate[systemsPredicates.size()]));

        };
    }

    public static Specification<Videogame> filterCategories(List<String> categories) {
        return (root, query, cb) -> {

            Path<String> categoryPath = root.join("categories").get("category");

            query.distinct(true);

            List<Predicate> categoriesPredicates = new ArrayList<>();

            for (String category: categories) {
                categoriesPredicates.add(cb.like(categoryPath, category));
            }

            return cb.or(categoriesPredicates.toArray(new Predicate[categoriesPredicates.size()]));

        };
    }

    public static Specification<Videogame> filterHistoricalLow() {
        return (root, query, cb) -> cb.equal(root.get("lowestPrice"), root.get("currentDiscountedPrice"));
    }


    /** Overload */
    public static Specification<Videogame> filterDiscountedPriceLowerThanOrEqualTo(Integer minDiscount){
        return (root, query, cb) ->
            cb.lessThanOrEqualTo(root.get("currentDiscountedPrice").as(Integer.class),
                cb.diff(root.get("basePrice"),
                    (cb.prod(cb.quot(root.<Integer>get("basePrice"), 100), minDiscount))
                ).as(Integer.class)
            );
    }

    /** Overload */
    public static Specification<Videogame> filterDiscountedPriceHigherThanOrEqualTo(Integer maxDiscount){
        return (root, query, cb) ->
                cb.greaterThanOrEqualTo(root.get("currentDiscountedPrice").as(Integer.class),
                        cb.diff(root.get("basePrice"),
                                (cb.prod(cb.quot(root.<Integer>get("basePrice"), 100), maxDiscount))
                        ).as(Integer.class)
                );
    }

    public static Specification<Videogame> filterDiscountedPriceLowerThanOrEqualToWhenDiscount(Float minPrice) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("currentDiscountedPrice"), minPrice);
    }

}
