"use client";
import { useState, useEffect } from "react";
import { usePatientsContext } from "@/app/context/Patients";
import { useUIContext } from "@/app/context/Ui";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { DatePicker } from "@mui/x-date-pickers";
import List from "./List";

import { formatCPFInput } from "@/libs/formatting";
import countries from "@/libs/countries";
import { FaXmark, FaChevronDown } from "react-icons/fa6";

export default function ModalPatient(): JSX.Element {
  const { patients, setPatients } = usePatientsContext();
  const { setModalPatientShown, modalPatientData, setModalPatientData } = useUIContext();
  
  const [tabShown, setTabShown] = useState<"personal" | "contact">("personal");
  const [shownList, setShownList] = useState<"nationality" | "gender" | "marital_status" | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  
  const [newName, setNewName] = useState<string>(modalPatientData?.name || "");
  const [newNickname, setNewNickname] = useState<string>(modalPatientData?.nickname || "");
  const [newEmail, setNewEmail] = useState<string>(modalPatientData?.email || "");
  const [newCPF, setNewCPF] = useState<string>(modalPatientData?.cpf || "");
  const [newRG, setNewRG] = useState<string>(modalPatientData?.rg || "");
  const [newBirth, setNewBirth] = useState<Date>(modalPatientData?.birth ? new Date(modalPatientData.birth) : new Date());
  const [newNationality, setNewNationality] = useState<string>(modalPatientData?.nationality || "");
  const [newGender, setNewGender] = useState<TGender>("not_declared");
  const [newMaritalStatus, setNewMaritalStatus] = useState<TMaritalStatus>("not_declared");
  const [newObservations, setNewObservations] = useState<string>(modalPatientData?.observations || "");

  const [newIBGE, setNewIBGE] = useState<string>(modalPatientData?.address?.ibge || "");
  const [newCEP, setNewCEP] = useState<string>(modalPatientData?.address?.cep || "");
  const [newCity, setNewCity] = useState<string>(modalPatientData?.address?.city || "");
  const [newUF, setNewUF] = useState<string>(modalPatientData?.address?.uf || "");
  const [newNeighborhood, setNewNeighborhood] = useState<string>(modalPatientData?.address?.neighborhood || "");
  const [newStreet, setNewStreet] = useState<string>(modalPatientData?.address?.street || "");
  const [newNumber, setNewNumber] = useState<string>(modalPatientData?.address?.number ? modalPatientData?.address?.number.toString() : "");
  const [newComplement, setNewComplement] = useState<string>(modalPatientData?.address?.complement || "");

  const displayGenders = [
    { key: "male", name: "Masculino", ref: newGender },
    { key: "female", name: "Feminino", ref: newGender },
    { key: "other", name: "Outro", ref: newGender },
    { key: "not_declared", name: "Não declarado", ref: newGender }
  ];

  const displayMaritalStatuses = [
    { key: "single", name: "Solteiro(a)", ref: newMaritalStatus },
    { key: "married", name: "Casado(a)", ref: newMaritalStatus },
    { key: "divorced", name: "Divorciado(a)", ref: newMaritalStatus },
    { key: "widowed", name: "Viúvo(a)", ref: newMaritalStatus },
    { key: "not_declared", name: "Não declarado", ref: newMaritalStatus }
  ];

  function hideModal() {
    setModalPatientShown(false);
    setModalPatientData(null);
  }
  function toggleShownList(next: "nationality" | "gender" | "marital_status" | null) {
    if (shownList === next)
      setShownList(null);

    else
      setShownList(next);
  }

  async function PUTPatient() {
    const newPatient: TPatient = {
      cpf: newCPF,
      rg: newRG,
      name: newName,
      nickname: newNickname,
      email: newEmail,
      birth: newBirth,
      nationality: newNationality,
      gender: newGender,
      marital_status: newMaritalStatus,
      observations: newObservations,
      address: {
        ibge: newIBGE,
        cep: newCEP,
        city: newCity,
        uf: newUF,
        neighborhood: newNeighborhood,
        street: newStreet,
        number: parseInt(newNumber),
        complement: newComplement
      }
    }

    const res = await fetch(`/api/patients`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPatient)
    })

    const { status, error, data } = await res.json();

    if (status !== 200)
      throw new Error(error)
    
    else {
      const patientsCopy = patients.filter(p => p.cpf !== data.cpf);
      patientsCopy.push(data);
      setPatients(patientsCopy);
      hideModal();
    }
  }

  useEffect(() => {
    if (debounceTimer !== null) 
      clearTimeout(debounceTimer);
    
    if (newCEP === "")
      return;

    const timerId = setTimeout(async () => {
      const cepResponse = await fetch(`https://viacep.com.br/ws/${newCEP}/json/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })

      if (cepResponse.ok) {
        const cepJSON = await cepResponse.json()

        if (!("erro" in cepJSON)) {
          setNewIBGE(cepJSON.ibge);
          setNewCEP(cepJSON.cep);
          setNewUF(cepJSON.uf);
          setNewCity(cepJSON.localidade);
          setNewNeighborhood(cepJSON.bairro);
          setNewStreet(cepJSON.logradouro);
        }
      }
    }, 750);

    setDebounceTimer(timerId);
  }, [newCEP]);

  function Nationality({ 
    itemData: nationality 
  }: { 
    itemData: string 
  }): JSX.Element {
    return (
      <div 
        className={`list-item ${newNationality === nationality ? "list-item--selected" : ""}`}
        onClick={ () => {setNewNationality(nationality)} }
      > { nationality }
      </div>
    )
  }

  function ComplexListItem({ 
    itemData
  }: { 
    itemData: { 
      key: string, 
      name: string, 
      ref: string 
    }
  }): JSX.Element {
    function setNewValue() {
      if (itemData.ref === newGender)
        setNewGender(itemData.key as TGender);

      else if (itemData.ref === newMaritalStatus)
        setNewMaritalStatus(itemData.key as TMaritalStatus);
    }
  
    return (
      <div 
        className={`list-item ${itemData.ref === itemData.key ? "list-item--selected" : ""}`}
        onClick={ setNewValue }
      > { itemData.name }
      </div>
    )
  }

  return (
    <LocalizationProvider dateAdapter={ AdapterDateFns }>
      <div 
        className="backdrop"
        onClick={ hideModal }
      >
        <div 
          className="modal modal--patient"
          onClick={ e => e.stopPropagation() }
        >
          <div className="modal--patient__header">
            <div className="modal__tabs">
              <div 
                className={`modal__tab ${tabShown === "personal" ? "modal__tab--active" : ""}`}
                onClick={ () => setTabShown("personal") }
              > Informações básicas
              </div>

              <div 
                className={`modal__tab ${tabShown === "contact" ? "modal__tab--active" : ""}`}
                onClick={ () => setTabShown("contact") }
              > Contato
              </div>
            </div>

            <FaXmark 
              className="modal__close"
              onClick={ () => setModalPatientShown(false) }
            />
          </div>

          {
            tabShown === "personal" 
            ? <>
                <img
                  className="modal__art" 
                  src="user.png" 
                  alt="user" 
                />

                <div className="modal--patient__body">
                  <div className="modal__input">
                    <label htmlFor="name">
                      Paciente:
                    </label>

                    <input 
                      type="text"
                      id="name"
                      name="name"
                      value={ newName }
                      onChange={ e => setNewName(e.target.value) }
                    />
                  </div>

                  <div className="modal__input">
                    <label htmlFor="nickname">
                      Apelido:
                    </label>

                    <input 
                      type="text"
                      id="nickname"
                      name="nickname"
                      value={ newNickname }
                      onChange={ e => setNewNickname(e.target.value) }
                    />
                  </div>

                  <div 
                    className="modal__select"
                    onClick={ () => {toggleShownList("nationality")} }
                  >
                    <label htmlFor="nationality">
                      Nacionalidade:
                    </label>

                    <input 
                      id="nationality"
                      name="nationality"
                      type="text" 
                      readOnly
                      value={ newNationality }
                    />

                    <FaChevronDown className="modal__select__chevron"/>

                    {
                      shownList === "nationality" &&
                      <List
                        className="modal__select__list"
                        elements={ countries }
                        ListItem={ Nationality }
                      />
                    }
                  </div>

                  <div className="modal__date-picker">
                    <label htmlFor="">
                      Data de nascimento:
                    </label>
                    
                    <DatePicker
                      disableFuture
                      format="dd/MM/yyyy"
                      value={ newBirth }
                      onChange={ newValue => setNewBirth(new Date(newValue!)) }
                      sx={{
                        '& *': {
                          'fontFamily': '"Source Sans 3", sans-serif'
                        },

                        '.MuiInputBase-root': {
                          borderRadius: "6px"
                        },

                        '.MuiInputBase-input': {
                          padding: "12px"
                        },

                        '.MuiOutlinedInput-notchedOutline': {
                          border: "2px solid #e2e5e9",
                          borderRadius: "6px"
                        }
                      }}
                    />
                  </div>

                  <div className="modal__input">
                    <label htmlFor="cpf">
                      CPF:
                    </label>

                    <input 
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={ formatCPFInput(newCPF) }
                      onChange={ e => setNewCPF(e.target.value) }
                      pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                    />
                  </div>

                  <div className="modal__input">
                    <label htmlFor="rg">
                      RG:
                    </label>

                    <input 
                      type="text"
                      id="rg"
                      name="rg"
                      value={ newRG }
                      onChange={ e => setNewRG(e.target.value) }
                    />
                  </div>

                  <div 
                    className="modal__select"
                    onClick={ () => {toggleShownList("gender")} }
                  >
                    <label htmlFor="gender">
                      Gênero:
                    </label>

                    <input 
                      id="gender"
                      name="gender"
                      type="text" 
                      readOnly
                      value={ displayGenders.find(g => g.key === newGender)?.name ?? "" }
                    />

                    <FaChevronDown className="modal__select__chevron"/>

                    {
                      shownList === "gender" &&
                      <List
                        className="modal__select__list"
                        elements={ displayGenders }
                        ListItem={ ComplexListItem }
                      />
                    }
                  </div>

                  <div 
                    className="modal__select"
                    onClick={ () => {toggleShownList("marital_status")} }
                  >
                    <label htmlFor="maritalStatus">
                      Estado civil:
                    </label>

                    <input 
                      id="maritalStatus"
                      name="maritalStatus"
                      type="text" 
                      readOnly
                      value={ displayMaritalStatuses.find(g => g.key === newMaritalStatus)?.name ?? "" }
                    />

                    <FaChevronDown className="modal__select__chevron"/>

                    {
                      shownList === "marital_status" &&
                      <List
                        className="modal__select__list"
                        elements={ displayMaritalStatuses }
                        ListItem={ ComplexListItem }
                      />
                    }
                  </div>

                  <div className="modal__input modal__input--textarea">
                    <label htmlFor="observations">
                      Observações:
                    </label>

                    <textarea 
                      id="observations"
                      name="observations"
                      value={ newObservations }
                      onChange={ e => setNewObservations(e.target.value) }
                    />
                  </div>
                </div>
              </> 
        
            : <div className="modal--patient__body">
                <div className="modal__input">
                  <label htmlFor="cep">
                    CEP:
                  </label>

                  <input 
                    type="text"
                    id="cep"
                    name="cep"
                    value={ newCEP }
                    onChange={ e => setNewCEP(e.target.value) }
                  />
                </div>
                
                <div className="modal__input">
                  <label htmlFor="city">
                    Cidade:
                  </label>

                  <input 
                    type="text"
                    id="city"
                    name="city"
                    value={ newCity }
                    onChange={ e => setNewCity(e.target.value) }
                  />
                </div>

                <div className="modal__input">
                  <label htmlFor="uf">
                    UF:
                  </label>

                  <input 
                    type="text"
                    id="uf"
                    name="uf"
                    value={ newUF }
                    onChange={ e => setNewUF(e.target.value) }
                  />
                </div>

                <div className="modal__input">
                  <label htmlFor="street">
                    Endereço:
                  </label>

                  <input 
                    type="text"
                    id="street"
                    name="street"
                    value={ newStreet }
                    onChange={ e => setNewStreet(e.target.value) }
                  />
                </div>

                <div className="modal__input">
                  <label htmlFor="number">
                    Número:
                  </label>

                  <input 
                    type="text"
                    id="number"
                    name="number"
                    value={ newNumber }
                    onChange={e => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, '');
                      setNewNumber(numericValue);
                    }}
                  />
                </div>

                <div className="modal__input">
                  <label htmlFor="neighborhood">
                    Bairro:
                  </label>

                  <input 
                    type="text"
                    id="neighborhood"
                    name="neighborhood"
                    value={ newNeighborhood }
                    onChange={ e => setNewNeighborhood(e.target.value) }
                  />
                </div>

                <div className="modal__input">
                  <label htmlFor="complement">
                    Complemento:
                  </label>

                  <input 
                    type="text"
                    id="complement"
                    name="complement"
                    value={ newComplement }
                    onChange={ e => setNewComplement(e.target.value) }
                  />
                </div>
              </div>
          }

          <div className="modal__btns">
            <div 
              className="btn btn--bg-blue btn--wide"
              onClick={ tabShown === "personal" ? () => { setTabShown("contact") } : PUTPatient }
            > { tabShown === "personal" ? "Próximo" : "Salvar" }
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  )
}