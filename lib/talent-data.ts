export const TALENT_CATEGORIES = [
  { id: 'kitchen', title: 'Kitchen', line: 'Restaurant, hotel, banquet and production kitchens.', roles: ['Chef','Executive Chef','Sous Chef','Line Cook','Prep Cook','Grill Cook','Fry Cook','Breakfast Cook','Pastry Cook','Baker','Butcher','Garde Manger','Kitchen Manager','Dish / Utility'] },
  { id: 'private-chefs', title: 'Private + Personal Chefs', line: 'In-home, travel, villa, family and residency work.', roles: ['Private Chef','Personal Chef','Vacation Chef','Villa Chef','Travel Chef','Meal Prep Chef','Family Chef','Chef Residency','Yacht Chef','Specialty Diet Chef'] },
  { id: 'catering-events', title: 'Catering + Events', line: 'Weddings, corporate, celebrations, festivals and event crews.', roles: ['Catering Chef','Event Cook','Banquet Cook','Catering Assistant','Event Captain','Server','Banquet Server','Bartender','Barback','Runner','Busser','Setup / Breakdown Crew','Dish / Utility','Event Lead'] },
  { id: 'prep-production', title: 'Prep + Production', line: 'Outsourced prep and production connected to Prep Your Shift™.', roles: ['Prep Partner','Production Cook','Batch Cook','Sauce Production','Produce Prep','Protein Prep','Seafood Prep','Butchery','Pastry Production','Meal Component Production','Packaging + Labeling'] },
  { id: 'food-businesses', title: 'Food Businesses', line: 'Independent operators building a bookable culinary business.', roles: ['Caterer','Food Truck','Mobile Food Vendor','Pop-Up Operator','Meal Prep Company','Bakery','Dessert Business','Personal Chef Company','Private Chef Company','Specialty Food Producer'] },
  { id: 'foh', title: 'Front of House + Hospitality', line: 'Guest-facing professionals who make service run.', roles: ['Server','Bartender','Bar Lead','Event Captain','Host','Hospitality Lead','Guest Experience','Banquet Staff','Event Staff'] },
  { id: 'specialty', title: 'Specialty Talent', line: 'Distinct culinary crafts, beverage, live fire and dietary skill.', roles: ['Cake Artist','Pastry Chef','Pitmaster','Sushi Chef','Raw Bar / Oyster Professional','Mixologist','Sommelier','Coffee / Barista Professional','Carver','Live-Fire Cook','Seafood Specialist','Vegan / Plant-Based Chef','Dietary / Allergy-Sensitive Specialist'] },
  { id: 'support', title: 'Culinary Support', line: 'Operations, instruction, development, logistics and content.', roles: ['Purchasing','Kitchen Manager','Food Production Manager','Event Logistics','Catering Operations','Culinary Instructor','Menu Development','Recipe Development','Food Stylist','Culinary Content Creator','Food Photographer'] },
  { id: 'other', title: 'Other / Tell Us What You Do', line: 'Your lane does not have to fit a box.', roles: ['Other'] },
] as const;

export const OPPORTUNITY_TYPES = [
  ['Pick-Up Work','One-time or short-duration opportunities.'],
  ['Event Work','Weddings, parties, corporate events, festivals and catering.'],
  ['Private Clients','Private dining, vacation homes and recurring household clients.'],
  ['Prep + Production','Outsourced prep and production through Prep Your Shift™.'],
  ['Full-Time','Longer-term employment opportunities.'],
  ['Part-Time','Recurring part-time work.'],
  ['Travel','Destination events, resorts, villas and chef travel.'],
  ['Build My Business','Marketplace exposure for independent culinary businesses.'],
] as const;

export const US_MARKETS: Record<string, string[]> = {
  AL:['Birmingham','Huntsville','Mobile','Montgomery'], AK:['Anchorage','Fairbanks','Juneau','Wasilla'], AZ:['Phoenix','Scottsdale','Tucson','Mesa'], AR:['Little Rock','Fayetteville','Bentonville','Fort Smith'],
  CA:['Los Angeles','San Diego','San Francisco','Palm Springs'], CO:['Denver','Colorado Springs','Boulder','Aspen'], CT:['Hartford','New Haven','Stamford','Greenwich'], DE:['Wilmington','Dover','Newark','Rehoboth Beach'],
  FL:['Miami','Orlando','Tampa','Naples'], GA:['Atlanta','Savannah','Augusta','Athens'], HI:['Honolulu','Maui','Kailua-Kona','Kauai'], ID:['Boise','Coeur d’Alene','Idaho Falls','Sun Valley'],
  IL:['Chicago','Springfield','Naperville','Peoria'], IN:['Indianapolis','Fort Wayne','South Bend','Bloomington'], IA:['Des Moines','Cedar Rapids','Iowa City','Davenport'], KS:['Wichita','Kansas City','Overland Park','Topeka'],
  KY:['Louisville','Lexington','Bowling Green','Covington'], LA:['New Orleans','Baton Rouge','Lafayette','Shreveport'], ME:['Portland','Bangor','Augusta','Bar Harbor'], MD:['Baltimore','Annapolis','Bethesda','Frederick'],
  MA:['Boston','Cambridge','Worcester','Cape Cod'], MI:['Detroit','Grand Rapids','Ann Arbor','Traverse City'], MN:['Minneapolis','St. Paul','Rochester','Duluth'], MS:['Jackson','Gulfport','Oxford','Biloxi'],
  MO:['St. Louis','Kansas City','Springfield','Columbia'], MT:['Bozeman','Missoula','Billings','Whitefish'], NE:['Omaha','Lincoln','Grand Island','Kearney'], NV:['Las Vegas','Reno','Henderson','Lake Tahoe'],
  NH:['Manchester','Portsmouth','Nashua','Concord'], NJ:['Newark','Jersey City','Atlantic City','Princeton'], NM:['Albuquerque','Santa Fe','Las Cruces','Taos'], NY:['New York City','Buffalo','Rochester','Albany'],
  NC:['Raleigh','Durham','Chapel Hill','Cary'], ND:['Fargo','Bismarck','Grand Forks','Minot'], OH:['Columbus','Cleveland','Cincinnati','Dayton'], OK:['Oklahoma City','Tulsa','Norman','Broken Arrow'],
  OR:['Portland','Eugene','Bend','Salem'], PA:['Philadelphia','Pittsburgh','Harrisburg','Poconos'], RI:['Providence','Newport','Warwick','Cranston'], SC:['Charleston','Columbia','Greenville','Myrtle Beach'],
  SD:['Sioux Falls','Rapid City','Brookings','Aberdeen'], TN:['Nashville','Memphis','Knoxville','Chattanooga'], TX:['Dallas','Houston','Austin','San Antonio'], UT:['Salt Lake City','Park City','Provo','St. George'],
  VT:['Burlington','Stowe','Montpelier','Manchester'], VA:['Richmond','Virginia Beach','Arlington','Charlottesville'], WA:['Seattle','Tacoma','Spokane','Bellevue'], WV:['Charleston','Morgantown','Huntington','Wheeling'],
  WI:['Milwaukee','Madison','Green Bay','Lake Geneva'], WY:['Jackson','Cheyenne','Casper','Laramie']
};

export const STATE_NAMES: Record<string,string> = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'
};

export const CUISINE_TAGS = ['Southern','Global','Caribbean','Latin','Italian','French','Asian','Mediterranean','African','BBQ','Seafood','Pastry','Vegan','Plant-Based','Gluten-Free','Fine Dining','Comfort Food','High-Volume','Banquet','Live Fire'];
export const WORK_BACKGROUNDS = ['Restaurant','Hotel / Resort','Catering','Private Chef','Personal Chef','Banquets','Institutional Food Service','Food Truck','Bakery','Meal Prep','Events','Production Kitchen','Corporate Dining','Military / Government Food Service','Other'];
