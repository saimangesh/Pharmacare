package edu.pharmacare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.pharmacare.model.WellnessTip;

@Repository
public interface WellnessTipRepository extends JpaRepository<WellnessTip, Integer> {
}
