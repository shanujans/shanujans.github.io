import React from 'react';
import CVRequestModal from './CVRequestModal';

interface ContactButtonProps {
  label?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ label = 'Request CV' }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <CVRequestModal isOpen={open} onClose={() => setOpen(false)} />
      <button className="contact-btn" onClick={() => setOpen(true)}>
        {label}
      </button>
    </>
  );
};

export default ContactButton;
