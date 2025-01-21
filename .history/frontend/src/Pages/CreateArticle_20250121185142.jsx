import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/pages/create-conference.css"; 
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../Components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from '../UserContext';
import { useContext } from 'react';


function CreateConference() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [reviewers, setReviewers] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]); 
  const [selectedIds, setSelectedIds] = useState([]); 
  const user = useContext(UserContext);

  const handleSelectChange = (event) => {
    const selectedNames = Array.from(event.target.selectedOptions, option => {
      const selectedReviewer = reviewers.find(reviewer => reviewer.lastname + " " + reviewer.firstname === option.value);
      return selectedReviewer ? selectedReviewer.lastname + " " + selectedReviewer.firstname : null;
    }).filter(name => name !== null);
  
    const selectedKeys = selectedNames.map(name => {
      const selectedReviewer = reviewers.find(reviewer => reviewer.lastname + " " + reviewer.firstname === name);
      return selectedReviewer ? selectedReviewer.idUser : null;
    }).filter(id => id !== null);
  
    setSelectedOptions(prevSelectedNames => {
      const isDeselected = prevSelectedNames.includes(selectedNames[0]);
  
      if (isDeselected) {
        return prevSelectedNames.filter(name => name !== selectedNames[0]);
      } else {
        return [...prevSelectedNames, ...selectedNames];
      }
    });
  
    setSelectedIds(prevSelectedIds => {
      const isDeselected = prevSelectedIds.includes(selectedKeys[0]);
  
      if (isDeselected) {
        return prevSelectedIds.filter(id => id !== selectedKeys[0]);
      } else {
        return [...prevSelectedIds, ...selectedKeys];
      }
    });
  };
  
  


useEffect(() => {
  async function fetchReviewers() {
    try {
      const response = await axios.get('http://localhost:3001/users?role=reviewer');
      console.log(response.data)
      setReviewers(response.data); 
    } catch (error) {
      toast.error("Nu s-au putut încărca. Te rugăm să încerci mai târziu.");
    }
  }
  fetchReviewers();
}, []);

  useEffect(() => {
    document.body.classList.add("page");

    return () => {
      document.body.classList.remove("page");
    };
  }, []);

 
  const validateForm = () =>{
    console.log("Funcția validateForm a fost apelată");
    const errObj = {};
    if (!name.trim()) {
      errObj.name = "Numele este obligatoriu";
    }

    if (!description.trim()) {
      errObj.description = "Descrierea este obligatorie";
    }

    if (!date.trim()) {
      errObj.date = "Data este obligatorie";
    }

    if (!location.trim()) {
      errObj.location = "Locatia este obligatorie";
    }
    console.log("Erori detectate:", errObj); 
    setErrors(errObj);
    return Object.keys(errObj).length;
  }

  async function handleSubmit(e){
    e.preventDefault();
    if(!validateForm()){
      try {
        const response = await axios.post('http://localhost:3001/conference/', { 
          name, 
          description, 
          date, 
          location, 
          idOrganizer: user.userId,
          reviewers: selectedIds 
        });
       console.log(response.data)
      //  setMessage("Conferinta creata cu succes!");
        toast.success("Conferinta creata cu succes");
     //   setTimeout(() => setMessage(""), 3000);
        setName('');
        setDescription('');
        setDate('');
        setLocation('');
        setSelectedOptions([])
      } catch (error) {
        if (error.response) {
          toast.error("Crearea conferintei esuata! " + error.response.data.message);
        } else if (error.request) {
          toast.error(
            "Nu s-a primit răspuns de la server. Te rugăm să încerci din nou."
          );
        } else {
          toast.error(
            "A apărut o eroare necunoscută. Te rugăm să încerci din nou mai târziu."
          );
          console.log(error.response)
        }
      }
    }
  }

  return (
    <div className="dashboard-container page">
            {message ? (
        <div className="message">
          {message}
          <br></br>
        </div>
      ) : undefined}
    <Sidebar role="author" />
    <div className="main-content">
      <h1>Creare Articol</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-left">
            <div>
            <label htmlFor="name">Titlu Articol</label>
            <input
            className={`${errors.name ? "errors" : ""}`}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <small>{errors.name}</small>}
          </div>
          <div>
            <label htmlFor="date">Descriere Articol</label>
            <input
              className={`${errors.date ? "errors" : ""}`}
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            {errors.date && <small>{errors.date}</small>}
          </div>
          <div>
            <label htmlFor="location">Locație</label>
            <input
            className={`${errors.location ? "errors" : ""}`}
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            {errors.location && <small>{errors.location}</small>}
          </div>
          <div>
    <label htmlFor="reviewers">Alege persoanele care vor oferi recenzie articolelelor:</label>
    <select
      id="reviewers"
      multiple
      value={selectedOptions}
      onChange={handleSelectChange}>
          {reviewers.map((reviewer) => (
      <option key={reviewer.idUser} value={ reviewer.lastname + " " + reviewer.firstname}>
        {reviewer.lastname + " " + reviewer.firstname}
      </option>
    ))}
    </select>
  </div>
        </div>
        <div className="form-right">
          <div>
            <label htmlFor="description">Descriere</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className={`description-textarea ${errors.location ? "errors " : ""}`}
              placeholder="Write the description here..."
            ></textarea>
            {errors.description && <small>{errors.description}</small>}
            <div>
          </div>
          <div>
            <p>Opțiunile selectate:</p>
            <ul>
              {selectedOptions.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
      </div>
        </div>
      </div>
      <button type="submit">Creează Conferința</button>
     </form>
    </div>
    <ToastContainer />
    </div>
    
  );
}

export default CreateConference;