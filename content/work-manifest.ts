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
    'Advanced research work demonstrating scientific analysis, literature synthesis, and applied pharmaceutical sciences expertise.',
    '2026_Harman_Kaur_Thesis 1.pdf',
  ),
  documentWork(
    'Clinical Trial Cover Letter',
    'Targeted professional cover letter highlighting clinical research interest, scientific communication, and pharmacy experience.',
    'Cover Letter clinical trial 1.pdf',
  ),
  documentWork(
    'Research and Development Resume',
    'Resume focused on research, pharmaceutical development, technical capabilities, and evidence-based work.',
    'HarmanResume R&D 1.pdf',
  ),
  documentWork(
    'Scientific Writing Resume',
    'Resume emphasizing scientific writing, literature review, clinical documentation, and healthcare communication.',
    'HarmanResume SciWrite.docx',
  ),
  documentWork(
    'APhA Professional Portfolio',
    'Leadership and professional portfolio highlighting communication, service, and pharmacy engagement.',
    'Harman Kaur APhA 1.pdf',
  ),
  documentWork(
    'Medication Reconciliation Policies',
    'Healthcare documentation focused on medication reconciliation processes, clinical workflow, and patient safety.',
    'Med-rec Policies Columbia hospital 1.pdf',
  ),
  documentWork(
    'Pregnancy Hypertension Presentation',
    'Clinical presentation covering pregnancy-related hypertension and key therapeutic considerations in patient care.',
    'Pregnancy HTN presentation 1.pdf',
  ),
  documentWork(
    'Rapid Screening Point Mutation Journal Club',
    'Evidence-based review of rapid screening methods and their applications in clinical and research settings.',
    'Rapid Screening Point Mutation-Journal Club 1.pdf',
  ),
  documentWork(
    'Syringe Service Program',
    'Public health analysis of syringe service programs and their role in harm reduction and community health.',
    'Syringe Service Program 1.pdf',
  ),
  documentWork(
    'CITI Completion Certificate',
    'Completion certificate documenting research ethics and regulatory compliance training relevant to clinical work.',
    'citiCompletionCertificate_11836906_53441833 1.pdf',
  ),
];
