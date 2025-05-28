import React, { useState, useEffect } from 'react';
import { Formik, Form as FormikForm, Field } from 'formik';
import {
  Container,
  Row,
  Col,
  Button,
  Form as BootstrapForm,
  Image,
  InputGroup,
  Spinner
} from 'react-bootstrap';
import { employeeValidationSchema } from '../../utils/validationSchemas'; // Using the new schema
import './EmployeeForm.scss';

const EmployeeForm = ({ initialValues, onSubmit, isEditMode, loading }) => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const employeeTypes = [
    'Manager', 'Admin', 'Resepsionis', 'Manajemen', 'Finance',
    'Kasir', 'Purchasing', 'Perawat', 'Bidan', 'Dokter'
  ];

  useEffect(() => {
    if (isEditMode && initialValues && initialValues.photoPath) {
      // Assuming photoPath is relative to API_BASE_URL/uploads/
      // Construct full URL if needed, or if it's already a full URL from initialValues
      const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      setPhotoPreview(`${baseUrl}/uploads/${initialValues.photoPath}`);
    } else if (initialValues && initialValues.photo) {
        // If photo is a File object (e.g. from a previous attempt before submission)
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(initialValues.photo);
    } else {
      setPhotoPreview(null);
    }
  }, [initialValues, isEditMode]);


  return (
    <Container fluid className="employee-form-container card-custom">
      <h4 className="page-header mb-4">
        {isEditMode ? 'FORM EDIT KARYAWAN' : 'FORM TAMBAH KARYAWAN'}
      </h4>
      <Formik
        initialValues={initialValues}
        validationSchema={employeeValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize // Important for edit mode to reinitialize with new initialValues
        context={{ isEditMode }} // Pass context for conditional validation (e.g. password)
      >
        {({ isSubmitting, setFieldValue, errors, touched, values }) => (
          <FormikForm>
            <Row>
              {/* Left Column */}
              <Col md={8}>
                <BootstrapForm.Group as={Row} className="mb-3">
                  <BootstrapForm.Label column sm={4} htmlFor="fullName">Nama Lengkap *</BootstrapForm.Label>
                  <Col sm={8}>
                    <Field as={BootstrapForm.Control} type="text" name="fullName" id="fullName" isInvalid={touched.fullName && !!errors.fullName} />
                    <BootstrapForm.Control.Feedback type="invalid">{errors.fullName}</BootstrapForm.Control.Feedback>
                  </Col>
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Row} className="mb-3">
                  <BootstrapForm.Label column sm={4} htmlFor="nik">No. Kartu Identitas (NIK) *</BootstrapForm.Label>
                  <Col sm={8}>
                    <Field as={BootstrapForm.Control} type="text" name="nik" id="nik" isInvalid={touched.nik && !!errors.nik} />
                    <BootstrapForm.Control.Feedback type="invalid">{errors.nik}</BootstrapForm.Control.Feedback>
                  </Col>
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Row} className="mb-3">
                  <BootstrapForm.Label column sm={4}>Jenis Kelamin *</BootstrapForm.Label>
                  <Col sm={8}>
                    <Field name="gender">
                      {({ field }) => (
                        <>
                          <BootstrapForm.Check inline type="radio" id="gender-male" label="Laki-laki" {...field} value="Laki-laki" checked={field.value === 'Laki-laki'} isInvalid={touched.gender && !!errors.gender} />
                          <BootstrapForm.Check inline type="radio" id="gender-female" label="Perempuan" {...field} value="Perempuan" checked={field.value === 'Perempuan'} isInvalid={touched.gender && !!errors.gender} />
                        </>
                      )}
                    </Field>
                    {touched.gender && errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
                  </Col>
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Row} className="mb-3">
                  <BootstrapForm.Label column sm={4} htmlFor="birthPlace">Tempat Lahir</BootstrapForm.Label>
                  <Col sm={8}>
                    <Field as={BootstrapForm.Control} type="text" name="birthPlace" id="birthPlace" isInvalid={touched.birthPlace && !!errors.birthPlace} />
                    <BootstrapForm.Control.Feedback type="invalid">{errors.birthPlace}</BootstrapForm.Control.Feedback>
                  </Col>
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Row} className="mb-3">
                  <BootstrapForm.Label column sm={4} htmlFor="birthDate">Tanggal Lahir</BootstrapForm.Label>
                  <Col sm={8}>
                    <Field as={BootstrapForm.Control} type="date" name="birthDate" id="birthDate" isInvalid={touched.birthDate && !!errors.birthDate} />
                    <BootstrapForm.Control.Feedback type="invalid">{errors.birthDate}</BootstrapForm.Control.Feedback>
                  </Col>
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Row} className="mb-3">
                  <BootstrapForm.Label column sm={4} htmlFor="phoneNumber">No. Telepon</BootstrapForm.Label>
                  <Col sm={8}>
                    <Field as={BootstrapForm.Control} type="text" name="phoneNumber" id="phoneNumber" isInvalid={touched.phoneNumber && !!errors.phoneNumber} />
                    <BootstrapForm.Control.Feedback type="invalid">{errors.phoneNumber}</BootstrapForm.Control.Feedback>
                  </Col>
                </BootstrapForm.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <BootstrapForm.Group>
                      <BootstrapForm.Label htmlFor="province">Provinsi</BootstrapForm.Label>
                      <Field as={BootstrapForm.Select} name="province" id="province" isInvalid={touched.province && !!errors.province}>
                        <option value="">Pilih Provinsi</option>
                        {/* Populate with actual data */}
                        <option value="Jawa Barat">Jawa Barat</option>
                        <option value="DKI Jakarta">DKI Jakarta</option>
                      </Field>
                      <BootstrapForm.Control.Feedback type="invalid">{errors.province}</BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>
                  </Col>
                  <Col md={6}>
                    <BootstrapForm.Group>
                      <BootstrapForm.Label htmlFor="city">Kota / Kabupaten</BootstrapForm.Label>
                      <Field as={BootstrapForm.Select} name="city" id="city" isInvalid={touched.city && !!errors.city}>
                        <option value="">Pilih Kota/Kabupaten</option>
                        {/* Populate based on province */}
                        <option value="Bandung">Bandung</option>
                        <option value="Jakarta Selatan">Jakarta Selatan</option>
                      </Field>
                      <BootstrapForm.Control.Feedback type="invalid">{errors.city}</BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>
                  </Col>
                </Row>

                 <Row className="mb-3">
                  <Col md={6}>
                    <BootstrapForm.Group>
                      <BootstrapForm.Label htmlFor="district">Kecamatan</BootstrapForm.Label>
                      <Field as={BootstrapForm.Select} name="district" id="district" isInvalid={touched.district && !!errors.district}>
                        <option value="">Pilih Kecamatan</option>
                        {/* Populate based on city */}
                      </Field>
                      <BootstrapForm.Control.Feedback type="invalid">{errors.district}</BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>
                  </Col>
                  <Col md={6}>
                    <BootstrapForm.Group>
                      <BootstrapForm.Label htmlFor="village">Kelurahan</BootstrapForm.Label>
                      <Field as={BootstrapForm.Select} name="village" id="village" isInvalid={touched.village && !!errors.village}>
                        <option value="">Pilih Kelurahan</option>
                        {/* Populate based on district */}
                      </Field>
                      <BootstrapForm.Control.Feedback type="invalid">{errors.village}</BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>
                  </Col>
                </Row>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="addressDetail">Detil Alamat</BootstrapForm.Label>
                  <Field as={BootstrapForm.Control} component="textarea" rows={3} name="addressDetail" id="addressDetail" isInvalid={touched.addressDetail && !!errors.addressDetail} />
                  <BootstrapForm.Control.Feedback type="invalid">{errors.addressDetail}</BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="photo">Foto Karyawan</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="file"
                    name="photo"
                    id="photo"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("photo", file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPhotoPreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                      } else {
                        setPhotoPreview(null);
                      }
                    }}
                    isInvalid={touched.photo && !!errors.photo}
                    accept="image/jpeg,image/png,image/gif"
                  />
                  <BootstrapForm.Control.Feedback type="invalid">{errors.photo}</BootstrapForm.Control.Feedback>
                  {photoPreview && (
                    <Image src={photoPreview} alt="Preview" thumbnail className="mt-2 employee-photo-preview" />
                  )}
                </BootstrapForm.Group>
              </Col>

              {/* Right Column */}
              <Col md={4}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="username">Username *</BootstrapForm.Label>
                  <Field as={BootstrapForm.Control} type="text" name="username" id="username" isInvalid={touched.username && !!errors.username} />
                  <BootstrapForm.Control.Feedback type="invalid">{errors.username}</BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="email">Email *</BootstrapForm.Label>
                  <Field as={BootstrapForm.Control} type="email" name="email" id="email" isInvalid={touched.email && !!errors.email} />
                  <BootstrapForm.Control.Feedback type="invalid">{errors.email}</BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="password">Password {isEditMode ? '(Kosongkan jika tidak diubah)' : '*'}</BootstrapForm.Label>
                  <Field as={BootstrapForm.Control} type="password" name="password" id="password" isInvalid={touched.password && !!errors.password} />
                  <BootstrapForm.Control.Feedback type="invalid">{errors.password}</BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Tipe *</BootstrapForm.Label>
                  <div className="employee-type-group">
                    <Row>
                      {employeeTypes.slice(0, Math.ceil(employeeTypes.length / 2)).map(type => (
                        <Col sm={6} key={type}>
                           <Field name="employeeType">
                            {({ field }) => (
                              <BootstrapForm.Check type="radio" id={`type-${type}`} label={type} {...field} value={type} checked={field.value === type} isInvalid={touched.employeeType && !!errors.employeeType}/>
                            )}
                          </Field>
                        </Col>
                      ))}
                    </Row>
                     <Row>
                       {employeeTypes.slice(Math.ceil(employeeTypes.length / 2)).map(type => (
                        <Col sm={6} key={type}>
                           <Field name="employeeType">
                            {({ field }) => (
                              <BootstrapForm.Check type="radio" id={`type-${type}`} label={type} {...field} value={type} checked={field.value === type} isInvalid={touched.employeeType && !!errors.employeeType}/>
                            )}
                          </Field>
                        </Col>
                      ))}
                    </Row>
                    <Row className="mt-2">
                        <Col sm={6}>
                             <Field name="employeeType">
                                {({ field }) => (
                                    <BootstrapForm.Check type="radio" id="type-Lainnya" label="Lainnya" {...field} value="Lainnya" checked={values.employeeType === 'Lainnya' || (!employeeTypes.includes(values.employeeType) && values.employeeType)} onChange={(e) => { if(e.target.checked) setFieldValue("employeeType", "Lainnya_value"); else setFieldValue("employeeType", "");}} isInvalid={touched.employeeType && !!errors.employeeType}/>
                                )}
                            </Field>
                        </Col>
                        <Col sm={6}>
                            { (values.employeeType === 'Lainnya_value' || (!employeeTypes.includes(values.employeeType) && values.employeeType)) && (
                                <Field
                                    as={BootstrapForm.Control}
                                    type="text"
                                    name="employeeType"
                                    placeholder="Tipe lainnya"
                                    onChange={(e) => setFieldValue("employeeType", e.target.value)}
                                    isInvalid={touched.employeeType && !!errors.employeeType && values.employeeType === ""}
                                />
                            )}
                        </Col>
                    </Row>
                  </div>
                  {touched.employeeType && errors.employeeType && <div className="invalid-feedback d-block">{errors.employeeType}</div>}
                </BootstrapForm.Group>


                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="contractStartDate">Tanggal Mulai Kontrak</BootstrapForm.Label>
                  <Field as={BootstrapForm.Control} type="date" name="contractStartDate" id="contractStartDate" isInvalid={touched.contractStartDate && !!errors.contractStartDate} />
                  <BootstrapForm.Control.Feedback type="invalid">{errors.contractStartDate}</BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="contractEndDate">Tanggal Selesai Kontrak</BootstrapForm.Label>
                  <Field as={BootstrapForm.Control} type="date" name="contractEndDate" id="contractEndDate" isInvalid={touched.contractEndDate && !!errors.contractEndDate} />
                  <BootstrapForm.Control.Feedback type="invalid">{errors.contractEndDate}</BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="maritalStatus">Status Menikah</BootstrapForm.Label>
                  <Field as={BootstrapForm.Select} name="maritalStatus" id="maritalStatus" isInvalid={touched.maritalStatus && !!errors.maritalStatus}>
                    <option value="">Pilih Status</option>
                    <option value="Belum Menikah">Belum Menikah</option>
                    <option value="Menikah">Menikah</option>
                    <option value="Cerai">Cerai</option>
                  </Field>
                  <BootstrapForm.Control.Feedback type="invalid">{errors.maritalStatus}</BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="bpjsDoctorCode">Kode Dokter BPJS</BootstrapForm.Label>
                  <Field as={BootstrapForm.Control} type="text" name="bpjsDoctorCode" id="bpjsDoctorCode" isInvalid={touched.bpjsDoctorCode && !!errors.bpjsDoctorCode} />
                  <BootstrapForm.Control.Feedback type="invalid">{errors.bpjsDoctorCode}</BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                 <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="status">Status Karyawan *</BootstrapForm.Label>
                  <Field as={BootstrapForm.Select} name="status" id="status" isInvalid={touched.status && !!errors.status}>
                    <option value="AKTIF">AKTIF</option>
                    <option value="NON-AKTIF">NON-AKTIF</option>
                  </Field>
                  <BootstrapForm.Control.Feedback type="invalid">{errors.status}</BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

              </Col>
            </Row>
            <Row>
              <Col className="text-end mt-4">
                <Button type="submit" variant="primary" disabled={loading || isSubmitting} style={{minWidth: '120px'}}>
                  {loading || isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Simpan'}
                </Button>
              </Col>
            </Row>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
};

export default EmployeeForm;