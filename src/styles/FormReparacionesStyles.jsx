import styled from "styled-components";

export const Fechas = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  flex-wrap: nowrap;

  div {
    display: flex;
    flex-direction: column;
    flex: 1 1 100px;
    min-width: 120px;
    max-width: 160px;
    label {
      font-size: 0.9rem;
      color: #607074;
      margin-bottom: 0.2rem;
    }
    input[type="date"] {
      padding: 0.4rem;
      border-radius: 6px;
      border: 1.5px solid #a5c4ca;
      font-size: 0.9rem;
      width: 100%;
      min-width: 0;
      max-width: 100%;
      height: 36px;
      box-sizing: border-box;
      background: #fff;
      color: #232728;
    }
  }

  @media (max-width: 1120px) {
      font-size: 0.8rem;
    }
    input[type="date"]::placeholder {
      font-size: 0.8rem;
    }
        input,
        textarea,
        select {
          font-family: inherit;
          font-size: 1rem;
          padding: 0.7rem;
          border-radius: 6px;
          border: 1.5px solid #a5c4ca;
          margin-bottom: 0.7rem;
          width: 100%;
          min-width: 0;
          max-width: none; /* Changed to none for full responsiveness */
          box-sizing: border-box;
          background: #fff;
          color: #232728;
          resize: none;
        }
  }
`;

export const Datos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.7rem;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    margin-bottom: 0.7rem;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
    background: #fff;
    color: #232728;
    resize: none;
  }
  textarea {
    padding: 0.4rem;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    font-size: 0.9rem;
    background: #fff;
    color: #232728;
    resize: vertical;
  }
  input[readonly] {
    background: #e9ecef;
    color: #607074;
    cursor: not-allowed;
  }
  textarea {
    min-height: 50px;
    max-height: 120px;
  }

  @media (max-width: 1120px) {
    input::placeholder,
    textarea::placeholder {
      font-size: 0.8rem;
    }
  }
`;

export const GuardarButton = styled.button`
  margin-top: 0.8rem;
  padding: 0.6rem;
  background: linear-gradient(90deg, #607074 60%, #404a4c 100%);
  color: #caf0f8;
  border: none;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px #404a4c33;
  letter-spacing: 0.5px;
  border-radius: 8px;
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: linear-gradient(90deg, #404a4c 60%, #232728 100%);
    box-shadow: 0 4px 16px #404a4c55;
  }
  &:disabled {
    background: #b3c6d1;
    cursor: not-allowed;
    color: #fff;
    border: none;
    box-shadow: none;
  }

  @media (max-width: 1120px) {
    font-size: 0.8rem;
  }
`;