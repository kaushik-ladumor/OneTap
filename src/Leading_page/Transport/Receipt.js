  import React from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import styled from "styled-components";
  import { FaCheckCircle, FaHome, FaShareAlt } from "react-icons/fa";

  // Styled Components
  const ReceiptContainer = styled.div`
    min-height: 100vh;
    background: #f8f8f8;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden; /* Prevent scroll bars */
  `;

  const Header = styled.div`
    width: 100%;
    padding: 30px 20px;
    text-align: center;
    margin-bottom: 10px;
  `;

  const SuccessIcon = styled.div`
    font-size: 60px;
    color: #34C759;
    margin-bottom: 15px;
  `;

  const HeaderTitle = styled.h1`
    color: #333;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 5px 0;
  `;

  const HeaderSubtitle = styled.p`
    color: #666;
    font-size: 16px;
    margin: 0;
  `;

  const ReceiptCard = styled.div`
    background: white;
    border-radius: 16px;
    padding: 25px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
  `;

  const ReceiptTitle = styled.h2`
    color: #333;
    font-size: 20px;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
    font-weight: 600;
  `;

  const DetailRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px dashed #f0f0f0;
  `;

  const DetailLabel = styled.span`
    color: #666;
    font-weight: 500;
    font-size: 15px;
  `;

  const DetailValue = styled.span`
    color: #333;
    font-weight: 600;
    font-size: 15px;
  `;

  const PriceValue = styled(DetailValue)`
    color: #FFD700; /* Yellow color for price */
    font-size: 18px;
    font-weight: 700;
  `;

  const ButtonRow = styled.div`
    display: flex;
    width: 100%;
    max-width: 500px;
    gap: 12px;
    justify-content: space-between;
  `;

  const ActionButton = styled.button`
    flex: 1;
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: none;
  `;

  const ShareButton = styled(ActionButton)`
    background: white;
    color: #333;
    border: 1px solid #e0e0e0;
  `;

  const HomeButton = styled(ActionButton)`
    background: #FFD700; /* Yellow color */
    color: #333;
  `;

  function Receipt() {
    const location = useLocation();
    const navigate = useNavigate();
    const { receipt } = location.state || {};

    const handleShare = () => {
      if (navigator.share) {
        navigator.share({
          title: 'My Ride Receipt',
          text: `I just booked a ${receipt?.service} ride from ${receipt?.pickupLocation} to ${receipt?.dropLocation}`,
        });
      } else {
        alert('Share functionality not available in your browser');
      }
    };

    return (
      <ReceiptContainer>
        <Header>
          <SuccessIcon>
            <FaCheckCircle />
          </SuccessIcon>
          <HeaderTitle>Booking Confirmed!</HeaderTitle>
          <HeaderSubtitle>Your ride is on the way</HeaderSubtitle>
        </Header>

        <ReceiptCard>
          <ReceiptTitle>Ride Details</ReceiptTitle>
          
          <DetailRow>
            <DetailLabel>Booking ID</DetailLabel>
            <DetailValue>#{receipt?.id || "N/A"}</DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Pickup</DetailLabel>
            <DetailValue>{receipt?.pickupLocation || "N/A"}</DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Drop</DetailLabel>
            <DetailValue>{receipt?.dropLocation || "N/A"}</DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Service</DetailLabel>
            <DetailValue>{receipt?.service || "N/A"}</DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Payment</DetailLabel>
            <DetailValue>{receipt?.paymentMethod || "N/A"}</DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Date & Time</DetailLabel>
            <DetailValue>{receipt?.date || "N/A"}</DetailValue>
          </DetailRow>
          
          <DetailRow style={{ borderBottom: 'none' }}>
            <DetailLabel>Amount</DetailLabel>
            <PriceValue>{receipt?.price || "N/A"}</PriceValue>
          </DetailRow>
        </ReceiptCard>

        <ButtonRow>
          <ShareButton onClick={handleShare}>
            <FaShareAlt /> Share
          </ShareButton>
          <HomeButton onClick={() => navigate("/")}>
            <FaHome /> Home
          </HomeButton>
        </ButtonRow>
      </ReceiptContainer>
    );
  }

  export default Receipt;