import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import "./App.css";
import FarmLogo from "./assets/logo.png";
import reactLogo from "./assets/react.svg";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  useEffect(() => {
    isNotiPermissionGranted().then((permissionGranted) => {
      if (permissionGranted) {
        sendNotification("Tauri is awesome!");
        sendNotification({ title: "TAURI", body: "Tauri is awesome!" });
      }
    });
  }, []);

  const isNotiPermissionGranted = async () => {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }
    return permissionGranted;
  };

  return (
    <div className="container">
      <h1>Welcome to Farm!</h1>

      <div className="row">
        <a href="https://farmfe.org/" target="_blank">
          <img src={FarmLogo} className="logo" alt="Farm logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Farm, Tauri, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>

      {/* <button onClick={()=>}>Ping</button> */}
    </div>
  );
}

export default App;
