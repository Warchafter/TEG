import React from 'react';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormControl,
    CFormLabel,
    CRow,
} from '@coreui/react';

const CreateBillProductCharacteristicLoader = (props) => {

    const [formControl, setFormControl] = React.useState([]);

    const handleInputChange = (e) => {
        const target = e.target;
        const value = e.target.type === 'checkbox' ? target.checked : target.value;
        const name = e.target.name;
        setFormControl({ ...formControl, [name]: value });
        console.log(formControl);
    };

    const handleSubmit = () => {
        console.log(formControl);
    };

    return (
        <React.Fragment>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>React Form Control</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">Email address</CFormLabel>
                                    <CFormControl
                                        type="email"
                                        id="exampleFormControlInput1"
                                        name="email"
                                        placeholder="name@example.com"
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlTextarea1">Example textarea</CFormLabel>
                                    <CFormControl
                                        component="textarea"
                                        id="exampleFormControlTextarea1"
                                        name="description1"
                                        onChange={(e) => handleInputChange(e)}
                                        rows="3"
                                    ></CFormControl>
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlTextarea2">Example textarea</CFormLabel>
                                    <CFormControl
                                        component="textarea"
                                        id="exampleFormControlTextarea2"
                                        name="description2"
                                        onChange={(e) => handleInputChange(e)}
                                        rows="3"
                                    ></CFormControl>
                                </div>
                                <div className="col-auto">
                                    <CButton type="submit" className="mb-3">
                                        Confirm identity
                                    </CButton>
                                </div>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>React Form Control</strong> <small>Sizing</small>
                        </CCardHeader>
                        <CCardBody>
                            <p className="text-medium-emphasis small">
                                Set heights using <code>size</code> property like <code>size=&#34;lg&#34;</code> and{' '}
                                <code>size=&#34;sm&#34;</code>.
                            </p>
                            <CFormControl
                                type="text"
                                size="lg"
                                placeholder="Large input"
                                aria-label="lg input example"
                            />
                            <br />
                            <CFormControl
                                type="text"
                                placeholder="Default input"
                                aria-label="default input example"
                            />
                            <br />
                            <CFormControl
                                type="text"
                                size="sm"
                                placeholder="Small input"
                                aria-label="sm input example"
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>React Form Control</strong> <small>Disabled</small>
                        </CCardHeader>
                        <CCardBody>
                            <p className="text-medium-emphasis small">
                                Add the <code>disabled</code> boolean attribute on an input to give it a grayed out
                                appearance and remove pointer events.
                                </p>
                            <CFormControl
                                type="text"
                                placeholder="Disabled input"
                                aria-label="Disabled input example"
                                disabled
                            />
                            <br />
                            <CFormControl
                                type="text"
                                placeholder="Disabled readonly input"
                                aria-label="Disabled input example"
                                disabled
                                readOnly
                            />
                            <br />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>React Form Control</strong> <small>Readonly plain text</small>
                        </CCardHeader>
                        <CCardBody>
                            <p className="text-medium-emphasis small">
                                If you want to have <code>&lt;input readonly&gt;</code> elements in your form styled
                                as plain text, use the <code>plainText</code> boolean property to remove the default
                                form field styling and preserve the correct margin and padding.
                            </p>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                                    Email
                                </CFormLabel>
                                <div className="col-sm-10">
                                    <CFormControl
                                        type="text"
                                        id="staticEmail"
                                        defaultValue="email@example.com"
                                        readOnly
                                        plainText
                                    />
                                </div>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                    Password
                                </CFormLabel>
                                <div className="col-sm-10">
                                    <CFormControl type="password" id="inputPassword" />
                                </div>
                            </CRow>
                            <CForm className="row g-3">
                                <div className="col-auto">
                                    <CFormLabel htmlFor="staticEmail2" className="visually-hidden">
                                        Email
                                    </CFormLabel>
                                    <CFormControl
                                        type="text"
                                        id="staticEmail2"
                                        defaultValue="email@example.com"
                                        readOnly
                                        plainText
                                    />
                                </div>
                                <div className="col-auto">
                                    <CFormLabel htmlFor="inputPassword2" className="visually-hidden">
                                        Password
                                    </CFormLabel>
                                    <CFormControl type="password" id="inputPassword2" placeholder="Password" />
                                </div>
                                <div className="col-auto">
                                    <CButton type="submit" className="mb-3">
                                        Confirm identity
                                    </CButton>
                                </div>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </React.Fragment>
    );
};

export default CreateBillProductCharacteristicLoader;