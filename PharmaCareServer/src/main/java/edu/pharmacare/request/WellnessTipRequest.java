package edu.pharmacare.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WellnessTipRequest {
	private String category;
	private String title;
	private String description;
	private String benefits;
	private String practicalSteps;
	private String frequency;
}
