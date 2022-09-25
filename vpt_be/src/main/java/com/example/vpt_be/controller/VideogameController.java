package com.example.vpt_be.controller;

import com.example.vpt_be.VideogameFilters;
import com.example.vpt_be.entity.Videogame;
import com.example.vpt_be.repository.VideogameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class VideogameController {

    @Autowired
    private VideogameRepository videogameRepository;

    @GetMapping("/videogames/{title}")
    public List<Videogame> findVideogamesByFilter(
            @PathVariable(name = "title") String title,
            @RequestParam(required = false, name = "types") List<String> types,
            @RequestParam(required = false, name = "minPrice") Float minPrice,
            @RequestParam(required = false, name = "maxPrice") Float maxPrice,
            @RequestParam(required = false, name = "categories") List<String> categories,
            @RequestParam(required = false, name = "minYear") String minYear,
            @RequestParam(required = false, name = "maxYear") String maxYear,
            @RequestParam(required = false, name = "systems") List<String> systems,
            @RequestParam(required = false, name = "minDiscount") Integer minDiscount,
            @RequestParam(required = false, name = "maxDiscount") Integer maxDiscount,
            @RequestParam(name = "historicalLow") boolean historicalLow
    ) {
        Specification<Videogame> spec;

        if (minDiscount != null || maxDiscount != null) {
            spec = Specification
                .where(VideogameFilters.filterTitle(title))
                .and(types == null ? null : VideogameFilters.filterTypes(types))
                .and(!historicalLow ? null : VideogameFilters.filterHistoricalLow())
                .and(minDiscount == null ? null : VideogameFilters.filterDiscountedPriceLowerThanOrEqualTo(minDiscount))
                .and(maxDiscount == null ? null : VideogameFilters.filterDiscountedPriceHigherThanOrEqualTo(maxDiscount))
                .and(minPrice == null ? null : VideogameFilters.filterDiscountedPriceLowerThanOrEqualToWhenDiscount(minPrice))
                .and(maxPrice == null ? null : VideogameFilters.filterDiscountedPriceHigherThanOrEqualTo(maxPrice))
                .and(minYear == null ? null : VideogameFilters.filterReleaseYearLowerThanOrEqualTo(minYear))
                .and(maxYear == null ? null : VideogameFilters.filterReleaseYearHigherThanOrEqualTo(maxYear))
                .and(systems == null ? null : VideogameFilters.filterSystems(systems))
                .and(categories == null ? null : VideogameFilters.filterCategories(categories));
        } else {
            spec = Specification
                .where(VideogameFilters.filterTitle(title))
                .and(!historicalLow ? null : VideogameFilters.filterHistoricalLow())
                .and(types == null ? null : VideogameFilters.filterTypes(types))
                .and(minPrice == null ? null : VideogameFilters.filterBasePriceLowerThanOrEqualTo(minPrice))
                .and(minPrice == null ? null : VideogameFilters.filterDiscountedPriceLowerThanOrEqualTo(minPrice))
                .and(maxPrice == null ? null : VideogameFilters.filterBasePriceHigherThanOrEqualTo(maxPrice))
                .and(maxPrice == null ? null : VideogameFilters.filterDiscountedPriceHigherThanOrEqualToAndNull(maxPrice))
                .and(minYear == null ? null : VideogameFilters.filterReleaseYearLowerThanOrEqualTo(minYear))
                .and(maxYear == null ? null : VideogameFilters.filterReleaseYearHigherThanOrEqualTo(maxYear))
                .and(systems == null ? null : VideogameFilters.filterSystems(systems))
                .and(categories == null ? null : VideogameFilters.filterCategories(categories));
        }

        return videogameRepository.findAll(spec);
    }

    @GetMapping("/types")
    public List<String> getAllDistinctTypes() {
        return videogameRepository.getAllDistinctTypes();
    }

    @GetMapping("/videogame/{title}")
    public Videogame getVideogame(@PathVariable String title) {
        return videogameRepository.getVideogameByTitle(title);
    }

    @GetMapping("/videogamesAll")
    public List<Videogame> findAllVideogamesByFilter(
            @RequestParam(required = false, name = "types") List<String> types,
            @RequestParam(required = false, name = "minPrice") Float minPrice,
            @RequestParam(required = false, name = "maxPrice") Float maxPrice,
            @RequestParam(required = false, name = "categories") List<String> categories,
            @RequestParam(required = false, name = "minYear") String minYear,
            @RequestParam(required = false, name = "maxYear") String maxYear,
            @RequestParam(required = false, name = "systems") List<String> systems,
            @RequestParam(required = false, name = "minDiscount") Integer minDiscount,
            @RequestParam(required = false, name = "maxDiscount") Integer maxDiscount,
            @RequestParam(name = "historicalLow") boolean historicalLow
    ) {
        Specification<Videogame> spec;

        if (minDiscount != null || maxDiscount != null) {
            spec = Specification
                    .where(!historicalLow ? null : VideogameFilters.filterHistoricalLow())
                    .and(!historicalLow ? null : VideogameFilters.filterHistoricalLow())
                    .and(minDiscount == null ? null : VideogameFilters.filterDiscountedPriceLowerThanOrEqualTo(minDiscount))
                    .and(maxDiscount == null ? null : VideogameFilters.filterDiscountedPriceHigherThanOrEqualTo(maxDiscount))
                    .and(minPrice == null ? null : VideogameFilters.filterDiscountedPriceLowerThanOrEqualToWhenDiscount(minPrice))
                    .and(maxPrice == null ? null : VideogameFilters.filterDiscountedPriceHigherThanOrEqualTo(maxPrice))
                    .and(minYear == null ? null : VideogameFilters.filterReleaseYearLowerThanOrEqualTo(minYear))
                    .and(maxYear == null ? null : VideogameFilters.filterReleaseYearHigherThanOrEqualTo(maxYear))
                    .and(systems == null ? null : VideogameFilters.filterSystems(systems))
                    .and(categories == null ? null : VideogameFilters.filterCategories(categories));
        } else {
            spec = Specification
                    .where(!historicalLow ? null : VideogameFilters.filterHistoricalLow())
                    .and(types == null ? null : VideogameFilters.filterTypes(types))
                    .and(minPrice == null ? null : VideogameFilters.filterBasePriceLowerThanOrEqualTo(minPrice))
                    .and(minPrice == null ? null : VideogameFilters.filterDiscountedPriceLowerThanOrEqualTo(minPrice))
                    .and(maxPrice == null ? null : VideogameFilters.filterBasePriceHigherThanOrEqualTo(maxPrice))
                    .and(maxPrice == null ? null : VideogameFilters.filterDiscountedPriceHigherThanOrEqualToAndNull(maxPrice))
                    .and(minYear == null ? null : VideogameFilters.filterReleaseYearLowerThanOrEqualTo(minYear))
                    .and(maxYear == null ? null : VideogameFilters.filterReleaseYearHigherThanOrEqualTo(maxYear))
                    .and(systems == null ? null : VideogameFilters.filterSystems(systems))
                    .and(categories == null ? null : VideogameFilters.filterCategories(categories));
        }

        return videogameRepository.findAll(spec);
    }

    @GetMapping("videogame")
    public Videogame getVideogame(@RequestParam int id) {
        return videogameRepository.findById(id).get();
    }

}
