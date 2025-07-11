
// cities.ts
const citiesData: { [state: string]: string[] } = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Navi Mumbai", "Aurangabad", "Kolhapur", "Ahmednagar", "Thane", "Amravati", "Satara", "Solapur", "Sangli", "Jalgaon", "Wardha", "Beed", "Dhule", "Latur", "Chandrapur", "Ratnagiri", "Akola", "Nanded", "Raigad", "Yavatmal", "Palghar", "Osmanabad", "Parbhani", "Buldhana", "Gondiya", "Washim", "Karjat", "Sindhudurg", "Shirpur", "Nandurbar", "Karad", "Kalyan", "Bhandara", "Jalna", "Panvel", "Hingoli", "Udgir", "Ambegaon", "Baramati", "Gadchiroli", "Ambajogai", "Malkapur", "Badnapur", "Bandra", "Barshi", "Kopargaon", "Sakoli", "Buldana", "Khamgaon", "Shegaon", "Goregaon", "Naigaon", "Malegaon", "Indapur", "Miraj", "Pandharpur", "Shahapur", "Vasai", "Vikramgad", "Wada", "Dapoli", "Lonere", "Murtijapur", "Khuldabad", "Ashti", "Majalgoan", "Wadwani", "Chikhli", "Bramhapuri", "Kalamnuri", "Amalner", "Chopda", "Karvir", "Shirol", "Ahmadpur", "Nilanga", "Kamptee", "Kalwan", "Peth", "Tuljapur", "Umarga", "Manwath", "Haveli", "Junnar", "Alibag", "Chiplun", "Khed", "Kadegaon", "Khandala", "Wai", "Sawantwadi", "Akkalkot", "Bhiwandi", "Karanja", "Babhulgaon", "Umarkhed", "Wani"
],
  Karnataka: ["Bangalore", "Mangalore", "Mysore", "Belgaum", "Dharwad", "Gulbarga", "Tumkur", "Hubli", "Hassan", "Udupi", "Mandya", "Raichur", "Shimoga", "Bijapur", "Bidar", "Davanagere", "Bagalkot", "Kolar", "Gadag", "Bellary", "Manipal", "Chitradurga", "Belagavi", "Chamarajnagar", "Puttur", "Haveri", "Dakshin Kannada", "Kodagu", "Moodbidri", "Bhatkal", "Chikmagalur", "Ramanagar", "Karwar", "Chikkaballapur", "Koppal", "Sullia", "Virajpet", "Surathkal", "Basavakalyan", "Bantwal", "Bhadravathi", "Kundapura", "Kumta", "Kannada", "Tiptur", "Yelahanka", "Bangalore Rural", "Hoskote", "Gundlupet", "Koppa", "Belthangady", "Davangere", "Holenarasipur", "Ranibennur", "Hunsur", "Honavar", "Sirsi", "Hospet", "Hampi", "Dodballapura", "Nelamagala", "Nelamangala", "Chikodi", "Kudligi", "Bhalki", "Chintamani", "Hiriyur", "Harihar", "Kalaghatgi", "Gangavathi", "Chincholi", "Alur", "Arkalgud", "Arsikere", "Belur", "Channrayapatna", "Sakleshpura", "Madikeri", "Chickballapur", "Krishnarajpet", "Maddur", "Nagamangala", "Pandavapura", "Sindhanur", "Shikarpur", "Thirthahalli", "Sira", "Karkal", "Ankola", "Haliyal", "Shorapur"
],
    Delhi: ["New Delhi", "Gurgaon", "Noida", "Greater Noida", "Ghaziabad", "Meerut", "Sonepat", "Faridabad", "Rohtak", "Alwar", "Karnal", "Panipat", "Jind", "Muzaffarnagar", "Palwal", "Hapur", "Bulandshahr", "Gautam Budh Nagar", "Mewat", "Neemrana", "Sohna"],
  
    "Tamil Nadu": ["Chennai", "Coimbatore", "Tiruchirappalli", "Namakkal", "Madurai", "Salem", "Kanyakumari", "Tirunelveli", "Vellore", "Kanchipuram", "Dindigul", "Thanjavur", "Erode", "Tiruvannamalai", "Villupuram", "Thiruvallur", "Pudukkottai", "Perambalur", "Karur", "Dharmapuri", "Tiruppur", "Cuddalore", "Nagercoil", "Sivaganga", "Thoothukudi", "Krishnagiri", "Nagapattinam", "Virudhunagar", "Karaikudi", "Ramanathapuram", "Theni", "Kumbakonam", "Ariyalur", "Pollachi", "Sivakasi", "Chengalpattu", "Thiruvarur", "Hosur", "Kallakurichi", "Ooty", "Perundurai", "Tiruchengodu", "Thoothukkudi", "Tuticorin", "Rajapalayam", "Krishnankovil", "Tenkasi", "Sriperumbudur", "Dharapuram", "Palayamkottai", "Tirutani", "Annamalai", "Viluppuram", "Attoor", "Maduranthakam", "Tambaram", "Rasipuram", "Pattukkottai", "Periyakulam", "Thuraiyur", "Kovilpatti", "Aruppukottai", "Palani", "Gobichettipalayam", "Sathyamangalam", "Cheyyur", "Aundipatti", "Manapparai", "Avadi", "Poonamallee", "Vandavasi", "Tiruchendur", "Arcot", "Tindivanam", "Kodaikanal", "The Nilgiris", "Siruseri", "Mettupalayam", "Udumalaipettai", "Chidambaram", "Bhavani", "Dharapram", "Kangayam", "Saidapet", "Kulithalai", "Thirumangalam", "Mayiladuthurai", "Vedaranyam", "Coonoor", "Udagamandalam", "Devakottai", "Paramakudi", "Tiruppattur", "Bodinayakanur", "Ponneri", "Arni", "Mannargudi", "Katpadi", "Tirupattur", "Vaniyambadi", "Vallam", "Jayamkondacholapuram", "Udayarpalayam", "Maduravoyal", "Mambalam", "Madhavapuram", "Kattumannarkoil", "Virudhachalam", "Pappiredipatti", "Palladam", "Uthiramerur", "Agastheeswaram", "Thovalai", "Barugur", "Pochampalli", "Melur", "Usilampatti", "Arantangi", "Illuppur", "Kulathur", "Manamelkudi", "Tirumayam", "Attur", "Idappadi", "Mettur", "Yercaud", "Ilayangudi", "Manamadurai", "Papanasam", "Thiruvidaimarudur", "Srirangam", "Thottiyam", "Ulundurpet", "Ambasamudram", "Radhapuram", "Sankarankoil", "Shenkottai", "Virakeralampudur", "Pallipattu", "Tiruvarur", "Ettayapuram", "Gudiyatham", "Tirupathur", "Walajapet", "Chinnasalem", "Kariapatti", "Sattur", "Srivilliputhur", "Thirunanravur"],
  
    "Uttar Pradesh": ["Noida", "Lucknow", "Greater Noida", "Ghaziabad", "Meerut", "Kanpur", "Allahabad", "Varanasi", "Agra", "Bareilly", "Mathura", "Gorakhpur", "Aligarh", "Moradabad", "Jhansi", "Bijnor", "Saharanpur", "Barabanki", "Jaunpur", "Ayodhya", "Muzaffarnagar", "Azamgarh", "Rae Bareli", "Hapur", "Sitapur", "Bagpat", "Bulandshahr", "Ghazipur", "Gonda", "Sultanpur", "Ballia", "Etawah", "Firozabad", "Mirzapur", "Shahjahanpur", "Unnao", "Kanpur Dehat", "Farrukhabad", "Ambedkar Nagar", "Modinagar", "Amethi", "Auraiya", "Banda", "Etah", "Mau", "Bhaghpat", "Basti", "Hardoi", "Jyotiba Phule Nagar", "Bahraich", "Deoria", "Fatehpur", "Kannauj", "Kaushambi", "Sonbhadra", "Badaun", "Gautam Budh Nagar", "Rampur", "Mainpuri", "Pilibhit", "Sant Kabir Nagar", "Amroha", "Chandauli", "Hathras", "Pratapgarh", "Lakhimpur", "Chitrakoot", "Siddharthnagar", "Shikohabad", "Murad Nagar", "Gazipur", "Chandausi", "Gyanpur", "Lalitpur", "Maharajganj", "Sant Ravidas Nagar", "Kashanj", "Shravasti", "Chunar", "Shamli", "Bhadohi", "Powayan", "Kheri", "Orai", "Mahamaya Nagar", "Jalaun", "Meja", "Sahson", "Sikandra", "Najibabad", "Saifai", "Sohawal", "Achheja", "Sambhal", "Palhepur", "Ramaipur", "Ghatampur", "Manjhanpur", "Padrauna", "Hamirpur", "Jansath", "Shahabad", "Gangoh", "Nakur"
    ],
    "Andhra Pradesh": [],
    "Arunachal Pradesh": [],
    "Assam": [],
    "Bihar": [],
    "Chhattisgarh": [],
    "Goa": [],
    "Gujarat": [],
    "Haryana": [],
    "Himachal Pradesh": [],
    "Jharkhand": [],
    "Kerala": [],
    "Madhya Pradesh": [],
    "Manipur": [],

    "Meghalaya": [],
    "Mizoram": [],
    "Nagaland": [],
    "Odisha": [],
    "Punjab": [],

    "Rajasthan": [],
    "Sikkim": [],
    "Telangana": [],
    "Tripura": [],

    "Uttarakhand": [],
    "West Bengal": []
    
};
export default citiesData;