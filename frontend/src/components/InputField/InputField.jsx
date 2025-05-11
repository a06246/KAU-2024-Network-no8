import React, { useRef } from 'react'
import { Input } from "@mui/base/Input";
import { Button } from "@mui/base/Button";
import './InputField.css'
import axios from "axios";

const InputField = ({ message, setMessage, sendMessage, sendImage }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5001/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      const imageUrl = response.data.url;
      console.log("업로드 성공", imageUrl);
      sendImage(imageUrl);

    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }

  };

  return (
    <div className="input-area">
      <div className="plus-button" onClick={() => fileInputRef.current.click()}>+</div>
      <form onSubmit={sendMessage} className="input-container">
        <Input
          placeholder="Type in here…"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          multiline={false}
          rows={1}
        />

        <Button
          disabled={message === ""}
          type="submit"
          className="send-button"
        >
          전송
        </Button>
      </form>
      <input
        type="file"
        ref={fileInputRef}
        accept='image/*'
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  )
}

export default InputField