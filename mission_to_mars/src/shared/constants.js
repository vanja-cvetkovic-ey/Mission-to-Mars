export const HOME = {
  cta_text:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nostrum praesentium recusandae quidem quasi eaque, expedita tenetur exercitationem quam sed doloribus porro asperiores corporis laudantium aliquid aperiam id quisquam aut.',
  cta_btn_text: 'Start Application Process',
};

export const TERMS_AND_CONDITIONS = {
  header: 'Terms and Conditions',
  content: [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque nesciunt tempora quia, velit aut atque cum cumque autem obcaecati quidem cupiditate eaque minima minus asperiores expedita eius nam tempore eligendi. Doloremque dolores fugiat ab incidunt eveniet. Optio dignissimos corrupti voluptates. Necessitatibus unde consectetur magni tempore nisi nesciunt inventore et illo totam assumenda vitae sint ab accusantium, repudiandae labore iure dicta commodi facilis quo sit asperiores! Cupiditate, saepe. Nostrum, blanditiis officia!',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est cum autem obcaecati molestias ipsa et, suscipit beatae eligendi, velit quas libero cupiditate animi natus. Doloremque dolores fugiat ab incidunt eveniet. Optio dignissimos corrupti voluptates, aliquam necessitatibus nesciunt animi numquam facere. Cumque repellat facilis libero placeat, illo alias doloremque consequuntur quibusdam repudiandae quo sequi, modi at magnam ut a, exercitationem inventore?',
  ],
};

export const PRIVACY_NOTICE = {
  header: 'Privacy Notice',
  content: [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias debitis qui corrupti a soluta consequatur necessitatibus sint ipsa eius iusto quod, accusamus quos labore harum, mollitia veritatis hic ex commodi. Vel quidem sequi corrupti blanditiis excepturi quos praesentium saepe aperiam tempore nemo commodi neque pariatur, maiores odit. Adipisci ipsa ex totam fugit iusto cupiditate blanditiis, impedit maiores quod. Corrupti, labore?',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet assumenda consectetur fuga, quidem quasi quas, laborum dolorum iusto ab neque quod nam nostrum quam ex possimus consequuntur sed, corrupti exercitationem! Optio fugiat accusamus nisi sequi quidem iste illum nobis eligendi in eaque, aperiam nam praesentium dolorum nemo minus laborum molestias eveniet facilis reprehenderit perspiciatis error laudantium vitae totam tempora? Cupiditate!. Optio dignissimos corrupti voluptates, aliquam necessitatibus nesciunt animi numquam facere. Cumque repellat facilis libero placeat, illo alias doloremque consequuntur quibusdam repudiandae quo sequi, modi at magnam ut a, exercitationem inventore?',
  ],
};

export const ERROR = {
  heading: 'The page you are look for does not exist',
  text: 'But you can click the button bellow to go back to the homepage',
};

// application process page

export const APPLICATIONPROCESS = {
  heading: 'Application Wizard',
};
// application process page - wizard

export const WIZARD_WELCOME = {
  headign: 'Privacy Notice & Terms and Conditions agreement.',
  text: [
    'You are about to start the application process for EY-NASA mission to   Mars. Please read ',
    'before giving your consent. If you agree, EY and NASA will use the    data for the purposes of the legitimate interest(s) of the Mars    mission. The specific legitimate interest(s) are the provision of  mission planning and are for internal use by EY and NASA employees.',
  ],
  checkbox: [
    'I have read the above-mentioned documents',
    'I agree to above-mentioned documents',
  ],
  button: 'Proceed',
};

export const WIZARD_PAGE_1 = {
  heading: 'Page 1',
  title_label: 'Please provide your title and name',
  optionsTitle: [
    { value: '', label: 'Title', disabled: true },
    { value: 'Mrs', label: 'Mrs', disabled: false },
    { value: 'Mr', label: 'Mr', disabled: false },
    { value: 'Miss', label: 'Miss', disabled: false },
    { value: 'Dr', label: 'Dr', disabled: false },
  ],
  firstName_placeholder: 'First Name',
  lastName_placeholder: 'Last Name',
  birthdate_label: 'What is your date of birth?',
};

export const WIZARD_PAGE_2 = {
  heading: 'Page 2',
  email_label: `What's your email address?`,
  email_placeholder: 'email',
  adress1_label: 'Adress line 1',
  adress2_label: 'Adress line 2',
  state_label: 'State',
  city_label: 'City',
  zip_label: 'Postal Code',
  years_label: 'How many years have you lived there?',
  years: 'years',
};

export const WIZARD_PAGE_3 = {
  heading: 'Page 3',
  agriculture: `Do you have any agriculture skills`,
  agriculture_describe: `What? Please describe`,
  metalwork: `Do you have any metalwork skills?`,
  metalwork_set: `Which ones?`,
  checkboxes_MetalWorks: [
    { value: 'Marking', label: 'Marking' },
    { value: 'Cutting', label: 'Cutting' },
    { value: 'Drilling', label: 'Drilling' },
    {
      value: 'Cutting internal and external threads',
      label: 'Cutting internal and external threads',
    },
    { value: 'Filing', label: 'Filing' },
    { value: 'Joining', label: 'Joining' },
  ],
  convicted: 'Have you ever been convicted?',
  convicted_reason: 'For what?',
  convicted_date: 'When?',
  airplane: 'Do you know how to fly an airplane?',
  car: 'Do you know how to drive a car?',
  bicycle: 'Do you know how to drive a bicycle?',
  yes: 'Yes',
  no: 'No',
};

//
export const INFO = {
  form: 'Mandatory fields are labeld with',
};

//btns
export const BACKTOHOME = 'back to Home page';
export const CONTINUE = 'CONTINUE';

// urls
export const URL = {
  postApplications: 'http://det.api.rs.ey.com/api/applicants',
  states: 'http://det.api.rs.ey.com/api/states',
};
