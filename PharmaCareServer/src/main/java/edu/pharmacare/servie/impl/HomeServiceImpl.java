package edu.pharmacare.servie.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.pharmacare.model.Appointment;
import edu.pharmacare.model.DietPlan;
import edu.pharmacare.model.Doctor;
import edu.pharmacare.model.Medicine;
import edu.pharmacare.model.NutritionData;
import edu.pharmacare.model.User;
import edu.pharmacare.model.WellnessTip;
import edu.pharmacare.model.constants.UserRole;
import edu.pharmacare.repository.UserRepository;
import edu.pharmacare.service.AppointmentService;
import edu.pharmacare.service.DietPlanService;
import edu.pharmacare.service.DoctorService;
import edu.pharmacare.service.HomeService;
import edu.pharmacare.service.JwtService;
import edu.pharmacare.service.MedicineService;
import edu.pharmacare.service.NutritionDataService;
import edu.pharmacare.service.PaymentService;
import edu.pharmacare.service.UserService;
import edu.pharmacare.service.WellnessTipService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	private final UserService userService;
	private final DoctorService doctorService;
	private final MedicineService medicineService;
	private final PaymentService paymentService;

	private final DietPlanService dietPlanService;
	private final WellnessTipService wellnessTipService;
	private final NutritionDataService nutritionDataService;
	private final AppointmentService appointmentService;
	private final ResourceLoader resourceLoader;

	@Override
	public List<NutritionData> findAllNutritionDatas() {
		return nutritionDataService.findAll();
	}

	@Override
	public NutritionData findByIdNutritionData(Integer id) {
		return nutritionDataService.findById(id);
	}

	@Override
	public List<DietPlan> findAllDietPlans() {
		return dietPlanService.findAll();
	}

	@Override
	public DietPlan findByIdDietPlan(Integer id) {
		return dietPlanService.findById(id);
	}

	@Override
	public List<WellnessTip> findAllWellnessTips() {
		return wellnessTipService.findAll();
	}

	@Override
	public WellnessTip findByIdWellnessTip(Integer id) {
		return wellnessTipService.findById(id);
	}

	@Override
	public List<Appointment> findAllAppointments() {
		return appointmentService.findAll();
	}

	@Override
	public Appointment findByIdAppointments(Integer id) {
		return appointmentService.findById(id);
	}

	@Override
	@SuppressWarnings("resource")
	public void loadPharmacyData() {
		try {
			Resource resource = resourceLoader.getResource("classpath:data/pharmacycare_data.xlsx");
			for (Sheet sheet : new XSSFWorkbook(resource.getInputStream())) {
				loadUsers(sheet);
				loadDoctors(sheet);
				loadMedicines(sheet);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	@SuppressWarnings("resource")
	public void loadNutritionData() {
		try {
			Resource resource = resourceLoader.getResource("classpath:data/diet_nutrition_wellness_data.xlsx");
			for (Sheet sheet : new XSSFWorkbook(resource.getInputStream())) {
				loadDietPlan(sheet);
				loadNutritionData(sheet);
				loadWellnessTip(sheet);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void loadUsers(Sheet sheet) {
		String sheetName = sheet.getSheetName();
		int numberOfRows = sheet.getPhysicalNumberOfRows();

		if ("users".equals(sheetName)) {
			Map<String, Integer> map = new HashMap<>();
			for (int i = 0; i < numberOfRows; i++) {
				try {
					Row row = sheet.getRow(i);
					if (i == 0) {
						for (Cell cell : row) {
							map.put(cell.getStringCellValue(), cell.getColumnIndex());
						}
					} else {
						String name = getCell(map, row, "Full Name");
						String dateOfBirth = getCell(map, row, "Date of Birth");
						String email = getCell(map, row, "Email");
						String mobile = getCell(map, row, "Phone Number");
						String shippingAddress = getCell(map, row, "Shipping Address");
						String billingAddress = getCell(map, row, "Billing Address");
						String username = getCell(map, row, "Username");
						String password = getCell(map, row, "Password");
						String medicalHistory = getCell(map, row, "Medical History");
						String allergies = getCell(map, row, "Allergies");
						String role = getCell(map, row, "Role");

						User user = User.builder().name(name).dateOfBirth(dateOfBirth).email(email).mobile(mobile)
								.shippingAddress(shippingAddress).billingAddress(billingAddress).userName(username)
								.password(passwordEncoder.encode(password)).medicalHistory(medicalHistory)
								.allergies(allergies).role(UserRole.valueOf(role)).createdTime(LocalDateTime.now())
								.updatedTime(LocalDateTime.now()).build();
						userService.save(user);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public void loadDoctors(Sheet sheet) {
		String sheetName = sheet.getSheetName();
		int numberOfRows = sheet.getPhysicalNumberOfRows();
		if ("doctors".equals(sheetName)) {
			Map<String, Integer> map = new HashMap<>();
			for (int i = 0; i < numberOfRows; i++) {
				try {
					Row row = sheet.getRow(i);
					if (i == 0) {
						for (Cell cell : row) {
							map.put(cell.getStringCellValue(), cell.getColumnIndex());
						}
					} else {
						String name = getCell(map, row, "Name");
						String qualification = getCell(map, row, "Educational Qualification");
						String experience = getCell(map, row, "Experience (Years)");
						String specialization = getCell(map, row, "Specialization");
						String consultationType = getCell(map, row, "Consultation Type");
						String hospitalName = getCell(map, row, "Hospital Name");

						Doctor doctor = Doctor.builder().name(name).qualification(qualification).experience(experience)
								.specialization(specialization).consultationType(consultationType)
								.hospitalName(hospitalName).createdTime(LocalDateTime.now())
								.updatedTime(LocalDateTime.now()).build();
						doctorService.save(doctor);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public void loadMedicines(Sheet sheet) {
		String sheetName = sheet.getSheetName();
		int numberOfRows = sheet.getPhysicalNumberOfRows();
		if ("medicines".equals(sheetName)) {
			Map<String, Integer> map = new HashMap<>();
			for (int i = 0; i < numberOfRows; i++) {
				try {
					Row row = sheet.getRow(i);
					if (i == 0) {
						for (Cell cell : row) {
							map.put(cell.getStringCellValue(), cell.getColumnIndex());
						}
					} else {
						String name = getCell(map, row, "Medicine Name");
						String description = getCell(map, row, "Description");
						String imageUrl = getCell(map, row, "Image Url");
						String keyIngredients = getCell(map, row, "Key Ingredients");
						String uses = getCell(map, row, "Uses");
						String sideEffects = getCell(map, row, "Side Effects");
						String directionofUse = getCell(map, row, "Direction of Use");
						String price = getCell(map, row, "Price ($)");
						String diseaseCategory = getCell(map, row, "Disease Category");

						Medicine medicine = Medicine.builder().name(name).description(description).imageUrl(imageUrl)
								.keyIngredients(keyIngredients).uses(uses).sideEffects(sideEffects)
								.directionOfUse(directionofUse).price(Double.valueOf(price))
								.diseaseCategory(diseaseCategory).createdTime(LocalDateTime.now())
								.updatedTime(LocalDateTime.now()).build();
						medicineService.save(medicine);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public void loadDietPlan(Sheet sheet) {
		String sheetName = sheet.getSheetName();
		int numberOfRows = sheet.getPhysicalNumberOfRows();

		if ("DietPlans".equals(sheetName)) {
			Map<String, Integer> map = new HashMap<>();
			for (int i = 0; i < numberOfRows; i++) {
				try {
					Row row = sheet.getRow(i);
					if (i == 0) {
						for (Cell cell : row) {
							map.put(cell.getStringCellValue(), cell.getColumnIndex());
						}
					} else {
						String planName = getCell(map, row, "Plan Name");
						String overview = getCell(map, row, "Overview");
						String targetAudience = getCell(map, row, "Target Audience");
						String duration = getCell(map, row, "Duration");
						String mealFrequency = getCell(map, row, "Meal Frequency");
						String dailyCalorieIntake = getCell(map, row, "Daily Calorie Intake");
						String macronutrientDistribution = getCell(map, row, "Macronutrient Distribution");

						DietPlan dietPlan = DietPlan.builder().planName(planName).overwiew(overview)
								.targetAudience(targetAudience).duration(duration).mealFrequency(mealFrequency)
								.dailyCalorieIntake(dailyCalorieIntake)
								.macronutrientDistribution(macronutrientDistribution).createdTime(LocalDateTime.now())
								.updatedTime(LocalDateTime.now()).build();
						dietPlanService.save(dietPlan);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public void loadNutritionData(Sheet sheet) {
		String sheetName = sheet.getSheetName();
		int numberOfRows = sheet.getPhysicalNumberOfRows();
		if ("NutritionData".equals(sheetName)) {
			Map<String, Integer> map = new HashMap<>();
			for (int i = 0; i < numberOfRows; i++) {
				try {
					Row row = sheet.getRow(i);
					if (i == 0) {
						for (Cell cell : row) {
							map.put(cell.getStringCellValue(), cell.getColumnIndex());
						}
					} else {
						String foodItem = getCell(map, row, "Food Item");
						String category = getCell(map, row, "Category");
						String overview = getCell(map, row, "Overview");
						String servingSize = getCell(map, row, "Serving Size");
						String calories = getCell(map, row, "Calories");
						String carbs = getCell(map, row, "Carbs (g)");
						String proteins = getCell(map, row, "Proteins (g)");
						String fats = getCell(map, row, "Fats (g)");
						String dietaryFiber = getCell(map, row, "Dietary Fiber (g)");
						String sugars = getCell(map, row, "Sugars (g)");

						NutritionData nutritionData = NutritionData.builder().foodItem(foodItem).category(category)
								.overwiew(overview).servingSize(servingSize).calories(calories).carbs(carbs)
								.protiens(proteins).fats(fats).dietaryFiber(dietaryFiber).sugars(sugars)
								.createdTime(LocalDateTime.now()).updatedTime(LocalDateTime.now()).build();
						nutritionDataService.save(nutritionData);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public void loadWellnessTip(Sheet sheet) {
		String sheetName = sheet.getSheetName();
		int numberOfRows = sheet.getPhysicalNumberOfRows();
		if ("WellnessTips".equals(sheetName)) {
			Map<String, Integer> map = new HashMap<>();
			for (int i = 0; i < numberOfRows; i++) {
				try {
					Row row = sheet.getRow(i);
					if (i == 0) {
						for (Cell cell : row) {
							map.put(cell.getStringCellValue(), cell.getColumnIndex());
						}
					} else {
						String category = getCell(map, row, "Category");
						String title = getCell(map, row, "Title");
						String description = getCell(map, row, "Description");
						String benefits = getCell(map, row, "Benefits");
						String practicalSteps = getCell(map, row, "Practical Steps");
						String frequency = getCell(map, row, "Frequency");

						WellnessTip wellnessTip = WellnessTip.builder().category(category).title(title)
								.description(description).benefits(benefits).practicalSteps(practicalSteps)
								.frequency(frequency).createdTime(LocalDateTime.now()).updatedTime(LocalDateTime.now())
								.build();
						wellnessTipService.save(wellnessTip);

					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	private String getCell(Map<String, Integer> map, Row row, String columnName) {
		DataFormatter formatter = new DataFormatter();
		return formatter.formatCellValue(row.getCell(map.get(columnName)));
	}
}
