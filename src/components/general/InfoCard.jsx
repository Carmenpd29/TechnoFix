import React from "react";
import styled from "styled-components";
import { FiInfo } from "react-icons/fi";

const CardContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  margin: 1.5rem auto;
  max-width: 100%;
  width: 100%;

  @media (max-width: 768px) {
    margin: 1rem 0;
    max-width: 100%;
  }
`;

const CardHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px 12px 0 0;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #232728;
  font-size: 1.1rem;
  font-weight: 600;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  color: #607074;
  font-size: 0.95rem;
  line-height: 1.6;

  p {
    margin: 0 0 1rem 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  b {
    color: #232728;
    font-weight: 600;
  }

  br {
    margin-bottom: 0.3rem;
  }

  @media (max-width: 1120px) {
    padding: 1.2rem;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.85rem;
  }
`;

export function InfoCard({ title = "Información", icon, children, ...props }) {
  return (
    <CardContainer {...props}>
      <CardHeader>
        {icon || <FiInfo size={18} />}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </CardContainer>
  );
}