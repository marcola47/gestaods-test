"use client";
import { useState, useEffect, useRef } from "react";

import List from "@/components/List"
import Patient from "@/components/Patient";
import { formatDate } from "@/libs/formatting";
import { FaMagnifyingGlass, FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa6";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [patients, setPatients] = useState<TPatient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<TPatient[]>([]);
  const [sortedPatients, setSortedPatients] = useState<TPatient[]>([]);

  const [filter, setFilter] = useState<string>("");
  const [sortParam, setSortParam] = useState<keyof TPatient>("name");
  const [sortMethod, setSortMethod] = useState<"asc" | "desc">("asc");
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const latestFilter = useRef<string>("");

  const labels = [
    { name: "Nome", key: "name" },
    { name: "CPF", key: "cpf" },
    { name: "Data de Nascimento", key: "birth" },
    { name: "Email", key: "email" },
    { name: "Cidade", key: "address.city" },
    { name: "Ações", key: "actions" }
  ]

  async function getPatients() {
    const res = await fetch("/api/patients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const { status, error, data } = await res.json();

    if (status !== 200)
      throw new Error(error)
    
    else {
      setPatients(data);
      setFilteredPatients(data);
      setLoading(false);
    }
  }

  async function filterPatients() {
    if (loading || patients.length === 0) {
      return;
    }

    const filteredPatients = patients.filter(patient => {
      return (
        patient.name.toLowerCase().includes(latestFilter.current.toLowerCase()) ||
        patient.cpf.toLowerCase().includes(latestFilter.current.toLowerCase()) ||
        patient.email.toLowerCase().includes(latestFilter.current.toLowerCase()) ||
        patient.address?.city.toLowerCase().includes(latestFilter.current.toLowerCase()) ||
        formatDate(patient.birth).toLowerCase().includes(latestFilter.current.toLowerCase())
      );
    });

    setFilteredPatients(filteredPatients);
  }

  async function sortPatients() {
    if (loading || patients.length === 0)
      return;

    const sortedPatients = [...filteredPatients].sort((a, b) => {
      if (sortMethod === "asc") {
        if (a[sortParam] < b[sortParam]) 
          return -1;

        if (a[sortParam] > b[sortParam]) 
          return 1;
      } 
      
      else {
        if (a[sortParam] > b[sortParam]) 
          return -1;

        if (a[sortParam] < b[sortParam]) 
          return 1;
      }

      return 0;
    });

    setSortedPatients(sortedPatients);
  }

  useEffect(() => {
    if (debounceTimer !== null) 
      clearTimeout(debounceTimer);
    
    latestFilter.current = filter;
    const timerId = setTimeout(() => { filterPatients() }, 500);
    setDebounceTimer(timerId);
  }, [filter, patients]);

  useEffect(() => { getPatients() }, []);
  useEffect(() => { sortPatients() }, [sortParam, sortMethod, filteredPatients]);
  
  function Label({ 
    itemData: label 
  }: {
    itemData: { name: string, key: keyof TPatient }
  }): JSX.Element {
    function setSortOptions(method: "asc" | "desc") {
      if (label.name !== "Ações") {
        setSortParam(label.key);
        setSortMethod(method);
      }
    }
    
    return (
      <div className="label">
        <div className="label__name">
          { label.name }
        </div>

        <div className="label__controls">
          <FaArrowUp 
            className={`label__control ${sortParam === label.key && sortMethod === "asc" ? "label__control--active" : ""} `}
            onClick={ () => setSortOptions("asc") }
          />

          <FaArrowDown 
            className={`label__control ${sortParam === label.key && sortMethod === "desc" ? "label__control--active" : ""} `}
            onClick={ () => setSortOptions("desc") }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <img 
        className="app__logo"
        src="logo.png" 
        alt="logo"
      />

      <div className="patients">
        <div className="patients__header">
          <div className="patients__text">
            Listagem de pacientes
          </div>

          <div className="patients__actions">
            <div className="patients__searchbar">
              <FaMagnifyingGlass className="patients__searchbar__icon"/>
              
              <input 
                type="text" 
                placeholder="Pesquisar"
                value={ filter }
                onChange={ e => setFilter(e.target.value) }
              />
            </div>

            <div 
              className="btn btn--bg-blue"
              onClick={ () => {} }
            >
              <FaPlus/>
              <span>Adicionar Paciente</span>
            </div>
          </div>
        </div>

        {
          !loading && 
          <>
            <List
              className="patients__labels"
              elements={ labels }
              ListItem={ Label }
            />

            {
              sortedPatients.length > 0 &&
              <List
                className="patients__list"
                elements={ sortedPatients }
                ListItem={ Patient }
              />
            }
          </>
        }
      </div>
    </div>
  )
}
