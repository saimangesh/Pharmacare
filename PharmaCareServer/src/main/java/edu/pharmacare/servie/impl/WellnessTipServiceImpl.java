package edu.pharmacare.servie.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import edu.pharmacare.model.WellnessTip;
import edu.pharmacare.repository.WellnessTipRepository;
import edu.pharmacare.service.WellnessTipService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WellnessTipServiceImpl implements WellnessTipService {
	private final WellnessTipRepository wellnessTipRepository;

	@Override
	public List<WellnessTip> findAll() {
		return wellnessTipRepository.findAll();
	}

	@Override
	public void save(WellnessTip wellnessTip) {
		wellnessTipRepository.save(wellnessTip);
	}

	@Override
	public void saveAll(List<WellnessTip> wellnessTips) {
		wellnessTipRepository.saveAll(wellnessTips);
	}

	public WellnessTip findById(Integer id) {
		Optional<WellnessTip> optional = wellnessTipRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
}
