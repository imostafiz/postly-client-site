"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import {
  FaCheck,
  FaCrown,
  FaShieldAlt,
  FaStar,
  FaBolt,
  FaGem,
} from "react-icons/fa";

import { useCreatePaymentMutation } from "../redux/features/paymentApi";
import { useGetUser } from "../hooks/auth.hooks";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  { icon: FaShieldAlt, text: "Verified badge on profile", color: "text-blue-400" },
  { icon: FaStar, text: "Access to exclusive content", color: "text-yellow-400" },
  { icon: FaBolt, text: "Priority support", color: "text-purple-400" },
  { icon: FaGem, text: "Ad-free experience", color: "text-green-400" },
];

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const { data } = useGetUser();
  const userInfo = data?.data;
  const [createPayment] = useCreatePaymentMutation();

  const handlePayment = async () => {
    const paymentObject = {
      totalAmount: 150.75,
      customerName: userInfo?.name,
      customerEmail: userInfo?.email,
    };
    try {
      const res = await createPayment(paymentObject).unwrap();
      window.location.href = res?.data?.payment_url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      classNames={{
        base: "bg-white border border-[#C9C4B]",
        header: "border-b border-[#C9C4B]",
        footer: "border-t border-[#C9C4B]",
      }}
    >
      <ModalContent>
        <ModalBody className="py-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/25">
              <FaCrown className="text-white" size={24} />
            </div>
            <h3 className="text-[#1C2430] font-semibold text-lg mb-1">
              Upgrade to Premium
            </h3>
            <p className="text-[#1C2430]/50 text-sm mb-4">
              Unlock exclusive features
            </p>

            <div className="w-full space-y-2.5 mb-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/60 border border-[#C9C4B] rounded-xl px-4 py-3"
                >
                  <feature.icon className={feature.color} size={16} />
                  <span className="text-[#1C2430]/80 text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-[#1C2430]">Tk 50</span>
              <span className="text-[#1C2430]/50 text-sm">/ lifetime</span>
            </div>
            <p className="text-[#1C2430]/40 text-xs">One-time payment, no recurring fees</p>
          </div>
        </ModalBody>
        <ModalFooter className="gap-2 justify-center">
          <Button
            className="bg-[#C9C4B]/30 text-[#1C2430]/60 font-medium text-sm"
            onClick={onClose}
          >
            Maybe later
          </Button>
          <Button
            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-yellow-500/25"
            onClick={handlePayment}
          >
            Subscribe now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PremiumModal;
