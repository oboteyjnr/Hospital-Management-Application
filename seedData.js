const Department = require('../models/Department');
const Doctor = require('../models/Doctor');

const departments = [
  { name: 'Cardiology', description: 'Heart and cardiovascular care' },
  { name: 'General Medicine', description: 'Primary care and general health' },
  { name: 'Pediatrics', description: 'Care for infants, children, and adolescents' },
  { name: 'Orthopedics', description: 'Bones, joints, and musculoskeletal system' },
  { name: 'Neurology', description: 'Brain, spinal cord, and nervous system' },
  { name: 'Emergency', description: 'Emergency and urgent care services' },
  { name: 'Radiology', description: 'Medical imaging and diagnostics' },
  { name: 'Dermatology', description: 'Skin, hair, and nail conditions' },
  { name: 'Ophthalmology', description: 'Eye care and vision services' },
  { name: 'ENT', description: 'Ear, nose, and throat' },
  { name: 'Psychiatry', description: 'Mental health and behavioral disorders' },
  { name: 'Oncology', description: 'Cancer diagnosis and treatment' },
  { name: 'Obstetrics & Gynecology', description: 'Women\'s health and maternity care' },
  { name: 'Urology', description: 'Urinary tract and male reproductive system' },
  { name: 'Pulmonology', description: 'Respiratory system and lung diseases' },
];

const doctorsByDept = {
  'Cardiology': [
    { firstName: 'Sarah', lastName: 'Chen', specialization: 'Interventional Cardiologist', contactEmail: 's.chen@hospital.com' },
    { firstName: 'James', lastName: 'Wilson', specialization: 'Cardiac Electrophysiologist', contactEmail: 'j.wilson@hospital.com' },
    { firstName: 'Emily', lastName: 'Rodriguez', specialization: 'Heart Failure Specialist', contactEmail: 'e.rodriguez@hospital.com' },
  ],
  'General Medicine': [
    { firstName: 'Michael', lastName: 'Thompson', specialization: 'Internal Medicine', contactEmail: 'm.thompson@hospital.com' },
    { firstName: 'Lisa', lastName: 'Anderson', specialization: 'Family Medicine', contactEmail: 'l.anderson@hospital.com' },
    { firstName: 'David', lastName: 'Kim', specialization: 'General Practitioner', contactEmail: 'd.kim@hospital.com' },
  ],
  'Pediatrics': [
    { firstName: 'Jennifer', lastName: 'Martinez', specialization: 'Pediatrician', contactEmail: 'j.martinez@hospital.com' },
    { firstName: 'Robert', lastName: 'Brown', specialization: 'Neonatologist', contactEmail: 'r.brown@hospital.com' },
    { firstName: 'Amanda', lastName: 'Taylor', specialization: 'Pediatric Specialist', contactEmail: 'a.taylor@hospital.com' },
  ],
  'Orthopedics': [
    { firstName: 'Christopher', lastName: 'Lee', specialization: 'Orthopedic Surgeon', contactEmail: 'c.lee@hospital.com' },
    { firstName: 'Rachel', lastName: 'Green', specialization: 'Sports Medicine', contactEmail: 'r.green@hospital.com' },
    { firstName: 'Daniel', lastName: 'White', specialization: 'Joint Replacement Specialist', contactEmail: 'd.white@hospital.com' },
  ],
  'Neurology': [
    { firstName: 'Patricia', lastName: 'Harris', specialization: 'Neurologist', contactEmail: 'p.harris@hospital.com' },
    { firstName: 'Kevin', lastName: 'Clark', specialization: 'Stroke Specialist', contactEmail: 'k.clark@hospital.com' },
    { firstName: 'Laura', lastName: 'Lewis', specialization: 'Epilepsy Specialist', contactEmail: 'l.lewis@hospital.com' },
  ],
  'Emergency': [
    { firstName: 'Steven', lastName: 'Walker', specialization: 'Emergency Medicine', contactEmail: 's.walker@hospital.com' },
    { firstName: 'Michelle', lastName: 'Hall', specialization: 'Trauma Specialist', contactEmail: 'm.hall@hospital.com' },
    { firstName: 'Andrew', lastName: 'Young', specialization: 'Emergency Physician', contactEmail: 'a.young@hospital.com' },
  ],
  'Radiology': [
    { firstName: 'Nicole', lastName: 'King', specialization: 'Diagnostic Radiologist', contactEmail: 'n.king@hospital.com' },
    { firstName: 'Brian', lastName: 'Wright', specialization: 'Interventional Radiologist', contactEmail: 'b.wright@hospital.com' },
    { firstName: 'Stephanie', lastName: 'Scott', specialization: 'MRI Specialist', contactEmail: 's.scott@hospital.com' },
  ],
  'Dermatology': [
    { firstName: 'Jessica', lastName: 'Adams', specialization: 'Dermatologist', contactEmail: 'j.adams@hospital.com' },
    { firstName: 'Matthew', lastName: 'Baker', specialization: 'Skin Cancer Specialist', contactEmail: 'm.baker@hospital.com' },
  ],
  'Ophthalmology': [
    { firstName: 'Elizabeth', lastName: 'Nelson', specialization: 'Ophthalmologist', contactEmail: 'e.nelson@hospital.com' },
    { firstName: 'Ryan', lastName: 'Carter', specialization: 'Retina Specialist', contactEmail: 'r.carter@hospital.com' },
  ],
  'ENT': [
    { firstName: 'Samantha', lastName: 'Mitchell', specialization: 'Otolaryngologist', contactEmail: 's.mitchell@hospital.com' },
    { firstName: 'Jason', lastName: 'Perez', specialization: 'Head and Neck Surgeon', contactEmail: 'j.perez@hospital.com' },
  ],
  'Psychiatry': [
    { firstName: 'Karen', lastName: 'Roberts', specialization: 'Psychiatrist', contactEmail: 'k.roberts@hospital.com' },
    { firstName: 'Timothy', lastName: 'Turner', specialization: 'Child Psychiatrist', contactEmail: 't.turner@hospital.com' },
  ],
  'Oncology': [
    { firstName: 'Nancy', lastName: 'Phillips', specialization: 'Medical Oncologist', contactEmail: 'n.phillips@hospital.com' },
    { firstName: 'Mark', lastName: 'Campbell', specialization: 'Radiation Oncologist', contactEmail: 'm.campbell@hospital.com' },
  ],
  'Obstetrics & Gynecology': [
    { firstName: 'Angela', lastName: 'Parker', specialization: 'OB/GYN', contactEmail: 'a.parker@hospital.com' },
    { firstName: 'Paul', lastName: 'Evans', specialization: 'Maternal-Fetal Medicine', contactEmail: 'p.evans@hospital.com' },
  ],
  'Urology': [
    { firstName: 'Rebecca', lastName: 'Edwards', specialization: 'Urologist', contactEmail: 'r.edwards@hospital.com' },
    { firstName: 'George', lastName: 'Collins', specialization: 'Urologic Surgeon', contactEmail: 'g.collins@hospital.com' },
  ],
  'Pulmonology': [
    { firstName: 'Carol', lastName: 'Stewart', specialization: 'Pulmonologist', contactEmail: 'c.stewart@hospital.com' },
    { firstName: 'Donald', lastName: 'Morris', specialization: 'Critical Care Pulmonologist', contactEmail: 'd.morris@hospital.com' },
  ],
};

const seedDepartmentsAndDoctors = async () => {
  const deptCount = await Department.countDocuments();
  if (deptCount > 0) {
    console.log('Departments and doctors already seeded. Skipping.');
    return;
  }

  const createdDepts = {};
  for (const d of departments) {
    const dept = await Department.create(d);
    createdDepts[d.name] = dept._id;
  }
  console.log(`Created ${departments.length} departments.`);

  let doctorCount = 0;
  for (const [deptName, doctors] of Object.entries(doctorsByDept)) {
    const deptId = createdDepts[deptName];
    if (!deptId) continue;
    for (const doc of doctors) {
      await Doctor.create({
        ...doc,
        department: deptId,
        availability: 'available',
      });
      doctorCount++;
    }
  }
  console.log(`Created ${doctorCount} doctors.`);
};

module.exports = seedDepartmentsAndDoctors;
