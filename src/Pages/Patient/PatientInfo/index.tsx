import { useCityApi } from "Api/useCityApi";
import { useCountryApi } from "Api/useCountryApi";
import { useDistrictApi } from "Api/useDistrictApi";
import { useFederativeUnityApi } from "Api/useFederativeUnityApi";
import { useFirstNurseryAppointmentApi } from "Api/useFirstNurseryAppointmentApi";
import { useHealthUnityApi } from "Api/useHealthUnityApi";
import { useSelectedPatient } from "Hooks/useSelectedPatient"
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { Patient } from "Api/Types/Patient";
import { ArrivalType } from "Api/Types/enums/ArrivalType";
import { EAddressZone } from "Api/Types/enums/EAddressZone";
import { EBiologicalGender } from "Api/Types/enums/EBiologicalGender";
import { PatientType } from "Api/Types/enums/PatientType";
import { MazziniFormSection } from "util/components/MazziniFormSection";

export const PatientInfo = () => {
    const { patient } = useSelectedPatient();

    const countryApi = useCountryApi();
    const federativeUnityApi = useFederativeUnityApi();
    const districtApi = useDistrictApi();
    const cityApi = useCityApi();
    const firstNurseryAppointmentApi = useFirstNurseryAppointmentApi();
    const healthUnityApi = useHealthUnityApi();

    const { data: federativeUnity } = federativeUnityApi.useShow(patient?.birthplaceId === 0 ? undefined : patient?.birthplaceId);
    const { data: country } = countryApi.useShow(federativeUnity?.countryId);
    const { data: district } = districtApi.useShow(patient?.districtId);
    const { data: city } = cityApi.useShow(district?.cityId);
    const { data: healthUnity } = healthUnityApi.useShow(patient?.healthUnityId);
    const navigate = useNavigate();

    const getPatientTypeLabel = (patient: Patient) => {
        switch (patient.type) {
            case PatientType.TB:
                return 'TB';
            case PatientType.PNT:
                return 'PNT';
            case PatientType.Chemoprofilaxys:
                return 'Quimioprofilaxia';
        }
    }

    const getPatientBiologicalGenderLabel = (biologicalGender: EBiologicalGender) => {
        switch (biologicalGender) {
            case EBiologicalGender.Female:
                return 'Feminino';
            case EBiologicalGender.Male:
                return 'Masculino';
        }
    }

    const getPatientAddressZoneLabel = (addressZone: EAddressZone) => {
        switch (addressZone) {
            case EAddressZone.Country:
                return 'Rural';
            case EAddressZone.Urban:
                return 'Urbana';
        }
    }

    return (
        <>
            <Container>
                {
                patient 
                &&
                <>
                    <Row className='justify-content-around form-mazzini-row'>
                        <Form.Group as={Col} md='5'>
                            <Form.Label>
                                N° do Cartão SUS
                            </Form.Label>
                            <Form.Control disabled value={patient?.id}/>
                        </Form.Group> 
                        <Form.Group as={Col} md='5'>
                            <Form.Label>
                                N° do Prontuário
                            </Form.Label>
                            <Form.Control disabled value={patient?.recordCode}/>
                        </Form.Group>
                    </Row>
                    <Row className='justify-content-center form-mazzini-row'>
                        <Form.Group as={Col} md='4'> 
                            <Form.Label>
                                Médico responsável
                            </Form.Label>
                            <Form.Control disabled value={'nome do médico'}/>
                        </Form.Group>
                    </Row>
                    <Row className='justify-content-center form-mazzini-row'>
                        <Form.Group as={Col} md='4'> 
                            <Form.Label>
                                Enfermeiro responsável
                            </Form.Label>
                            <Form.Control disabled value={'nome do Enfermeiro'}/>
                        </Form.Group>
                    </Row>
                    <MazziniFormSection title='Entrada'> 
                        <Row className='justify-content-evenly'>
                            <Col md='3'>
                                <Form.Group>
                                    <Form.Label>
                                        Data de admissão
                                    </Form.Label>
                                    <Form.Control
                                        disabled
                                        value={patient?.admissionDate}
                                        type='date'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check type='radio' checked={patient?.arrivalType === ArrivalType.SpontaneousDemand} label='Demanda espontânea'/>
                                    <Form.Check type='radio' checked={patient?.arrivalType === ArrivalType.Referenced} label='Referenciado'/>
                                    <Form.Check type='radio' checked={patient?.arrivalType === ArrivalType.Fowarded} label='Encaminhado'/>
                                </Form.Group>
                                {
                                    patient?.arrivalType === ArrivalType.Fowarded
                                    &&
                                    <Form.Group>
                                        <Form.Label>Unidade de saúde</Form.Label>
                                        <Form.Control value={healthUnity?.name} disabled/>
                                    </Form.Group>
                                }
                            </Col>
                            <Col md='3'>
                                <Form.Group>
                                    <Form.Label>
                                        Tipo de paciente
                                    </Form.Label>
                                    <Form.Control
                                        value={getPatientTypeLabel(patient)}
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check type='checkbox' checked={patient.isPregnant} label='Paciente gestante'/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </MazziniFormSection>
                    <MazziniFormSection title='Social'>
                        <Row className="form-mazzini-row">
                            <Form.Group as={Col} md='5'>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control disabled value={patient.name}/>
                            </Form.Group>
                            <Form.Group as={Col} md='5'>
                                <Form.Label>Nome da mãe</Form.Label>
                                <Form.Control disabled value={patient.motherName}/>
                            </Form.Group>
                        </Row>
                        <Row className="form-mazzini-row">
                            <Form.Group as={Col} md='5'>
                                <Form.Label>RG</Form.Label>
                                <Form.Control disabled value={patient.rg}/>
                            </Form.Group>
                            <Form.Group as={Col} md='5'>
                                <Form.Label>CPF</Form.Label>
                                <Form.Control disabled value={patient.cpf}/>
                            </Form.Group>
                        </Row>
                        <Row className='form-mazzini-row'>
                            <Form.Group as={Col} md='2'>
                                <Form.Label>Sexo</Form.Label>
                                <Form.Control disabled value={getPatientBiologicalGenderLabel(patient.biologicalGender)}/>
                            </Form.Group>
                            <Form.Group as={Col} md='2'>
                                <Form.Label>Data de nascimento</Form.Label>
                                <Form.Control type='date' value={patient.birthDate} disabled/>
                            </Form.Group>
                            <Form.Group as={Col} md='2'>
                                <Form.Label>Nacionalidade (País)</Form.Label>
                                <Form.Control disabled value={country?.name}/>
                            </Form.Group>
                            <Form.Group as={Col} md='2'>
                                <Form.Label>Naturalidade (UF)</Form.Label>
                                <Form.Control disabled value={federativeUnity?.name} />
                            </Form.Group>
                        </Row>
                    </MazziniFormSection>
                    <MazziniFormSection title='Contato'>
                        <Row>
                            <Form.Group as={Col} md='3'>
                                <Form.Label>Número de telefone</Form.Label>
                                <Form.Control disabled value={patient.telephone1}/>
                            </Form.Group>
                            <Form.Group as={Col} md='3'>
                                <Form.Label>Outro número de telefone</Form.Label>
                                <Form.Control disabled value={patient.telephone2}/>
                            </Form.Group>
                        </Row>
                    </MazziniFormSection>
                    <MazziniFormSection title='Endereço'>
                        <Row>
                            <Form.Group as={Col} md='3'>
                                <Form.Label>Cep</Form.Label>
                                <Form.Control value={patient.cep} disabled/>
                            </Form.Group>
                        </Row>
                        <Row title='form-mazzini-row'>
                            <Form.Group as={Col} md='5'>
                                <Form.Label>Rua</Form.Label>
                                <Form.Control disabled value={patient.addressStreet}/>
                            </Form.Group>
                            <Form.Group as={Col} md='1'>
                                <Form.Label>Número</Form.Label>
                                <Form.Control disabled value={patient.addressNumber}/>
                            </Form.Group>
                            <Form.Group as={Col} md='4'>
                                <Form.Label>Complemento</Form.Label>
                                <Form.Control disabled value={patient.addressComplement ?? ''}/>
                            </Form.Group>
                        </Row>
                        <Row className='form-mazzini-row'>
                            <Form.Group as={Col} md='2'>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control disabled value={city?.name}/>
                            </Form.Group>
                            <Form.Group as={Col} md='2'>
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control disabled value={district?.name}/>
                            </Form.Group>
                            <Form.Group as={Col} md='2'>
                                <Form.Label>Zona</Form.Label>
                                <Form.Control disabled value={getPatientAddressZoneLabel(patient.addressZone)}/>
                            </Form.Group>
                        </Row>
                        <Row className='mt-4 justify-content-center' onClick={() => navigate('/patientForm?patientId=' + patient.id)}>
                            <Col md='3' className='d-flex justify-content-center'>
                                <Button variant='warning' size='lg'>Editar</Button>
                            </Col>
                        </Row>
                    </MazziniFormSection>
                </>
            }
            </Container>
        </>
        
    
    )
}