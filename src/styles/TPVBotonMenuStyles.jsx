import styled from "styled-components";

export const TPVBotonMenu = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #a5c4ca;
  color: #232728;
  border: none;
  border-radius: 16px;
  padding: 1rem 0.5rem;
  font-size: 0.75rem;
  font-family: 'Poppins';
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #404a4c22;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  min-width: 140px;
  min-height: 120px;
  max-width: 160px;
  max-height: 120px;
  text-align: center;
  white-space: nowrap;
  overflow: visible;
  
  &:hover {
    background: #607074;
    color: #caf0f8;
  }
  
  span {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    line-height: 1;
    display: block;
    white-space: nowrap;
    overflow: visible;
    text-overflow: clip;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 140px;
    min-height: 100px;
    max-height: 100px;
    padding: 0.75rem 0.25rem;
    font-size: 0.7rem;
    
    span {
      margin-top: 0.25rem;
      font-size: 0.7rem;
      line-height: 1;
      white-space: nowrap;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0.75rem 0.25rem;
    width: 100%;
    max-width: 110px;
    min-width: 100px;
    min-height: 90px;
    max-height: 90px;
    border-radius: 12px;
    box-shadow: 0 2px 8px #404a4c22; 
    background: #a5c4ca;
    color: #232728;           
    font-size: 0.65rem;
    margin-bottom: 0.5rem;
    border: 1px solid #a5c4ca;   
    
    span {
      margin-top: 0.25rem;
      font-size: 0.65rem;
      line-height: 1;
      display: block;
      white-space: nowrap;
      overflow: visible;
      text-overflow: clip;
    }
    
    svg {
      font-size: 16px !important; 
      min-width: 16px;
      min-height: 16px;
      max-width: 16px;
      max-height: 16px;
    }
  }

  @media (max-width: 480px) {
    max-width: 95px;
    min-width: 85px;
    min-height: 80px;
    max-height: 80px;
    padding: 0.5rem 0.15rem;
    font-size: 0.55rem;
    
    span {
      font-size: 0.55rem;
      line-height: 1;
      margin-top: 0.2rem;
      white-space: nowrap;
      overflow: visible;
    }
    
    svg {
      font-size: 14px !important; 
      min-width: 14px;
      min-height: 14px;
      max-width: 14px;
      max-height: 14px;
    }
  }
`;

export const TPVIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  flex-shrink: 0;

  & > svg {
    width: 24px !important;
    height: 24px !important;
    min-width: 24px !important;
    min-height: 24px !important;
    max-width: 24px !important;
    max-height: 24px !important;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    
    & > svg {
      width: 20px !important;
      height: 20px !important;
      min-width: 20px !important;
      min-height: 20px !important;
      max-width: 20px !important;
      max-height: 20px !important;
    }
  }

  @media (max-width: 600px) {
    width: 16px;
    height: 16px;
    
    & > svg {
      width: 16px !important;
      height: 16px !important;
      min-width: 16px !important;
      min-height: 16px !important;
      max-width: 16px !important;
      max-height: 16px !important;
    }
  }

  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
    
    & > svg {
      width: 14px !important;
      height: 14px !important;
      min-width: 14px !important;
      min-height: 14px !important;
      max-width: 14px !important;
      max-height: 14px !important;
    }
  }
`;