import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const ReceiptPage = styled.div`
  min-height: 100vh;
  width: 100vw; /* Full width */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const Title = styled.h1`
  color: #d2cb16; /* First yellow shade */
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ReceiptCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  width: 100%; /* Full width of parent */
  max-width: 900px; /* Increased max-width for more space */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Subtitle = styled.h2`
  color: #e8e809; /* Second yellow shade */
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e8e809;
  padding-bottom: 0.5rem;
`;

const DetailItem = styled.p`
  margin: 0.8rem 0;
  font-size: 1.1rem;
  color: #2c3e50;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #ecf0f1;
  padding-bottom: 0.5rem;

  strong {
    color: #d2cb16; /* First yellow shade for contrast */
    font-weight: 600;
    min-width: 150px; /* Increased for spacing */
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    flex-direction: column;
    gap: 0.2rem;
  }
`;

const CTAButton = styled.button`
  margin-top: 2rem;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: #e8e809; /* Second yellow shade for button */
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 100%; /* Full width button */

  &:hover {
    background: #d2cb16; /* First yellow shade on hover */
    transform: scale(1.02); /* Slightly reduced scale for full-width */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  }
`;

function Receipt() {
  const location = useLocation();
  const { receipt } = location.state || {};

  return (
    <ReceiptPage className="receipt-page">
      <Title>Booking Confirmed</Title>
      <ReceiptCard className="receipt-details">
        <Subtitle>Receipt</Subtitle>
        <DetailItem>
          <strong>Booking ID:</strong> <span>{receipt?.id || "N/A"}</span>
        </DetailItem>
        <DetailItem>
          <strong>Pickup:</strong> <span>{receipt?.pickupLocation || "N/A"}</span>
        </DetailItem>
        <DetailItem>
          <strong>Drop:</strong> <span>{receipt?.dropLocation || "N/A"}</span>
        </DetailItem>
        <DetailItem>
          <strong>Service:</strong> <span>{receipt?.service || "N/A"}</span>
        </DetailItem>
        <DetailItem>
          <strong>Price:</strong> <span>{receipt?.price || "N/A"}</span>
        </DetailItem>
        <DetailItem>
          <strong>Payment Method:</strong> <span>{receipt?.paymentMethod || "N/A"}</span>
        </DetailItem>
        <DetailItem>
          <strong>Date:</strong> <span>{receipt?.date || "N/A"}</span>
        </DetailItem>
      </ReceiptCard>
      <CTAButton onClick={() => (window.location.href = "/")}>
        Back to Home
      </ CTAButton>
    </ReceiptPage>
  );
}

export default Receipt;