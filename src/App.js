import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import db from "./firebase";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Dot = ({ color }) => {
  const style = {
    height: 25,
    width: 25,
    margin: "0px 10px",
    backgroundColor: color,
    borderRadius: "50px",
    display: "inline-block",
  };

  return <span style={style}></span>;
};

const CloseIcon = () => {
  const style = {
    height: 25,
    width: 25,
    margin: "0px 10px",
    color: "red",
    display: "inline-block",
    cursor: "pointer",
  };

  return (
    <i className="material-icons" style={style}>
      close
    </i>
  );
};

export default function App() {
  const [colors, setColors] = useState([{ name: "Loading..", id: "Initial" }]);

  console.log(colors);
  useEffect(
    () =>
      onSnapshot(collection(db, "colors"), (snapshot) =>
        setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  //Create new values
  const handleNew = async () => {
    /*const docRef = doc(db, "colors", "color001");
    const payload = { name: "Black", value: "#000" };
    await setDoc(docRef, payload);*/
    const collectionRef = collection(db, "colors"); 
    const name = prompt("Enter a color name");
       
    if (name) {
      const value = prompt("Enter a color value");
      if (value){
        const payload = { name, value };
        const docRef = await addDoc(collectionRef, payload);
        //console.log("the new ID is: " + docRef.id);
        toast("the new ID is: " + docRef.id, {type:"success", autoClose:3000})
        console.log(name, value);
      }else{
        toast("field cannot be blank",{type:"error", autoclose:4000})
      }

    } else {
      toast("field cannot be blank",{type:"error", autoclose:4000})
    };
    /*
    const name = prompt("Enter a color name");
    const value = prompt("Enter a color value");
    const collectionRef = collection(db, "colors");
    //const payload = {name: name, value: value};
    const payload = { name, value };

    const docRef = await addDoc(collectionRef, payload);
    console.log("the new ID is: " + docRef.id);*/
  };

  //Edit Values
  const handleEdit = async (id) => {
    console.log(id);
    const editName = prompt("Enter new color name");
    const editValue = prompt("Enter new color value");
    if (editName && editValue) {
      const docRef = doc(db, "colors", id);
      const payload = { name: editName, value: editValue };
      await setDoc(docRef, payload);
      console.log(editName, editValue);
    } else {
      window.confirm("one of the fields was blank")
    };
    /*const editName = prompt("Enter new color name");
    const editValue = prompt("Enter new color value");
    const docRef = doc(db, "colors", id);
    const payload = { name: editName, value: editValue };
    await setDoc(docRef, payload);*/
  };

  //Delete values
  const deleteColor = async (id) => {
    if (window.confirm("are you sure?")) {
      console.log(id);
      await deleteDoc(doc(db, "colors", id));
    }
  };

  return (
    <div className="root">
      <button className="button" onClick={handleNew}>
        New!
      </button>
      <ul>
        {colors.map((color) => (
          <li key={color.id}>
            <a href="#" onClick={() => handleEdit(color.id)}>
              edit
            </a>
            <Dot color={color.value} /> {color.name}
            <span onClick={() => deleteColor(color.id)}>
              <CloseIcon />
            </span>
          </li>
        ))}
      </ul>
      <ToastContainer/>
    </div>
  );
}
