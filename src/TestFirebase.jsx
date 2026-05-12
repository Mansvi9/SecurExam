import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

function TestFirebase() {

  const addData = async () => {
    try {
      await addDoc(collection(db, "test"), {
        name: "SecurExam"
      });

      alert("Data Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Firebase Test</h1>

      <button onClick={addData}>
        Add Data
      </button>
    </div>
  );
}

export default TestFirebase;