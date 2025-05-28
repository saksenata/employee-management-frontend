import * as yup from 'yup';

const supportedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

// Helper for optional file validation
const fileValidation = yup
  .mixed()
  .optional()
  .nullable()
  .test('fileSize', `Ukuran file terlalu besar. Maksimal ${maxFileSize / (1024 * 1024)}MB.`, (value) => {
    if (!value) return true; // Optional: no file is valid
    return value.size <= maxFileSize;
  })
  .test('fileType', `Tipe file tidak didukung. Hanya ${supportedFileTypes.join(', ')}.`, (value) => {
    if (!value) return true; // Optional: no file is valid
    return supportedFileTypes.includes(value.type);
  });


export const employeeValidationSchema = yup.object().shape({
  fullName: yup.string().required('Nama Lengkap wajib diisi').min(3, 'Nama Lengkap minimal 3 karakter'),
  nik: yup.string().required('No. Kartu Identitas (NIK) wajib diisi').matches(/^[0-9]{16}$/, 'NIK harus 16 digit angka'),
  gender: yup.string().required('Jenis Kelamin wajib diisi').oneOf(['Laki-laki', 'Perempuan'], 'Jenis Kelamin tidak valid'),
  birthPlace: yup.string().optional().nullable(),
  birthDate: yup.date().optional().nullable().typeError('Format Tanggal Lahir tidak valid (YYYY-MM-DD)'),
  phoneNumber: yup.string().optional().nullable().matches(/^(|[0-9]{10,15})$/, 'No. Telepon tidak valid (10-15 digit)'), // Allow empty string
  province: yup.string().optional().nullable(),
  city: yup.string().optional().nullable(),
  district: yup.string().optional().nullable(), // Kecamatan
  village: yup.string().optional().nullable(), // Kelurahan
  addressDetail: yup.string().optional().nullable(),
  username: yup.string().required('Username wajib diisi').min(3, 'Username minimal 3 karakter'),
  email: yup.string().required('Email wajib diisi').email('Format Email tidak valid'),
  password: yup.string()
    .when('$isEditMode', { // $isEditMode is a context variable passed to Formik's validate function
      is: true,
      then: (schema) => schema.optional().nullable().min(6, 'Password minimal 6 karakter jika diubah'),
      otherwise: (schema) => schema.required('Password wajib diisi').min(6, 'Password minimal 6 karakter'),
    }),
  employeeType: yup.string().required('Tipe Karyawan wajib diisi'),
  // If 'Lainnya' is selected for employeeType, then a custom field should appear.
  // This might require conditional validation or a separate field in Formik.
  // For simplicity, we assume employeeType can hold the custom value directly.
  // employeeTypeOther: yup.string().when('employeeType', {
  //   is: (val) => val === 'Lainnya', // Assuming 'Lainnya' is a value that indicates custom input
  //   then: (schema) => schema.required('Tipe Karyawan Lainnya wajib diisi'),
  //   otherwise: (schema) => schema.optional().nullable(),
  // }),
  contractStartDate: yup.date().optional().nullable().typeError('Format Tanggal Mulai Kontrak tidak valid (YYYY-MM-DD)'),
  contractEndDate: yup.date().optional().nullable().typeError('Format Tanggal Selesai Kontrak tidak valid (YYYY-MM-DD)')
    .when('contractStartDate', (contractStartDate, schema) => {
      // contractStartDate is an array with the value, so contractStartDate[0]
      const startDate = contractStartDate && contractStartDate[0] ? new Date(contractStartDate[0]) : null;
      return startDate ? schema.min(startDate, 'Tanggal Selesai Kontrak harus setelah Tanggal Mulai Kontrak') : schema;
    }),
  maritalStatus: yup.string().optional().nullable(),
  bpjsDoctorCode: yup.string().optional().nullable(),
  status: yup.string().required('Status wajib diisi').oneOf(['AKTIF', 'NON-AKTIF'], 'Status tidak valid'),
  photo: fileValidation, // Use the reusable file validation
});