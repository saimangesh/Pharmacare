package edu.pharmacare.service;

import java.util.List;

import edu.pharmacare.model.WellnessTip;

public interface WellnessTipService {
	List<WellnessTip> findAll();

	WellnessTip findById(Integer id);

	void save(WellnessTip wellnessTip);

	void saveAll(List<WellnessTip> wellnessTips);
}
