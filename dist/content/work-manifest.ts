export type ContentWork = {
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  link: string;
};

const contentFile = (fileName: string): string =>
  `content/${encodeURIComponent(fileName).replaceAll('%2F', '/')}`;

const documentFiles = [
  '2026_Harman_Kaur_Thesis 1.pdf',
  'Calcium protocol-Flyer 1.pdf',
  'Comparing tow doses-Journal Club 1.pdf',
  'Cover Letter clinical trial 1.pdf',
  'Eye Drops Vs Ear Drops 1.pdf',
  'Ezetimibe added to Statin -Journal Club 1.pdf',
  'Flu vaccination-Flyer 1.pdf',
  'Harman Kaur APhA 1.pdf',
  'HarmanResume R&D 1.pdf',
  'HarmanResume SciWrite.docx',
  'Harman_Kaur_APhA_PacificUniversity_Letterhead 1.pdf',
  'Hydroxocobalamin and Cyanocobalamin 1.pdf',
  'Immunization Traning Certificate 1.pdf',
  'Industry Pharmacists Organization Brochure 1.pdf',
  'Inspiration - Essay 1.pdf',
  'Journal Club - Lyrica 1.pdf',
  'KaurH_IPisBest-essay 1.pdf',
  'Leishmania Presentation - Thesis 1.pdf',
  'Letter of Intent -APhA 1.pdf',
  'Med-rec Policies Columbia hospital 1.pdf',
  'Patient education flyer for Urushiol allergy 1.pdf',
  'PPAL Shark Tank Final Paper 1.pdf',
  'Pregnancy HTN presentation 1.pdf',
  'Rapid Screening Point Mutation-Journal Club 1.pdf',
  'Safety First - CDC Essay 1.pdf',
  'Schizophrenia Presentation 1.pdf',
  'Syringe Service Program 1.pdf',
  'citiCompletionCertificate_11836906_53441833 1.pdf',
  'Hello from sunny - sunnysingh.hj07@gmail.com - Gmail.pdf',
  'harmanjit-kaur-resume.docx',
];

const categoryFor = (fileName: string): string => {
  if (/Cover Letter|Letter of Intent/.test(fileName)) {
    return 'Cover Letters';
  }

  if (/Certificate|citiCompletion/.test(fileName)) {
    return 'Certificates';
  }

  if (/Resume/.test(fileName)) {
    return 'Resumes';
  }

  if (/Flyer|Eye Drops|Urushiol/.test(fileName)) {
    return 'Posters & Patient Education';
  }

  if (/Journal Club/.test(fileName)) {
    return 'Journal Clubs';
  }

  if (/Thesis|Leishmania|Rapid Screening/.test(fileName)) {
    return 'Research & Thesis';
  }

  if (/APhA|Industry Pharmacists|PPAL/.test(fileName)) {
    return 'Professional & Leadership';
  }

  return 'Essays & Public Health';
};

const imageFor = (fileName: string): string => {
  const imageIndex = documentFiles.indexOf(fileName) + 1;
  return `work-images/document-${String(imageIndex).padStart(2, '0')}.jpg`;
};

const documentWork = (
  title: string,
  description: string,
  fileName: string,
): ContentWork => ({
  title,
  description,
  imageUrl: imageFor(fileName),
  category: categoryFor(fileName),
  link: contentFile(fileName),
});

export const CONTENT_WORK: ContentWork[] = [
  documentWork(
    'Pharmaceutical Sciences Thesis',
    'Thesis work documenting advanced pharmaceutical sciences research and scientific analysis.',
    '2026_Harman_Kaur_Thesis 1.pdf',
  ),
  documentWork(
    'Calcium Protocol Flyer',
    'Patient-facing educational material explaining a calcium protocol in a clear, accessible format.',
    'Calcium protocol-Flyer 1.pdf',
  ),
  documentWork(
    'Comparing Two Doses Journal Club',
    'Journal club analysis comparing therapeutic doses and translating evidence into practical discussion points.',
    'Comparing tow doses-Journal Club 1.pdf',
  ),
  documentWork(
    'Clinical Trial Cover Letter',
    'Professional cover letter tailored to clinical trial and pharmaceutical research opportunities.',
    'Cover Letter clinical trial 1.pdf',
  ),
  documentWork(
    'Eye Drops vs Ear Drops',
    'Patient education resource comparing eye and ear drop administration for safer medication use.',
    'Eye Drops Vs Ear Drops 1.pdf',
  ),
  documentWork(
    'Ezetimibe Added to Statin Journal Club',
    'Evidence review of ezetimibe added to statin therapy, with clinical interpretation of study findings.',
    'Ezetimibe added to Statin -Journal Club 1.pdf',
  ),
  documentWork(
    'Flu Vaccination Flyer',
    'Public health flyer communicating seasonal influenza vaccination information.',
    'Flu vaccination-Flyer 1.pdf',
  ),
  documentWork(
    'APhA Professional Portfolio',
    'Professional pharmacy organization materials highlighting leadership, communication, and service.',
    'Harman Kaur APhA 1.pdf',
  ),
  documentWork(
    'Research and Development Resume',
    'Resume focused on research, development, pharmaceutical sciences, and technical capabilities.',
    'HarmanResume R&D 1.pdf',
  ),
  documentWork(
    'Scientific Writing Resume',
    'Resume focused on scientific writing, evidence synthesis, and healthcare communication.',
    'HarmanResume SciWrite.docx',
  ),
  documentWork(
    'APhA Letterhead Portfolio',
    'Pharmacy leadership and professional communication prepared for the American Pharmacists Association.',
    'Harman_Kaur_APhA_PacificUniversity_Letterhead 1.pdf',
  ),
  documentWork(
    'Hydroxocobalamin and Cyanocobalamin',
    'Clinical comparison of hydroxocobalamin and cyanocobalamin with practical medication considerations.',
    'Hydroxocobalamin and Cyanocobalamin 1.pdf',
  ),
  documentWork(
    'Immunization Training Certificate',
    'Certificate documenting completed immunization training and pharmacy practice development.',
    'Immunization Traning Certificate 1.pdf',
  ),
  documentWork(
    'Industry Pharmacists Organization Brochure',
    'Informational brochure communicating opportunities and value within industry pharmacy.',
    'Industry Pharmacists Organization Brochure 1.pdf',
  ),
  documentWork(
    'Inspiration Essay',
    'Reflective essay demonstrating written communication, perspective, and professional development.',
    'Inspiration - Essay 1.pdf',
  ),
  documentWork(
    'Lyrica Journal Club',
    'Journal club presentation evaluating evidence and clinical considerations for Lyrica.',
    'Journal Club - Lyrica 1.pdf',
  ),
  documentWork(
    'IP Is Best Essay',
    'Essay exploring the role and value of intellectual property in pharmaceutical innovation.',
    'KaurH_IPisBest-essay 1.pdf',
  ),
  documentWork(
    'Leishmania Thesis Presentation',
    'Research presentation translating thesis findings on Leishmania into a structured scientific narrative.',
    'Leishmania Presentation - Thesis 1.pdf',
  ),
  documentWork(
    'APhA Letter of Intent',
    'Letter of intent describing pharmacy leadership interests, goals, and professional contribution.',
    'Letter of Intent -APhA 1.pdf',
  ),
  documentWork(
    'Medication Reconciliation Policies',
    'Healthcare documentation reviewing medication reconciliation policies in a hospital setting.',
    'Med-rec Policies Columbia hospital 1.pdf',
  ),
  documentWork(
    'Urushiol Allergy Patient Flyer',
    'Patient education flyer explaining urushiol allergy prevention and response.',
    'Patient education flyer for Urushiol allergy 1.pdf',
  ),
  documentWork(
    'PPAL Shark Tank Final Paper',
    'Final paper presenting a healthcare concept through structured analysis and persuasive communication.',
    'PPAL Shark Tank Final Paper 1.pdf',
  ),
  documentWork(
    'Pregnancy Hypertension Presentation',
    'Clinical presentation covering pregnancy-related hypertension and key therapeutic considerations.',
    'Pregnancy HTN presentation 1.pdf',
  ),
  documentWork(
    'Rapid Screening Point Mutation Journal Club',
    'Evidence review of rapid screening methods for point mutations and their research applications.',
    'Rapid Screening Point Mutation-Journal Club 1.pdf',
  ),
  documentWork(
    'Safety First CDC Essay',
    'Public health essay focused on safety, prevention, and evidence-based CDC guidance.',
    'Safety First - CDC Essay 1.pdf',
  ),
  documentWork(
    'Schizophrenia Presentation',
    'Clinical presentation synthesizing schizophrenia science, treatment, and patient-care considerations.',
    'Schizophrenia Presentation 1.pdf',
  ),
  documentWork(
    'Syringe Service Program',
    'Public health work examining syringe service programs and their role in harm reduction.',
    'Syringe Service Program 1.pdf',
  ),
  documentWork(
    'CITI Completion Certificate',
    'Certificate documenting completion of research ethics and compliance training.',
    'citiCompletionCertificate_11836906_53441833 1.pdf',
  ),
  documentWork(
    'Professional Correspondence Sample',
    'Professional correspondence sample demonstrating clear, thoughtful written communication.',
    'Hello from sunny - sunnysingh.hj07@gmail.com - Gmail.pdf',
  ),
  documentWork(
    'Research and Clinical Resume',
    'Editable resume document highlighting research, clinical, and pharmacy experience.',
    'harmanjit-kaur-resume.docx',
  ),
];
