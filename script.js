// Boş data strukturu
let resumeData = {
  contactInfo: [],
  educationData: [],
  skillsData: [],
  languagesData: [],
  experienceData: [],
  profileText: '',
  referenceText: ''
};

// Səhifə yüklənəndə
document.addEventListener('DOMContentLoaded', function() {
  // Əgər localStorage'da data varsa yüklə
  const savedData = localStorage.getItem('resumeData');
  if (savedData) {
    resumeData = JSON.parse(savedData);
  }

  initializeEventListeners();
  renderAll();
  initializeDropdowns();
});

// Dropdownları başlat
function initializeDropdowns() {
  document.getElementById('contact-dropdown').style.display = 'block';
  document.getElementById('education-dropdown').style.display = 'block';
  document.getElementById('skills-dropdown').style.display = 'block';
  document.getElementById('languages-dropdown').style.display = 'block';
}

// Data yadda saxla
function saveData() {
  localStorage.setItem('resumeData', JSON.stringify(resumeData));
  console.log('Data saved:', resumeData);
}

// Event listener'ləri qur
function initializeEventListeners() {
  // Əlavə et düymələri
  document.getElementById('add-contact').addEventListener('click', addContact);
  document.getElementById('add-education').addEventListener('click', addEducation);
  document.getElementById('add-experience').addEventListener('click', addExperience);
  document.getElementById('add-skill').addEventListener('click', addSkill);
  document.getElementById('add-language').addEventListener('click', addLanguage);
  document.getElementById('save-all').addEventListener('click', saveData);

  // Dropdown toggles
  document.getElementById('contact-heading').addEventListener('click', () => toggleDropdown('contact-dropdown'));
  document.getElementById('education-heading').addEventListener('click', () => toggleDropdown('education-dropdown'));
  document.getElementById('skills-heading').addEventListener('click', () => toggleDropdown('skills-dropdown'));
  document.getElementById('languages-heading').addEventListener('click', () => toggleDropdown('languages-dropdown'));
}

// Bütün hissələri render et
function renderAll() {
  renderContactInfo();
  renderEducation();
  renderSkills();
  renderLanguages();
  renderExperience();
  renderProfile();
  renderReference();
}

// Kontakt məlumatları
function renderContactInfo() {
  const container = document.getElementById('contact-section');
  container.innerHTML = resumeData.contactInfo.length === 0 ?
    '<p class="empty-message">Kontakt məlumatı yoxdur</p>' : '';

  resumeData.contactInfo.forEach((info, index) => {
    const entry = document.createElement('div');
    entry.className = 'contact-entry';
    entry.innerHTML = `
      <span contenteditable="true">${info}</span>
      <button class="remove-btn" data-index="${index}">×</button>
      <button class="save-btn" data-type="contact" data-index="${index}">Yadda Saxla</button>
    `;
    container.appendChild(entry);
  });
}

function addContact() {
  const input = document.getElementById('new-contact');
  const text = input.value.trim();
  if (text) {
    resumeData.contactInfo.push(text);
    renderContactInfo();
    input.value = '';
    saveData();
  }
}

// Təhsil məlumatları
function renderEducation() {
  const container = document.querySelector('.education-container');
  container.innerHTML = resumeData.educationData.length === 0 ?
    '<p class="empty-message">Təhsil məlumatı yoxdur</p>' : '';

  resumeData.educationData.forEach((edu, index) => {
    const entry = document.createElement('div');
    entry.className = 'education-entry';
    entry.innerHTML = `
      <p><strong>Dərəcə:</strong> <span contenteditable="true">${edu.degree || ''}</span></p>
      <p><strong>Təhsil Müəssisəsi:</strong> <span contenteditable="true">${edu.school || ''}</span></p>
      <p><strong>İl:</strong> <span contenteditable="true">${edu.year || ''}</span></p>
      <button class="remove-btn" data-index="${index}">Sil</button>
      <button class="save-btn" data-type="education" data-index="${index}">Yadda Saxla</button>
    `;
    container.appendChild(entry);
  });
}

function addEducation() {
  resumeData.educationData.push({
    degree: '',
    school: '',
    year: ''
  });
  renderEducation();
  saveData();
}

// Bacarıqlar
function renderSkills() {
  const container = document.querySelector('.skills-container');
  container.innerHTML = resumeData.skillsData.length === 0 ?
    '<p class="empty-message">Bacarıq yoxdur</p>' : '';

  resumeData.skillsData.forEach((skill, index) => {
    const entry = document.createElement('div');
    entry.className = 'skill-entry';
    entry.innerHTML = `
      <span contenteditable="true">${skill}</span>
      <button class="remove-btn" data-index="${index}">×</button>
      <button class="save-btn" data-type="skill" data-index="${index}">Yadda Saxla</button>
    `;
    container.appendChild(entry);
  });
}

function addSkill() {
  const input = document.getElementById('new-skill');
  const text = input.value.trim();
  if (text) {
    resumeData.skillsData.push(text);
    renderSkills();
    input.value = '';
    saveData();
  }
}

// Dillər
function renderLanguages() {
  const container = document.querySelector('.languages-container');
  container.innerHTML = resumeData.languagesData.length === 0 ?
    '<p class="empty-message">Dil yoxdur</p>' : '';

  resumeData.languagesData.forEach((lang, index) => {
    const entry = document.createElement('div');
    entry.className = 'language-entry';
    entry.innerHTML = `
      <span contenteditable="true">${lang}</span>
      <button class="remove-btn" data-index="${index}">×</button>
      <button class="save-btn" data-type="language" data-index="${index}">Yadda Saxla</button>
    `;
    container.appendChild(entry);
  });
}

function addLanguage() {
  const input = document.getElementById('new-language');
  const text = input.value.trim();
  if (text) {
    resumeData.languagesData.push(text);
    renderLanguages();
    input.value = '';
    saveData();
  }
}

// Təcrübə
function renderExperience() {
  const container = document.querySelector('.experience-container');
  container.innerHTML = resumeData.experienceData.length === 0 ?
    '<p class="empty-message">Təcrübə yoxdur</p>' : '';

  resumeData.experienceData.forEach((exp, index) => {
    const entry = document.createElement('div');
    entry.className = 'experience-entry';
    entry.innerHTML = `
      <p><strong>Vəzifə:</strong> <span contenteditable="true">${exp.jobTitle || ''}</span></p>
      <p><strong>Şirkət:</strong> <span contenteditable="true">${exp.company || ''}</span></p>
      <p><strong>Müddət:</strong> <span contenteditable="true">${exp.duration || ''}</span></p>
      <p><strong>Təsvir:</strong> <span contenteditable="true">${exp.description || ''}</span></p>
      <button class="remove-btn" data-index="${index}">Sil</button>
      <button class="save-btn" data-type="experience" data-index="${index}">Yadda Saxla</button>
    `;
    container.appendChild(entry);
  });
}

function addExperience() {
  resumeData.experienceData.push({
    jobTitle: '',
    company: '',
    duration: '',
    description: ''
  });
  renderExperience();
  saveData();
}

// Profil və Referans
function renderProfile() {
  const el = document.getElementById('profile-text');
  el.textContent = resumeData.profileText || 'Burada özünüz haqqında məlumat yaza bilərsiniz';
  el.addEventListener('input', () => {
    resumeData.profileText = el.textContent;
    saveData();
  });
}

function renderReference() {
  const el = document.getElementById('reference-text');
  el.textContent = resumeData.referenceText || 'Referans məlumatları';
  el.addEventListener('input', () => {
    resumeData.referenceText = el.textContent;
    saveData();
  });
}

// Silmə funksiyaları
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-btn')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    const type = e.target.parentElement.querySelector('.save-btn').getAttribute('data-type');

    switch(type) {
      case 'contact':
        resumeData.contactInfo.splice(index, 1);
        renderContactInfo();
        break;
      case 'education':
        resumeData.educationData.splice(index, 1);
        renderEducation();
        break;
      case 'skill':
        resumeData.skillsData.splice(index, 1);
        renderSkills();
        break;
      case 'language':
        resumeData.languagesData.splice(index, 1);
        renderLanguages();
        break;
      case 'experience':
        resumeData.experienceData.splice(index, 1);
        renderExperience();
        break;
    }
    saveData();
  }
});

// Yadda saxlama funksiyası
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('save-btn')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    const type = e.target.getAttribute('data-type');
    const entry = e.target.parentElement;

    switch(type) {
      case 'contact':
        resumeData.contactInfo[index] = entry.querySelector('span').textContent.trim();
        break;
      case 'education':
        const eduFields = entry.querySelectorAll('span');
        resumeData.educationData[index] = {
          degree: eduFields[0].textContent.trim(),
          school: eduFields[1].textContent.trim(),
          year: eduFields[2].textContent.trim()
        };
        break;
      case 'skill':
        resumeData.skillsData[index] = entry.querySelector('span').textContent.trim();
        break;
      case 'language':
        resumeData.languagesData[index] = entry.querySelector('span').textContent.trim();
        break;
      case 'experience':
        const expFields = entry.querySelectorAll('span');
        resumeData.experienceData[index] = {
          jobTitle: expFields[0].textContent.trim(),
          company: expFields[1].textContent.trim(),
          duration: expFields[2].textContent.trim(),
          description: expFields[3].textContent.trim()
        };
        break;
    }

    e.target.textContent = 'Yadda Saxlanıldı!';
    setTimeout(() => e.target.textContent = 'Yadda Saxla', 2000);
    saveData();
  }
});

// Dropdown açıb bağlama
function toggleDropdown(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
  const heading = document.getElementById(id.replace('-dropdown', '-heading'));
  heading.innerHTML = heading.textContent.replace(/[▲▼]/, section.style.display === 'none' ? '▼' : '▲');
}